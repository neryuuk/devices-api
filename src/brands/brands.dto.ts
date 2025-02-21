import { ApiProperty, ApiSchema, PartialType } from '@nestjs/swagger'

@ApiSchema({ name: 'CreateBrandDTO' })
export class CreateBrandDto {
  @ApiProperty({ description: 'Device name' })
  public name: string
}

@ApiSchema({ name: 'UpdateBrandDTO' })
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
