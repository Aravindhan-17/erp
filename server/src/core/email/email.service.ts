import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  private readonly logger = new Logger(EmailService.name);
  private readonly defaultFrom: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.resend = new Resend(apiKey);
    // You should verify this domain in Resend. Using a fallback for testing if not set.
    this.defaultFrom = this.configService.get<string>('EMAIL_FROM') || 'FlashERP Admin <onboarding@resend.dev>';
  }

  async sendPasswordResetEmail(to: string, resetToken: string) {
    // Assuming frontend runs on localhost:5173 for development, 
    // ideally this should come from an environment variable (e.g. FRONTEND_URL).
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:5173';
    const resetLink = `${frontendUrl}/auth/reset-password?token=${resetToken}`;

    try {
      const { data, error } = await this.resend.emails.send({
        from: this.defaultFrom,
        to,
        subject: 'Reset Your Admin Password - FlashERP',
        html: `
          <h1>Password Reset Request</h1>
          <p>You requested a password reset for your FlashERP admin account.</p>
          <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
          <a href="${resetLink}">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
        `,
      });

      if (error) {
        this.logger.error(`Failed to send email to ${to}`, error);
        throw new Error('Failed to send email');
      }

      this.logger.log(`Password reset email sent to ${to} (ID: ${data?.id})`);
      return data;
    } catch (err) {
      this.logger.error(`Failed to send email to ${to}`, err);
      throw err;
    }
  }
}
