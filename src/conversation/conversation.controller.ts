import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('api/conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get(':id')
  getConversationById(@Param('id', ParseIntPipe) id: number) {
    return this.conversationService.getConversationById(id);
  }

  @Post()
  createConversation() {
    return this.conversationService.createConversation();
  }

  @Delete(':id')
  deleteConversation(@Param('id', ParseIntPipe) id: number) {
    return this.conversationService.deleteConversation(id);
  }
}
