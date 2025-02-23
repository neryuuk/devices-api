import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, IsNull, Repository } from 'typeorm'
import { Device } from './device.entity'
import { CreateDeviceDto, SearchDeviceDto, UpdateDeviceDto } from './devices.dto'

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
      .values(createDeviceDto as Partial<Device>)
      .returning('*')
      .execute()
      .then(result => new Device(result.raw[0]))
  }

  findOne(id: number): Promise<Device | null> {
    return this.devicesRepository
      .findOneBy({ id, deleted_at: IsNull() })
      .then(result => {
        if (!result) throw new NotFoundException()
        return result
      })
  }

  findAll(query?: SearchDeviceDto): Promise<Device[]> {
    const queryOptions: FindManyOptions<Partial<SearchDeviceDto>> = {}
    return this.devicesRepository.find()
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
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
    return this.devicesRepository
      .softDelete({ id, deleted_at: IsNull() })
      .then(result => result?.affected === 1)
  }
}
