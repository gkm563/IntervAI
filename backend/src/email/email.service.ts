import nodemailer from 'nodemailer';
import { config } from '../config';

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (config.email.provider === 'smtp' && config.email.smtp.host) {
      this.transporter = nodemailer.createTransport({
        host: config.email.smtp.host,
        port: config.email.smtp.port,
        secure: config.email.smtp.port === 465,
        auth: {
          user: config.email.smtp.user,
          pass: config.email.smtp.pass,
        },
      });
    }
  }

  async sendVerificationOtp(email: string, otpCode: string, fullName: string): Promise<void> {
    const subject = `Your IntervAI Verification Code: ${otpCode}`;
    const text = `Hello ${fullName},\n\nYour 6-digit verification code for IntervAI is: ${otpCode}\n\nThis code expires in 10 minutes. If you did not request this, please ignore this email.\n\nBest regards,\nThe IntervAI Team`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0B1B3A; color: #ffffff; border-radius: 12px;">
        <h1 style="color: #38bdf8; margin-bottom: 8px;">IntervAI</h1>
        <p style="font-size: 16px; color: #e2e8f0;">Hello ${fullName},</p>
        <p style="font-size: 15px; color: #cbd5e1;">Welcome to IntervAI! Enter the following 6-digit code to verify your account and start your interview preparation:</p>
        <div style="background-color: #1e293b; padding: 18px; border-radius: 8px; text-align: center; margin: 24px 0; border: 1px solid #334155;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #38bdf8;">${otpCode}</span>
        </div>
        <p style="font-size: 14px; color: #94a3b8;">This code expires in <strong>10 minutes</strong>. Never share this code with anyone.</p>
        <hr style="border: 0; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748b;">If you did not register for an IntervAI account, please disregard this email.</p>
      </div>
    `;

    await this.deliverEmail(email, subject, text, html, `[AUTH OTP] 🔑 Verification Code for ${email}: ${otpCode}`);
  }

  async sendPasswordResetLink(email: string, resetToken: string, fullName: string): Promise<void> {
    const resetUrl = `${config.clientUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const subject = 'IntervAI Password Reset Request';
    const text = `Hello ${fullName},\n\nYou requested a password reset for your IntervAI account. Click the link below to set a new password:\n\n${resetUrl}\n\nThis link expires in 30 minutes.\n\nBest regards,\nThe IntervAI Team`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0B1B3A; color: #ffffff; border-radius: 12px;">
        <h1 style="color: #38bdf8; margin-bottom: 8px;">IntervAI</h1>
        <p style="font-size: 16px; color: #e2e8f0;">Hello ${fullName},</p>
        <p style="font-size: 15px; color: #cbd5e1;">We received a request to reset the password for your IntervAI account. Click the button below to choose a new password:</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${resetUrl}" style="background-color: #0284c7; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset My Password</a>
        </div>
        <p style="font-size: 14px; color: #94a3b8;">Or copy and paste this link into your browser:<br/><a href="${resetUrl}" style="color: #38bdf8; word-break: break-all;">${resetUrl}</a></p>
        <p style="font-size: 14px; color: #94a3b8;">This link will expire in <strong>30 minutes</strong>.</p>
        <hr style="border: 0; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748b;">If you did not request this password reset, please ignore this email.</p>
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
    // Always print cleanly to server logs for effortless local dev inspection
    console.log(`\n================== EMAIL SERVICE (${config.email.provider.toUpperCase()}) ==================`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`${consoleSummary}`);
    console.log(`=========================================================================\n`);

    if (config.email.provider === 'smtp' && this.transporter) {
      try {
        await this.transporter.sendMail({
          from: config.email.from,
          to,
          subject,
          text,
          html,
        });
      } catch (err: any) {
        console.error(`[EmailService] SMTP error: ${err.message}`);
      }
    } else if (config.email.provider === 'resend' && config.email.resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.email.resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: config.email.from,
            to,
            subject,
            text,
            html,
          }),
        });
        if (!response.ok) {
          const errBody = await response.text();
          console.error(`[EmailService] Resend API error: ${errBody}`);
        }
      } catch (err: any) {
        console.error(`[EmailService] Resend network error: ${err.message}`);
      }
    }
  }
}

export const emailService = new EmailService();
