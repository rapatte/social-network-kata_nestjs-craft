import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Message } from '../types/Message';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(
    @Body() message: Message,
    @Res() response: Response,
  ): Promise<Message | void> {
    try {
      const newMessage = await this.appService.postingMessageInPersonalTimeline(
        message,
      );
      response.status(HttpStatus.CREATED).send(newMessage);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
