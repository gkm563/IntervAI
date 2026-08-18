import { emailService } from './email/email.service';

async function testGmail() {
  console.log('📨 Sending live verification email via Gmail SMTP from maurgk212104@gmail.com to maurgk212104@gmail.com...');
  await emailService.sendVerificationOtp('maurgk212104@gmail.com', '789123', 'Gautam Maurya');
  console.log('🎉 Done! Check your inbox for the OTP.');
}

testGmail().catch(console.error);
