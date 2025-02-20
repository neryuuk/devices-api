import { Injectable } from '@nestjs/common';
import { CreateDeviceDto, UpdateDeviceDto } from './devices.dto';

@Injectable()
export class DevicesService {
  create(createDeviceDto: CreateDeviceDto) {
    return {
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": new Date(),
    } as unknown as CreateDeviceDto;
  }

  findOne(id: number) {
    return {
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": new Date(),
    } as unknown as CreateDeviceDto;
  }

  findAll() {
    return [{
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": new Date(),
    },{
      "id": "120002",
      "name": "Device Name 2",
      "brand": "Samsung",
      "state": "available",
      "created_at": new Date(),
    },{
      "id": "120003",
      "name": "Device Name 3",
      "brand": "HTC",
      "state": "in-use",
      "created_at": new Date(),
    },{
      "id": "120004",
      "name": "Device Name 4",
      "brand": "Huawei",
      "state": "inactive",
      "created_at": new Date(),
    }] as unknown[] as CreateDeviceDto[]
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return {
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": new Date(),
    } as unknown as CreateDeviceDto;
  }

  updatePartial(id: number, updateDeviceDto: UpdateDeviceDto) {
    return {
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": new Date(),
    } as unknown as CreateDeviceDto;
  }

  remove(id: number) {
    return true;
  }
}
