import { ApiProperty, ApiResponseProperty, PartialType } from "@nestjs/swagger";
import { UUID } from "node:crypto";

export class CreateDeviceDto {
  @ApiResponseProperty()
  public id: UUID
  @ApiProperty()
  public name: string
  @ApiProperty()
  public brand: number
  @ApiProperty()
  public state: string
  @ApiResponseProperty()
  public created_at: Date
}

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
