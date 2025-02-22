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
  UseInterceptors
} from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ErrorResponseDto } from '../core'
import { Device, State } from './device.entity'
import { CreateDeviceDto, UpdateDeviceDto } from './devices.dto'
import { DevicesService } from './devices.service'

@ApiTags('Devices')
@Controller('devices')
@UseInterceptors(ClassSerializerInterceptor)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiCreatedResponse({
    type: Device,
    example: {
      id: 120001,
      name: 'Device Name 1',
      brand_id: 1,
      state: State.AVAILABLE,
      created_at: new Date(),
    } as Device,
  })
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiOkResponse({
    type: Device,
    example: {
      id: 120001,
      name: 'Device Name 1',
      brand_id: 1,
      state: State.AVAILABLE,
      created_at: new Date(),
    } as Device,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: Device, isArray: true, example: [] })
  @ApiOkResponse({
    type: Device,
    isArray: true,
    example: [
      {
        id: 120001,
        name: 'Device Name 1',
        brand_id: 1,
        state: State.AVAILABLE,
        created_at: new Date(),
      },
    ],
  })
  @Get()
  findAll() {
    return this.devicesService.findAll()
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.updatePartial(+id, updateDeviceDto)
  }

  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id)
  }
}
