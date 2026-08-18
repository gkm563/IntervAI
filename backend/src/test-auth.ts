import assert from 'assert';
import { createApp } from './app';

// Run automated tests on backend endpoints
async function runTests() {
  console.log('🧪 Starting Backend Auth Flow Automated Verification...');
  const app = createApp();

  let server: any;
  const port = 4001;

  await new Promise<void>((resolve) => {
    server = app.listen(port, () => resolve());
  });

  const baseUrl = `http://localhost:${port}/api/auth`;

  try {
    // 1. Health check
    console.log('1. Testing /health...');
    const healthRes = await fetch(`http://localhost:${port}/health`);
    const healthJson = (await healthRes.json()) as any;
    assert.strictEqual(healthRes.status, 200);
    assert.strictEqual(healthJson.status, 'healthy');
    console.log('   ✅ Health check passed.');

    // 2. Register
    console.log('2. Testing POST /api/auth/register...');
    const regPayload = {
      fullName: 'Gautam Maurya',
      email: 'testuser@example.com',
      password: 'SecurePassword123!',
      confirmPassword: 'SecurePassword123!',
    };

    const regRes = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regPayload),
    });
    const regJson = (await regRes.json()) as any;
    assert.strictEqual(regRes.status, 201);
    assert.strictEqual(regJson.success, true);
    assert.strictEqual(regJson.email, 'testuser@example.com');
    console.log('   ✅ Registration passed:', regJson.message);

    // 3. Register duplicate email
    console.log('3. Testing duplicate registration rejection/resend...');
    const dupRes = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regPayload),
    });
    assert.strictEqual(dupRes.status, 201);
    console.log('   ✅ Duplicate unverified user handled safely.');

    // 4. Invalid Login (unverified user)
    console.log('4. Testing login before verification (should block with 403)...');
    const unverifiedLoginRes = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser@example.com', password: 'SecurePassword123!' }),
    });
    assert.strictEqual(unverifiedLoginRes.status, 403);
    console.log('   ✅ Unverified user login blocked with 403.');

    // 5. Test Verify Email with invalid OTP
    console.log('5. Testing verification with invalid OTP...');
    const badVerifyRes = await fetch(`${baseUrl}/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser@example.com', otp: '000000' }),
    });
    assert.strictEqual(badVerifyRes.status, 400);
    console.log('   ✅ Invalid OTP rejected.');

    // 6. Test Forgot Password (anti-enumeration check)
    console.log('6. Testing POST /api/auth/forgot-password...');
    const forgotRes = await fetch(`${baseUrl}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nonexistent@example.com' }),
    });
    const forgotJson = (await forgotRes.json()) as any;
    assert.strictEqual(forgotRes.status, 200);
    assert.strictEqual(forgotJson.success, true);
    console.log('   ✅ Anti-enumeration forgot password response verified.');

    console.log('\n🎉 ALL AUTOMATED BACKEND AUTH TESTS PASSED SUCCESSFULLY!\n');
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
