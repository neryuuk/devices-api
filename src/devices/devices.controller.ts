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
import { Device, State } from './device.entity'
import { CreateDeviceDto, UpdateDeviceDto } from './devices.dto'
import { DevicesService } from './devices.service'

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto)
  }

  @Get(':id')
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
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id)
  }

  @Get()
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
  @ApiNotFoundResponse({ type: Device, isArray: true, example: [] })
  findAll() {
    return this.devicesService.findAll()
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto)
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.updatePartial(+id, updateDeviceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id)
  }
}
