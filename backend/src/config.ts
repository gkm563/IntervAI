import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/intervai_db',
    ssl: process.env.DB_SSL === 'true',
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'intervai_dev_access_secret_change_in_production_key_32bytes',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'intervai_dev_refresh_secret_change_in_production_key_32bytes',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    refreshCookieMaxAgeMs: 30 * 24 * 60 * 60 * 1000, // 30 days
  },

  email: {
    provider: process.env.EMAIL_PROVIDER || 'console',
    resendApiKey: process.env.RESEND_API_KEY || '',
    from: process.env.EMAIL_FROM || 'IntervAI <auth@intervai.com>',
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS || '900000', 10), // 15 mins
    max: parseInt(process.env.RATE_LIMIT_AUTH_MAX || '20', 10),
  },
};
