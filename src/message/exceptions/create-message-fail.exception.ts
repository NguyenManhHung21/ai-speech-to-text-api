import { BadRequestException } from '@nestjs/common';

export class CreateMessageFailException extends BadRequestException {
  constructor() {
    super(
      'An error occurred while creating the message. Please ensure all required fields are correct and try again.',
    );
  }
}
