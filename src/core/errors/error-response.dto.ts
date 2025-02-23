import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util'
import { ApiResponseProperty, ApiSchema } from '@nestjs/swagger'

@ApiSchema({ name: 'ErrorResponseDTO' })
export class ErrorResponseDto {
  @ApiResponseProperty({ type: Number })
  public statusCode: ErrorHttpStatusCode

  @ApiResponseProperty()
  public message: string

  constructor(data: Partial<ErrorResponseDto>) {
    Object.assign(this, data)
  }
}
