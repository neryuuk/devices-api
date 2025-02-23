import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from '@nestjs/swagger'
import { State } from './state.enum'

@ApiSchema({ name: 'CreateDeviceDTO' })
export class CreateDeviceDto {
  @ApiProperty()
  public name: string

  @ApiProperty()
  public brand_id: number

  @ApiProperty({ type: String })
  public state: State
}

@ApiSchema({ name: 'UpdateDeviceDTO' })
export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}

@ApiSchema({ name: 'SearchDeviceDTO' })
export class SearchDeviceDto {
  @ApiPropertyOptional()
  public brand_id?: number

  @ApiPropertyOptional({ type: String, enum: State })
  public state?: State
}
