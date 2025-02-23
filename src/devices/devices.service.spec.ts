import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule } from '../core'
import { Device } from './device.entity'
import { DevicesService } from './devices.service'

describe('DevicesService', () => {
  let service: DevicesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Device]), CoreModule],
      providers: [DevicesService],
    }).compile()

    service = module.get<DevicesService>(DevicesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
