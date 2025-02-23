import {
  ArgumentsHost,
  Catch,
  HttpStatus
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { ErrorResponseDto } from '../errors/error-response.dto'
import { ForbiddenEditException } from '../errors/forbidden-edit.error'

@Catch(ForbiddenEditException)
export class ForbiddenEditExceptionFilter extends BaseExceptionFilter {
  catch(exception: ForbiddenEditException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>()
    const error = new ErrorResponseDto({
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Cannot modify devices while in-use`,
    })

    response.status(error?.statusCode).json(error)
  }
}
