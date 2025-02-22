import { CoreModule } from '@core'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Brand } from './brand.entity'
import { BrandsService } from './brands.service'

describe('BrandsService', () => {
  let service: BrandsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Brand]), CoreModule],
      providers: [BrandsService],
    }).compile()

    service = module.get<BrandsService>(BrandsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
