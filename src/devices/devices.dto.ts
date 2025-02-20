import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";

@ApiSchema({ name: 'CreateDeviceDTO' })
export class CreateDeviceDto {
  @ApiProperty()
  public name: string

  @ApiProperty()
  public brand_id: number

  @ApiProperty()
  public state: string
}

@ApiSchema({ name: 'UpdateDeviceDTO' })
export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
