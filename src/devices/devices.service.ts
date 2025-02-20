import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device, State } from './device.entity';
import { CreateDeviceDto, UpdateDeviceDto } from './devices.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    return this.devicesRepository.save({ ...createDeviceDto } as Device)
  }

  findOne(id: number): Promise<Device | null> {
    return this.devicesRepository.findOneBy({ id });
  }

  findAll(): Promise<Device[]> {
    return Promise.resolve([{
      id: 120001,
      name: "Device Name 1",
      brand_id: 1,
      state: State.AVAILABLE,
      created_at: new Date(),
    },{
      id: 120002,
      name: "Device Name 2",
      brand_id: 2,
      state: State.AVAILABLE,
      created_at: new Date(),
    },{
      id: 120003,
      name: "Device Name 3",
      brand_id: 3,
      state: State.IN_USE,
      created_at: new Date(),
    },{
      id: 120004,
      name: "Device Name 4",
      brand_id: 4,
      state: State.INACTIVE,
      created_at: new Date(),
    }] as Device[])
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    return Promise.resolve({
      id: 120001,
      name: "Device Name 1",
      brand_id: 1,
      state: State.AVAILABLE,
      created_at: new Date(),
    } as Device);
  }

  updatePartial(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    return Promise.resolve({
      id: 120001,
      name: "Device Name 1",
      brand_id: 1,
      state: State.AVAILABLE,
      created_at: new Date(),
    } as Device);
  }

  remove(id: number): Promise<boolean> {
    return Promise.resolve(true);
  }
}
