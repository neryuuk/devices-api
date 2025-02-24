import { Test, TestingModule } from '@nestjs/testing'
import { deviceMock } from './device.mock'
import { DevicesService } from './devices.service'

describe('DevicesService', () => {
  let service: DevicesService
  const dataSource = {
    findOneBy: jest.fn(() => Promise.resolve(deviceMock[0])),
    findBy: jest.fn(() => deviceMock),
    softDelete: jest.fn(() => Promise.resolve({ affected: 1 })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        { provide: 'DeviceRepository', useValue: dataSource },
      ],
    }).compile()

    service = module.get(DevicesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return entity by id', async () => {
    expect(await service.findOne(deviceMock[0].id)).toBe(deviceMock[0])
  })

  it('should return all entities', async () => {
    expect(await service.findAll()).toBe(deviceMock)
  })

  it('should remove entity by id', async () => {
    expect(await service.remove(deviceMock[0].id)).toBe(true)
  })
})
