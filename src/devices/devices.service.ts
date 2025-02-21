import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Device } from './device.entity'
import { CreateDeviceDto, UpdateDeviceDto } from './devices.dto'

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    return this.devicesRepository.save({ ...createDeviceDto } as Device)
  }

  findOne(id: number): Promise<Device | null> {
    return this.devicesRepository.findOneBy({ id })
  }

  findAll(): Promise<Device[]> {
    return this.devicesRepository.find()
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    return this.devicesRepository.save(
      { ...updateDeviceDto, id } as Partial<Device>,
      { reload: true },
    )
  }

  updatePartial(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    return this.devicesRepository.save(
      { ...updateDeviceDto, id } as Partial<Device>,
      { reload: true },
    )
  }

  remove(id: number): Promise<boolean> {
    return Promise.resolve(true)
  }
}
