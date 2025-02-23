import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpStatus,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { ErrorResponseDto } from '../errors/error-response.dto'

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends BaseExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const payload = exception.getResponse()
    const response = host.switchToHttp().getResponse<Response>()
    const error = new ErrorResponseDto({
      ...(typeof payload === 'string'
        ? { message: payload }
        : { message: (payload as ErrorResponseDto).message }),
      statusCode: HttpStatus.BAD_REQUEST,
    })

    if (Array.isArray(error.message)) {
      error.message = error.message[0]
    }

    response.status(error.statusCode).json(error)
  }
}
