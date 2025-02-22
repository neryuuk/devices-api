import { ArgumentsHost, Catch, HttpStatus, NotFoundException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ErrorResponseDto } from '../errors/error-response.dto'

@Catch(NotFoundException)
export class NotFoundExceptionFilter extends BaseExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()
    const error = new ErrorResponseDto({
      statusCode: HttpStatus.NOT_FOUND,
      message: `Entry not found`,
    })

    return response.status(error.statusCode).json(error)
  }
}
