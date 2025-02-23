import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, IsNull, Repository } from 'typeorm'
import { Device } from './device.entity'
import {
  CreateDeviceDto,
  SearchDeviceDto,
  UpdateDeviceDto,
} from './devices.dto'

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
      .then((result) => {
        if (
          result &&
          result.raw &&
          Array.isArray(result.raw) &&
          result.raw[0]
        ) {
          return new Device(result.raw[0] as Device)
        }
      })
  }

  findOne(id: number): Promise<Device | null> {
    if (Number.isNaN(id)) throw new BadRequestException()

    return this.devicesRepository
      .findOneBy({ id, deleted_at: IsNull() })
      .then((result) => {
        if (!result) throw new NotFoundException()
        return result
      })
  }

  findAll(query?: SearchDeviceDto): Promise<Device[]> {
    return this.devicesRepository.findBy(
      query as FindOptionsWhere<SearchDeviceDto>,
    )
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    if (Number.isNaN(id)) throw new BadRequestException()

    return this.devicesRepository.save(
      { ...updateDeviceDto, id } as Partial<Device>,
      { reload: true },
    )
  }

  updatePartial(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    if (Number.isNaN(id)) throw new BadRequestException()

    return this.devicesRepository.save(
      { ...updateDeviceDto, id } as Partial<Device>,
      { reload: true },
    )
  }

  remove(id: number): Promise<boolean> {
    if (Number.isNaN(id)) throw new BadRequestException()

    return this.devicesRepository
      .softDelete({ id, deleted_at: IsNull() })
      .then((result) => result?.affected === 1)
  }
}
