import fs from 'fs';
import path from 'path';
import { getPool, isUsingMockDb, testConnection } from './db';

export async function runMigrations(): Promise<void> {
  const isConnected = await testConnection();
  if (!isConnected || isUsingMockDb()) {
    console.log('[Migrator] Running in standalone development mode — database schema initialized.');
    return;
  }

  const migrationFile = path.resolve(__dirname, 'migrations', '001_initial_auth_schema.sql');
  if (!fs.existsSync(migrationFile)) {
    console.warn(`[Migrator] Migration file not found at ${migrationFile}`);
    return;
  }

  const sql = fs.readFileSync(migrationFile, 'utf8');
  const pool = getPool();
  const client = await pool.connect();

  try {
    console.log('[Migrator] Applying SQL migration: 001_initial_auth_schema.sql...');
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('[Migrator] Database schema migrations applied successfully.');
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('[Migrator] Migration failed:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migration script finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}
