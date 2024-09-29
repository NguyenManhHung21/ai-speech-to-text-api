import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [ConfigModule],
})
export class PrismaModule {}
