import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ForbiddenEditException } from 'src/core/errors/forbidden-edit.error'
import { FindOptionsWhere, IsNull, Repository } from 'typeorm'
import { Device } from './device.entity'
import {
  CreateDeviceDto,
  SearchDeviceDto,
  UpdateDeviceDto,
} from './devices.dto'
import { State } from './state.enum'

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

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    if (Number.isNaN(id)) throw new BadRequestException()

    const statusCheck = await this.devicesRepository.findOneBy({ id })
    if (
      statusCheck?.state === State.IN_USE &&
      (updateDeviceDto.name || updateDeviceDto.brand_id)
    ) throw new ForbiddenEditException()

    const result = await this.devicesRepository
      .createQueryBuilder()
      .update(updateDeviceDto as Partial<Device>)
      .where({ id })
      .returning('*')
      .execute()

    if (
      result &&
      result.raw &&
      Array.isArray(result.raw) &&
      result.raw[0]
    ) return new Device(result.raw[0] as Device)

    throw new NotFoundException()
  }

  remove(id: number): Promise<boolean> {
    if (Number.isNaN(id)) throw new BadRequestException()

    return this.devicesRepository
      .softDelete({ id, deleted_at: IsNull() })
      .then((result) => result?.affected === 1)
  }
}
