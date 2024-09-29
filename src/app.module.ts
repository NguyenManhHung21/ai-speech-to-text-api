import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationService } from './conversation/conversation.service';
import { ConversationModule } from './conversation/conversation.module';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MessageService } from './message/message.service';

@Module({
  imports: [
    ConversationModule,
    MessageModule,
    PrismaModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
  ],
  controllers: [AppController, MessageController],
  providers: [AppService, ConversationService, MessageService],
})
export class AppModule {}
