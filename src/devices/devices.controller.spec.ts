import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule } from '../core'
import { Device } from './device.entity'
import { DevicesController } from './devices.controller'
import { DevicesService } from './devices.service'

describe('DevicesController', () => {
  let controller: DevicesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Device]), CoreModule],
      controllers: [DevicesController],
      providers: [DevicesService],
    }).compile()

    controller = module.get<DevicesController>(DevicesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
