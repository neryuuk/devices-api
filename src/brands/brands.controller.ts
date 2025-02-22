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
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ErrorResponseDto } from 'src/core/errors'
import { Brand } from './brand.entity'
import { CreateBrandDto, UpdateBrandDto } from './brands.dto'
import { BrandsService } from './brands.service'

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiCreatedResponse({
    type: Brand,
    example: {
      id: 120001,
      name: 'Brand Name 1',
    } as Brand,
  })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto)
  }

  @Get(':id')
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiOkResponse({
    type: Brand,
    example: {
      id: 120001,
      name: 'Brand Name 1',
    } as Brand,
  })
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id)
  }

  @Get()
  @ApiNotFoundResponse({ type: Brand, isArray: true, example: [] })
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
  findAll() {
    return this.brandsService.findAll()
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(+id, updateBrandDto)
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.updatePartial(+id, updateBrandDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id)
  }
}
