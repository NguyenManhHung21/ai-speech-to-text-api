import { BadRequestException } from '@nestjs/common';

export class CreateConversationFailException extends BadRequestException {
  constructor() {
    super(
      'An error occurred while creating the conversation. Please ensure all required fields are correct and try again.',
    );
  }
}
