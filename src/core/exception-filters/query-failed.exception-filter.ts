import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'
import { ErrorResponseDto } from '../errors/error-response.dto'

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const { code } = exception as Partial<{ code: string }>
    const response = host.switchToHttp().getResponse<Response>()
    const error = new ErrorResponseDto({
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Error #${code} while running query`,
    })

    if (code === '23503') {
      error.message = 'Cannot delete item while in use'
    }

    response.status(error.statusCode).json(error)
  }
}
