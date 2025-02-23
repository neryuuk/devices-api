import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule } from '../core'
import { Brand } from './brand.entity'
import { BrandsController } from './brands.controller'
import { BrandsService } from './brands.service'

describe('BrandsController', () => {
  let controller: BrandsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Brand]), CoreModule],
      controllers: [BrandsController],
      providers: [BrandsService],
    }).compile()

    controller = module.get<BrandsController>(BrandsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
