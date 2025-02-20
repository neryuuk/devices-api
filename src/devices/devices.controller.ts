import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DevicesService } from "./devices.service";

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create() {
    return this.devicesService.create();
  }

  @Get('/:deviceId')
  readOne() {
    return this.devicesService.readOne()
  }

  @Get()
  readAll() {
    return this.devicesService.readAll()
  }

  @Put()
  update() {
    return this.devicesService.update()
  }

  @Patch()
  updatePartial() {
    return this.devicesService.updatePartial()
  }

  @Delete()
  delete() {
    return this.devicesService.delete()
  }
}
