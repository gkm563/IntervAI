import { createApp } from './app';
import { config } from './config';
import { runMigrations } from './database/migrator';

async function bootstrap() {
  console.log('====================================================');
  console.log('🚀 Starting IntervAI Core Backend Service (Milestone 1)');
  console.log(`📡 Environment: ${config.nodeEnv}`);
  console.log(`🌐 Port: ${config.port}`);
  console.log('====================================================');

  try {
    // Run database migrations on startup
    await runMigrations();
  } catch (err: any) {
    console.error('[Bootstrap] Migration notice:', err.message);
  }

  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log(`✅ IntervAI Core Backend running at http://localhost:${config.port}`);
    console.log(`🔗 API Auth Endpoint: http://localhost:${config.port}/api/auth`);
    console.log(`❤️  Health Check: http://localhost:${config.port}/health`);
  });

  const shutdown = () => {
    console.log('\n🛑 Graceful shutdown initiated...');
    server.close(() => {
      console.log('Server closed. Goodbye!');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((err) => {
  console.error('Fatal bootstrap error:', err);
  process.exit(1);
});
