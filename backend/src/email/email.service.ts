import nodemailer from 'nodemailer';
import { config } from '../config';

class EmailService {
  private getTransporter(): nodemailer.Transporter | null {
    const isGmail = config.email.provider === 'gmail' || config.email.smtp.host.includes('gmail');
    const user = config.email.smtp.user || 'maurgk212104@gmail.com';
    const rawPass = config.email.smtp.pass;
    const pass = rawPass ? rawPass.trim().replace(/\s+/g, '') : '';

    if (!pass) {
      return null;
    }

    if (isGmail) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user,
          pass, // 16-character Gmail App Password
        },
      });
    }

    return nodemailer.createTransport({
      host: config.email.smtp.host,
      port: config.email.smtp.port,
      secure: config.email.smtp.port === 465,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendVerificationOtp(email: string, otpCode: string, fullName: string): Promise<void> {
    const subject = `Your IntervAI Verification Code: ${otpCode}`;
    const text = `Hello ${fullName},\n\nYour 6-digit verification code for IntervAI is: ${otpCode}\n\nThis code expires in 10 minutes. If you did not request this, please ignore this email.\n\nBest regards,\nThe IntervAI Team`;
    
    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background-color: #0B1B3A; color: #ffffff; border-radius: 16px; border: 1px solid #1e3a6e;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #38bdf8; font-size: 28px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Interv<span style="color: #ffffff;">AI</span></h1>
          <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">AI Interview Simulation Platform</p>
        </div>

        <p style="font-size: 16px; color: #f8fafc; margin-bottom: 12px;">Hello <strong>${fullName}</strong>,</p>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-bottom: 24px;">
          Welcome to IntervAI! Use the following 6-digit verification code to confirm your email address and activate your mock interview workspace:
        </p>

        <div style="background: linear-gradient(135deg, #0f244c 0%, #1e293b 100%); padding: 24px; border-radius: 12px; text-align: center; margin: 28px 0; border: 1px solid #38bdf8; box-shadow: 0 8px 24px rgba(2, 132, 199, 0.25);">
          <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #38bdf8; font-family: monospace;">${otpCode}</span>
        </div>

        <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-bottom: 24px;">
          ⏱️ This code will expire in <strong>10 minutes</strong>. Never share this code with anyone.
        </p>

        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        
        <p style="font-size: 12px; color: #64748b; text-align: center; line-height: 1.5;">
          If you did not create an IntervAI account, please disregard this message.<br/>
          Sent from <a href="mailto:maurgk212104@gmail.com" style="color: #38bdf8; text-decoration: none;">maurgk212104@gmail.com</a>
        </p>
      </div>
    `;

    await this.deliverEmail(email, subject, text, html, `[AUTH OTP] 🔑 Verification Code for ${email}: ${otpCode}`);
  }

  async sendPasswordResetLink(email: string, resetToken: string, fullName: string): Promise<void> {
    const resetUrl = `${config.clientUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const subject = 'IntervAI Password Reset Request';
    const text = `Hello ${fullName},\n\nYou requested a password reset for your IntervAI account. Click the link below to set a new password:\n\n${resetUrl}\n\nThis link expires in 30 minutes.\n\nBest regards,\nThe IntervAI Team`;
    
    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background-color: #0B1B3A; color: #ffffff; border-radius: 16px; border: 1px solid #1e3a6e;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #38bdf8; font-size: 28px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Interv<span style="color: #ffffff;">AI</span></h1>
          <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">AI Interview Simulation Platform</p>
        </div>

        <p style="font-size: 16px; color: #f8fafc;">Hello <strong>${fullName}</strong>,</p>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
          We received a request to reset the password for your IntervAI account. Click the button below to choose a new password:
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; display: inline-block; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);">
            Reset My Password
          </a>
        </div>

        <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
          Or copy and paste this link into your browser:<br/>
          <a href="${resetUrl}" style="color: #38bdf8; word-break: break-all;">${resetUrl}</a>
        </p>
        
        <p style="font-size: 12px; color: #94a3b8;">
          ⏱️ This link will expire in <strong>30 minutes</strong>.
        </p>

        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748b; text-align: center;">
          If you did not request this password reset, please ignore this email.
        </p>
      </div>
    `;

    await this.deliverEmail(email, subject, text, html, `[AUTH RESET] 🔗 Reset URL for ${email}: ${resetUrl}`);
  }

  private async deliverEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
    consoleSummary: string
  ): Promise<void> {
    const transporter = this.getTransporter();

    console.log(`\n================== EMAIL DISPATCH ==================`);
    console.log(`From: ${config.email.from}`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`${consoleSummary}`);

    if (transporter) {
      try {
        console.log(`[EmailService] 📤 Dispatching real email via Gmail SMTP (${config.email.smtp.user})...`);
        const info = await transporter.sendMail({
          from: config.email.from,
          to,
          subject,
          text,
          html,
        });
        console.log(`[EmailService] ✅ Email sent successfully! MessageID: ${info.messageId}`);
      } catch (err: any) {
        console.error(`[EmailService] ❌ Gmail SMTP delivery failed: ${err.message}`);
        console.warn(`[EmailService] 💡 Tip: Ensure a 16-character Google App Password is set in backend/.env as SMTP_PASS`);
      }
    } else {
      console.log(`[EmailService] ℹ️ SMTP_PASS not set in backend/.env. Using console logger mode.`);
      console.log(`[EmailService] 💡 To receive actual emails from ${config.email.smtp.user}, add SMTP_PASS=<your-16-char-app-password> in backend/.env`);
    }

    console.log(`====================================================\n`);
  }
}

export const emailService = new EmailService();
