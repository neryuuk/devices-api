import { Test, TestingModule } from '@nestjs/testing'
import { brandMock } from './brand.mock'
import { BrandsController } from './brands.controller'
import { BrandsService } from './brands.service'

const mockService = {
  create: jest.fn().mockReturnValue(brandMock[0]),
  findOne: jest.fn().mockReturnValue(brandMock[1]),
  findAll: jest.fn().mockReturnValue(brandMock),
  update: jest.fn().mockReturnValue(brandMock[0]),
  remove: jest.fn().mockReturnValue(true),
}

describe('BrandsController', () => {
  let controller: BrandsController
  let service: BrandsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [{ provide: BrandsService, useValue: mockService }],
    }).compile()

    controller = module.get<BrandsController>(BrandsController)
    service = module.get<BrandsService>(BrandsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return created entity', async () => {
    const result = await controller.create(brandMock[0])
    expect(result).toBe(brandMock[0])
  })

  it('should fail to create entity', () => {
    const payload = { ...brandMock[0] }
    delete payload.id
    delete payload.name
    expect(controller.create(payload)).rejects
  })

  it('should return entity by id', async () => {
    const result = await controller.findOne(brandMock[1].id)
    expect(result).toBe(brandMock[1])
  })

  it('should failt to return entity by id', () => {
    expect(controller.findOne('a')).rejects
  })

  it('should return all entities', async () => {
    expect(await controller.findAll()).toBe(brandMock)
  })

  it('should return no entities', async () => {
    jest.spyOn(service, 'findAll').mockReturnValue([])
    expect(await controller.findAll()).toHaveLength(0)
  })

  it('should remove entity by id', async () => {
    expect(await controller.remove()).toBe(true)
  })

  it('should fail to remove entity by id', async () => {
    jest.spyOn(service, 'remove').mockReturnValue(false)
    expect(await controller.remove()).toBe(false)
  })
})
