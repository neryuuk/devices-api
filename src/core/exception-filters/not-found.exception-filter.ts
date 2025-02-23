import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { ErrorResponseDto } from '../errors/error-response.dto'

@Catch(NotFoundException)
export class NotFoundExceptionFilter extends BaseExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>()
    const error = new ErrorResponseDto({
      statusCode: HttpStatus.NOT_FOUND,
      message: `Entry not found`,
    })

    response.status(error?.statusCode).json(error)
  }
}
