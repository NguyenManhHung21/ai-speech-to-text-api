import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConversationFailException } from './exceptions/create-conversation-fail.exception';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  async getConversationById(id: number) {
    try {
      const conversation = await this.prisma.message.findMany({
        where: {
          conversationId: id,
        },
        select: {
          sender: true,
          systemResponse: true,
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (!conversation) {
        throw new NotFoundException(`Conversation with id ${id} not found`);
      }
      return conversation;
    } catch (error) {
      throw new NotFoundException(`Conversation with id ${id} not found`);
    }
  }

  async createConversation() {
    try {
      const conversation = await this.prisma.conversation.create({});
      if (!conversation) {
        throw new CreateConversationFailException();
      }
      return conversation;
    } catch (error) {
      throw new CreateConversationFailException();
    }
  }
}
