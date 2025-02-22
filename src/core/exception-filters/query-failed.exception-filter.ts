import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { QueryFailedError } from 'typeorm'
import { ErrorResponseDto } from '../errors/error-response.dto'

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const { code } = exception as Partial<{ code: string }>
    const context = host.switchToHttp()
    const response = context.getResponse()
    const error = new ErrorResponseDto({
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Error #${code} while running query`,
    })

    if (code === '23503') {
      error.message = 'Cannot delete item while in use'
    }

    return response.status(error.statusCode).json(error)
  }
}
