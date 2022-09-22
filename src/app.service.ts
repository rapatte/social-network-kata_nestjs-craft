import { Injectable } from '@nestjs/common';
import { Message } from '../types/Message';
import { TimelineMocked } from './app.repository';

@Injectable()
export class AppService {
  async postingMessageInPersonalTimeline(message: Message): Promise<Message> {
    TimelineMocked.push(message);
    return message;
  }
  async readingMessageInPersonnalTimeline(): Promise<Message[]> {
    return TimelineMocked;
  }
}
