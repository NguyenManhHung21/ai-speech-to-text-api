import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Message } from './dto/message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageFailException } from './exceptions/create-message-fail.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(message: Message, conversationId: string | null) {
    try {
      if (!conversationId) {
        const newConversation = await this.prisma.conversation.create({});
        const newMessage = await this.prisma.message.create({
          data: {
            conversationId: newConversation.id,
            ...message,
          },
        });
        if (!newMessage) {
          throw new CreateMessageFailException();
        }
        return newMessage;
      } else {
        const newMessage = await this.prisma.message.create({
          data: {
            conversationId: Number(conversationId),
            ...message,
          },
        });
        if (!newMessage) {
          throw new CreateMessageFailException();
        }
        return newMessage;
      }
    } catch (error) {
      console.log(error);
      throw new CreateMessageFailException();
    }
  }
  async getAllFirstMessages() {
    try {
      const distinctMessages = await this.prisma.message.findMany({
        where: {},
        distinct: ['conversationId'],
        select: {
          sender: true,
          conversationId: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      if (!distinctMessages) {
        throw new NotFoundException();
      }
      return distinctMessages;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
