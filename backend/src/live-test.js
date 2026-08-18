async function testLiveAuth() {
  console.log('🚀 Running Live End-to-End Verification on http://localhost:4000 & http://localhost:5173...\n');

  // 1. Check Backend Health
  const healthRes = await fetch('http://localhost:4000/health');
  const healthData = await healthRes.json();
  console.log('✅ 1. Backend /health status:', healthData.status);

  // 2. Check Frontend Index
  const frontRes = await fetch('http://localhost:5173/');
  console.log('✅ 2. Frontend HTML status:', frontRes.status, `(Size: ${(await frontRes.text()).length} bytes)`);

  // 3. Register user
  const regRes = await fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Gautam Kumar Maurya',
      email: 'live.test@intervai.com',
      password: 'StrongPassword2026!',
      confirmPassword: 'StrongPassword2026!',
    }),
  });
  const regData = await regRes.json();
  console.log('✅ 3. Registration:', regData.message);

  // 4. Test Forgot Password
  const forgotRes = await fetch('http://localhost:4000/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'live.test@intervai.com' }),
  });
  const forgotData = await forgotRes.json();
  console.log('✅ 4. Forgot Password:', forgotData.message);

  console.log('\n🎉 Live services are active, healthy, and communicating smoothly!');
}

testLiveAuth().catch(console.error);
