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
import { ErrorResponseDto, errorResponseMock } from '../core/errors'
import { Brand } from './brand.entity'
import { brandMock } from './brand.mock'
import { CreateBrandDto, UpdateBrandDto } from './brands.dto'
import { BrandsService } from './brands.service'

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiCreatedResponse({ type: Brand, example: brandMock[0] })
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: Brand, example: brandMock[0] })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandsService.findOne(+id)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiNotFoundResponse({ type: Brand, isArray: true, example: [] })
  @ApiOkResponse({ type: Brand, isArray: true, example: brandMock })
  @Get()
  findAll() {
    return this.brandsService.findAll()
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiOkResponse({ type: Brand, example: brandMock[0] })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBrandDto: CreateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiOkResponse({ type: Brand, example: brandMock[0] })
  @Patch(':id')
  updatePartial(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(+id, updateBrandDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiOkResponse({ type: Boolean, example: true })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandsService.remove(+id)
  }
}
