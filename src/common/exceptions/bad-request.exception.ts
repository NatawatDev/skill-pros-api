import { HttpException } from './http-exception'

export class BadRequestException extends HttpException {
  constructor(message = 'Bad request') {
    super(message, 400)
  }
}