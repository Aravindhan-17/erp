import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaService } from '../database/prisma.service';

@Processor('flasherp-queue')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job<unknown, unknown, string>): Promise<void> {
    if (job.name === 'send-email') {
      return this.handleSendEmail(
        job.data as {
          deliveryId: string;
          to: string;
          subject: string;
          payload: Record<string, unknown>;
          emailType: string;
        },
      );
    }
  }

  private async handleSendEmail(data: {
    deliveryId: string;
    to: string;
    subject: string;
    payload: Record<string, unknown>;
    emailType: string;
  }) {
    this.logger.log(`Processing email delivery ${data.deliveryId}`);

    const delivery = await this.prisma.emailDelivery.findUnique({
      where: { id: data.deliveryId },
    });
    if (!delivery) return;

    if (delivery.status === 'PROCESSED') {
      this.logger.log(
        `Email delivery ${data.deliveryId} already processed, skipping.`,
      );
      return;
    }

    try {
      // Simulate sending logic based on type
      if (data.emailType === 'PASSWORD_RESET') {
        await this.emailService.sendPasswordResetEmail(
          data.to,
          (data.payload as { resetToken: string }).resetToken,
        );
      } else {
        this.logger.warn(`Unknown emailType: ${data.emailType}`);
      }

      await this.prisma.emailDelivery.update({
        where: { id: data.deliveryId },
        data: {
          status: 'PROCESSED',
        },
      });

      this.logger.log(`Successfully sent email delivery ${data.deliveryId}`);
    } catch (e) {
      const error = e as Error;
      this.logger.error(
        `Failed to send email delivery ${data.deliveryId}`,
        error,
      );

      await this.prisma.emailDelivery.update({
        where: { id: data.deliveryId },
        data: {
          attempts: { increment: 1 },
          lastError: error.message,
        },
      });

      // Bubble up to trigger BullMQ retry
      throw error;
    }
  }
}
