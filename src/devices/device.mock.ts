import { Device } from './device.entity'
import { State } from './state.enum'

export const deviceMock = [
  {
    id: 120001,
    name: 'Device Name 1',
    brand_id: 1,
    state: State.AVAILABLE,
    created_at: new Date(),
  },
  {
    id: 120002,
    name: 'Device Name 2',
    brand_id: 2,
    state: State.IN_USE,
    created_at: new Date(),
  },
  {
    id: 120003,
    name: 'Device Name 3',
    brand_id: 2,
    state: State.INACTIVE,
    created_at: new Date(),
  },
] as Device[]
