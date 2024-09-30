import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteConversation(id: number) {
    try {
      const conversation = await this.prisma.conversation.findUnique({
        where: { id },
      });
      if (!conversation) {
        throw new NotFoundException();
      }
      const deleteAllMessageById = await this.prisma.message.deleteMany({
        where: {
          conversationId: conversation.id,
        },
      });
      const deleteConversation = await this.prisma.conversation.delete({
        where: {
          id: conversation.id,
        },
      });
      return deleteConversation;
    } catch (error) {
      throw new Error(error);
    }
  }
}
