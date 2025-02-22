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
    return this.devicesRepository
      .createQueryBuilder()
      .insert()
      .values({ ...createDeviceDto } as Device)
      .returning(Device.fields)
      .execute()
      .then(result => {
        return result.raw[0] as Omit<Device, 'is_deleted'|'deleted_at'>
      })
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
