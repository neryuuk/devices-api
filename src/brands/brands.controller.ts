import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Brand } from './brand.entity'
import { CreateBrandDto, UpdateBrandDto } from './brands.dto'
import { BrandsService } from './brands.service'

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto)
  }

  @Get(':id')
  @ApiOkResponse({
    type: Brand,
    example: {
      id: 120001,
      name: 'Brand Name 1',
    } as Brand,
  })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id)
  }

  @Get()
  @ApiOkResponse({
    type: Brand,
    isArray: true,
    example: [
      {
        id: 120001,
        name: 'Brand Name 1',
      },
    ],
  })
  @ApiNotFoundResponse({ type: Brand, isArray: true, example: [] })
  findAll() {
    return this.brandsService.findAll()
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto)
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.updatePartial(+id, updateBrandDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id)
  }
}
