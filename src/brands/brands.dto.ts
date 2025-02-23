import { ApiProperty, ApiSchema, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

@ApiSchema({ name: 'CreateBrandDTO' })
export class CreateBrandDto {
  @ApiProperty({ description: 'Device name' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  public name: string
}

@ApiSchema({ name: 'UpdateBrandDTO' })
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
