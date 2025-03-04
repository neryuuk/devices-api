import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Brand } from './brand.entity'
import { CreateBrandDto, UpdateBrandDto } from './brands.dto'

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    return this.brandsRepository
      .createQueryBuilder()
      .insert()
      .values(createBrandDto as Partial<Brand>)
      .returning('*')
      .execute()
      .then((result) => {
        if (result && result.raw && Array.isArray(result.raw) && result.raw[0])
          return result.raw[0] as Brand
      })
  }

  findOne(id: number): Promise<Brand | null> {
    if (Number.isNaN(id)) throw new BadRequestException()

    return this.brandsRepository.findOneBy({ id })
  }

  findAll(): Promise<Brand[]> {
    return this.brandsRepository.find()
  }

  update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    if (Number.isNaN(id)) throw new BadRequestException()

    return this.brandsRepository
      .createQueryBuilder()
      .update(updateBrandDto as Partial<Brand>)
      .where({ id })
      .returning('*')
      .execute()
      .then((result) => {
        if (result && result.raw && Array.isArray(result.raw) && result.raw[0])
          return result.raw[0] as Brand

        throw new NotFoundException()
      })
  }

  remove(id: number): Promise<boolean> {
    if (Number.isNaN(id)) throw new BadRequestException()

    return this.brandsRepository
      .delete({ id })
      .then((result) => result?.affected === 1)
  }
}
