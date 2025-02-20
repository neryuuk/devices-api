import { ApiProperty, ApiResponseProperty, ApiSchema, PartialType } from "@nestjs/swagger";

@ApiSchema({ name: 'CreateDeviceDTO' })
export class CreateDeviceDto {
  @ApiResponseProperty()
  public id: number

  @ApiProperty()
  public name: string

  @ApiProperty()
  public brand: number

  @ApiProperty()
  public state: string

  @ApiResponseProperty()
  public created_at: Date
}

@ApiSchema({ name: 'UpdateDeviceDTO' })
export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
