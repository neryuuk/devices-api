import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ErrorResponseDto, errorResponseMock } from '../core/errors'
import { Device } from './device.entity'
import { deviceMock } from './device.mock'
import {
  CreateDeviceDto,
  SearchDeviceDto,
  UpdateDeviceDto,
} from './devices.dto'
import { DevicesService } from './devices.service'

@ApiTags('Devices')
@Controller('devices')
@UseInterceptors(ClassSerializerInterceptor)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiCreatedResponse({ type: Device, example: deviceMock[0] })
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: Device, example: deviceMock[0] })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.devicesService.findOne(+id)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiNotFoundResponse({ type: Device, isArray: true, example: [] })
  @ApiOkResponse({ type: Device, isArray: true, example: deviceMock })
  @Get()
  findAll(@Query() query?: SearchDeviceDto) {
    return this.devicesService.findAll(query)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiOkResponse({ type: Device, example: deviceMock[0] })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateDeviceDto: CreateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiOkResponse({ type: Device, example: deviceMock[0] })
  @Patch(':id')
  updatePartial(
    @Param('id') id: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(+id, updateDeviceDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto, example: errorResponseMock })
  @ApiOkResponse({ type: Boolean, example: true })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.devicesService.remove(+id)
  }
}
