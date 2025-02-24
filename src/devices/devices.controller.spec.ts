import { Test, TestingModule } from '@nestjs/testing'
import { deviceMock } from './device.mock'
import { DevicesController } from './devices.controller'
import { DevicesService } from './devices.service'

const mockService = {
  create: jest.fn().mockReturnValue(deviceMock[0]),
  findOne: jest.fn().mockReturnValue(deviceMock[1]),
  findAll: jest.fn().mockReturnValue(deviceMock),
  update: jest.fn().mockReturnValue(deviceMock[0]),
  remove: jest.fn().mockReturnValue(true),
}

describe('DevicesController', () => {
  let controller: DevicesController
  let service: DevicesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [{ provide: DevicesService, useValue: mockService }],
    }).compile()

    controller = module.get(DevicesController)
    service = module.get(DevicesService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return created entity', async () => {
    const result = await controller.create(deviceMock[0])
    expect(result).toBe(deviceMock[0])
  })

  it('should fail to create entity', () => {
    const payload = { ...deviceMock[0] }
    delete payload.id
    delete payload.created_at
    delete payload.deleted_at
    delete payload.brand_id
    expect(controller.create(payload)).rejects
  })

  it('should return entity by id', async () => {
    const result = await controller.findOne(deviceMock[1].id)
    expect(result).toBe(deviceMock[1])
  })

  it('should failt to return entity by id', () => {
    expect(controller.findOne('a')).rejects
  })

  it('should return all entities', async () => {
    expect(await controller.findAll()).toBe(deviceMock)
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
