import { Module } from '@nestjs/common';
import { OutboxService } from './outbox.service';
import { OutboxRelay } from './outbox.relay';
import { QueueModule } from '../../core/queue/queue.module';

@Module({
  imports: [QueueModule],
  providers: [OutboxService, OutboxRelay],
  exports: [OutboxService],
})
export class OutboxModule {}
