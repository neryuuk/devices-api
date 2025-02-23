import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  PartialType,
} from '@nestjs/swagger'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from 'class-validator'
import { State } from './state.enum'

@ApiSchema({ name: 'CreateDeviceDTO' })
export class CreateDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  public name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  public brand_id: number

  @ApiProperty({ type: String, enum: State })
  @IsNotEmpty()
  @IsEnum(State)
  public state: State
}

@ApiSchema({ name: 'UpdateDeviceDTO' })
export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}

@ApiSchema({ name: 'SearchDeviceDTO' })
export class SearchDeviceDto {
  @ApiPropertyOptional()
  @IsOptional()
  public brand_id?: number

  @ApiPropertyOptional({ type: String, enum: State })
  @IsEnum(State)
  @IsOptional()
  public state?: State
}
