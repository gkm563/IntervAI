import { Pool, QueryResult, QueryResultRow } from 'pg';
import { config } from '../config';

let pool: Pool | null = null;
let isMockDb = false;

// Mock store for in-memory / local standalone testing when PostgreSQL daemon is unavailable
interface MockDbStore {
  users: Map<string, any>;
  emailVerifications: Map<string, any>;
  passwordResets: Map<string, any>;
  refreshTokens: Map<string, any>;
}

const mockStore: MockDbStore = {
  users: new Map(),
  emailVerifications: new Map(),
  passwordResets: new Map(),
  refreshTokens: new Map(),
};

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: config.database.url,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : undefined,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected database pool error:', err.message);
    });
  }
  return pool;
}

export async function testConnection(): Promise<boolean> {
  try {
    const p = getPool();
    const client = await p.connect();
    const res = await client.query('SELECT NOW() as now');
    client.release();
    console.log(`[DB] Connected to PostgreSQL at ${config.database.url.split('@')[1] || 'localhost'} (DB Time: ${res.rows[0].now})`);
    isMockDb = false;
    return true;
  } catch (err: any) {
    console.warn(`[DB] PostgreSQL connection failed (${err.message}). Using local embedded storage for development.`);
    isMockDb = true;
    return false;
  }
}

export function isUsingMockDb(): boolean {
  return isMockDb;
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  if (!isMockDb) {
    try {
      const p = getPool();
      return await p.query<T>(text, params);
    } catch (err: any) {
      if (err.code === 'ECONNREFUSED' || err.message.includes('connect')) {
        console.warn(`[DB] Fallback to embedded DB: ${err.message}`);
        isMockDb = true;
      } else {
        throw err;
      }
    }
  }

  // Standalone local fallback emulator for M1 Auth
  return executeMockQuery<T>(text, params);
}

function executeMockQuery<T extends QueryResultRow>(text: string, params: any[] = []): QueryResult<T> {
  const normalized = text.trim().toLowerCase().replace(/\s+/g, ' ');

  // Simple mock handling for users table
  if (normalized.includes('insert into users')) {
    const id = params[0];
    const email = params[1].toLowerCase();
    const password_hash = params[2];
    const full_name = params[3];
    const status = params[4] || 'UNVERIFIED';
    const role = params[5] || 'USER';
    const now = new Date();

    const user = {
      id,
      email,
      password_hash,
      full_name,
      status,
      email_verified_at: null,
      avatar_url: null,
      role,
      target_role: null,
      target_company: null,
      created_at: now,
      updated_at: now,
    };
    mockStore.users.set(id, user);
    return { rows: [user as unknown as T], rowCount: 1, command: 'INSERT', oid: 0, fields: [] };
  }

  if (normalized.includes('select * from users where lower(email) = lower($1)') || normalized.includes('where email = $1')) {
    const email = params[0]?.toLowerCase();
    const user = Array.from(mockStore.users.values()).find((u) => u.email.toLowerCase() === email);
    return { rows: user ? [user as unknown as T] : [], rowCount: user ? 1 : 0, command: 'SELECT', oid: 0, fields: [] };
  }

  if (normalized.includes('select * from users where id = $1')) {
    const id = params[0];
    const user = mockStore.users.get(id);
    return { rows: user ? [user as unknown as T] : [], rowCount: user ? 1 : 0, command: 'SELECT', oid: 0, fields: [] };
  }

  if (normalized.includes('update users set status')) {
    let status = 'ACTIVE';
    let verifiedAt: any = new Date();
    let userId: string = '';

    if (normalized.includes('status = $1')) {
      status = params[0];
      verifiedAt = params[1];
      userId = params[2];
    } else {
      verifiedAt = params[0];
      userId = params[1];
    }

    const user = mockStore.users.get(userId);
    if (user) {
      user.status = status;
      user.email_verified_at = verifiedAt;
      user.updated_at = new Date();
      mockStore.users.set(userId, user);
      return { rows: [user as unknown as T], rowCount: 1, command: 'UPDATE', oid: 0, fields: [] };
    }
  }

  if (normalized.includes('update users set password_hash = $1')) {
    const newHash = params[0];
    const userId = params[1];
    const user = mockStore.users.get(userId);
    if (user) {
      user.password_hash = newHash;
      user.updated_at = new Date();
      mockStore.users.set(userId, user);
      return { rows: [user as unknown as T], rowCount: 1, command: 'UPDATE', oid: 0, fields: [] };
    }
  }

  // Email verifications
  if (normalized.includes('insert into email_verifications')) {
    const id = params[0];
    const user_id = params[1];
    const email = params[2].toLowerCase();
    const otp_code = params[3];
    const expires_at = params[4];
    const record = { id, user_id, email, otp_code, expires_at, used: false, created_at: new Date() };
    mockStore.emailVerifications.set(id, record);
    return { rows: [record as unknown as T], rowCount: 1, command: 'INSERT', oid: 0, fields: [] };
  }

  if (normalized.includes('select * from email_verifications where lower(email) = lower($1) and otp_code = $2 and used = false')) {
    const email = params[0]?.toLowerCase();
    const otp = params[1];
    const record = Array.from(mockStore.emailVerifications.values())
      .filter((r) => r.email.toLowerCase() === email && r.otp_code === otp && !r.used)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0];
    return { rows: record ? [record as unknown as T] : [], rowCount: record ? 1 : 0, command: 'SELECT', oid: 0, fields: [] };
  }

  if (normalized.includes('update email_verifications set used = true where id = $1')) {
    const id = params[0];
    const record = mockStore.emailVerifications.get(id);
    if (record) {
      record.used = true;
      mockStore.emailVerifications.set(id, record);
    }
    return { rows: [], rowCount: 1, command: 'UPDATE', oid: 0, fields: [] };
  }

  // Password resets
  if (normalized.includes('insert into password_resets')) {
    const id = params[0];
    const user_id = params[1];
    const email = params[2].toLowerCase();
    const token_hash = params[3];
    const expires_at = params[4];
    const record = { id, user_id, email, token_hash, expires_at, used: false, created_at: new Date() };
    mockStore.passwordResets.set(id, record);
    return { rows: [record as unknown as T], rowCount: 1, command: 'INSERT', oid: 0, fields: [] };
  }

  if (normalized.includes('select * from password_resets where lower(email) = lower($1) and token_hash = $2 and used = false')) {
    const email = params[0]?.toLowerCase();
    const tokenHash = params[1];
    const record = Array.from(mockStore.passwordResets.values())
      .filter((r) => r.email.toLowerCase() === email && r.token_hash === tokenHash && !r.used)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0];
    return { rows: record ? [record as unknown as T] : [], rowCount: record ? 1 : 0, command: 'SELECT', oid: 0, fields: [] };
  }

  if (normalized.includes('update password_resets set used = true where id = $1')) {
    const id = params[0];
    const record = mockStore.passwordResets.get(id);
    if (record) {
      record.used = true;
      mockStore.passwordResets.set(id, record);
    }
    return { rows: [], rowCount: 1, command: 'UPDATE', oid: 0, fields: [] };
  }

  // Refresh tokens
  if (normalized.includes('insert into refresh_tokens')) {
    const id = params[0];
    const user_id = params[1];
    const token_hash = params[2];
    const expires_at = params[3];
    const user_agent = params[4];
    const ip_address = params[5];
    const record = { id, user_id, token_hash, expires_at, user_agent, ip_address, revoked: false, created_at: new Date() };
    mockStore.refreshTokens.set(id, record);
    return { rows: [record as unknown as T], rowCount: 1, command: 'INSERT', oid: 0, fields: [] };
  }

  if (normalized.includes('select * from refresh_tokens where token_hash = $1 and revoked = false')) {
    const tokenHash = params[0];
    const record = Array.from(mockStore.refreshTokens.values()).find((r) => r.token_hash === tokenHash && !r.revoked);
    return { rows: record ? [record as unknown as T] : [], rowCount: record ? 1 : 0, command: 'SELECT', oid: 0, fields: [] };
  }

  if (normalized.includes('update refresh_tokens set revoked = true where token_hash = $1')) {
    const tokenHash = params[0];
    const record = Array.from(mockStore.refreshTokens.values()).find((r) => r.token_hash === tokenHash);
    if (record) {
      record.revoked = true;
      mockStore.refreshTokens.set(record.id, record);
    }
    return { rows: [], rowCount: 1, command: 'UPDATE', oid: 0, fields: [] };
  }

  if (normalized.includes('update refresh_tokens set revoked = true where user_id = $1')) {
    const userId = params[0];
    Array.from(mockStore.refreshTokens.values())
      .filter((r) => r.user_id === userId)
      .forEach((r) => {
        r.revoked = true;
        mockStore.refreshTokens.set(r.id, r);
      });
    return { rows: [], rowCount: 1, command: 'UPDATE', oid: 0, fields: [] };
  }

  return { rows: [], rowCount: 0, command: 'UNKNOWN', oid: 0, fields: [] };
}
