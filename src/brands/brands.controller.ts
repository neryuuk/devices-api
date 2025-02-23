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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ErrorResponseDto } from '../core/errors/error-response.dto'
import { Brand } from './brand.entity'
import { CreateBrandDto, UpdateBrandDto } from './brands.dto'
import { BrandsService } from './brands.service'

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiCreatedResponse({
    type: Brand,
    example: {
      id: 120001,
      name: 'Brand Name 1',
    } as Brand,
  })
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiOkResponse({
    type: Brand,
    example: {
      id: 120001,
      name: 'Brand Name 1',
    } as Brand,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandsService.findOne(+id)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
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
  @Get()
  findAll() {
    return this.brandsService.findAll()
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBrandDto: CreateBrandDto
  ) {
    return this.brandsService.update(+id, updateBrandDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Patch(':id')
  updatePartial(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(+id, updateBrandDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandsService.remove(+id)
  }
}
