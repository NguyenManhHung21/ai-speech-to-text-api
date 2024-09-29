import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { Message } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('api/message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  createMessage(
    @Body('conversationId') conversationId: string | null,
    @Body('message') message: Message,
  ) {
    return this.messageService.createMessage(message, conversationId);
  }

  @Get()
  getAllFirstMessage() {
    return this.messageService.getAllFirstMessages();
  }
}
