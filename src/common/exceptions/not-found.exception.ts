import { HttpException } from './http-exception'

export class NotFoundException extends HttpException {
  constructor(message = 'Not found') {
    super(message, 404)
  }
}