import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Message, Timeline } from '../types';
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

  @Get()
  async getTimeline(@Res() response: Response): Promise<Timeline | void> {
    try {
      const timeline =
        await this.appService.readingMessageInPersonnalTimeline();
      response.status(HttpStatus.OK).send(timeline);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
