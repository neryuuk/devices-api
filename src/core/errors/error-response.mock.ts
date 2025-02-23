import { HttpStatus } from "@nestjs/common";

export const errorResponseMock = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Bad Request"
}
