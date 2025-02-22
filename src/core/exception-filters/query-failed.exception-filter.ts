import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter'
import { QueryFailedError } from 'typeorm'
import { ErrorResponseDto } from '../errors/error-response.dto'

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter extends ExternalExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const { code } = exception as unknown as { code: string }
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
