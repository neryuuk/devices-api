import { HttpStatus } from "@nestjs/common"
import { ApiResponseProperty, ApiSchema } from "@nestjs/swagger"

@ApiSchema({ name: 'ErrorResponseDTO' })
export class ErrorResponseDto {
  @ApiResponseProperty()
  public statusCode: HttpStatus

  @ApiResponseProperty()
  public message: string

  constructor(data: Partial<ErrorResponseDto>) {
    Object.assign(this, data)
  }
}
