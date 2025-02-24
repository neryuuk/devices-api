import { Device } from './device.entity'
import { State } from './state.enum'

export const deviceMock = [
  {
    id: 1,
    name: 'Device Name 1',
    brand_id: 1,
    state: State.AVAILABLE,
    created_at: new Date(),
  },
  {
    id: 2,
    name: 'Device Name 2',
    brand_id: 1,
    state: State.IN_USE,
    created_at: new Date(),
  },
  {
    id: 3,
    name: 'Device Name 3',
    brand_id: 1,
    state: State.INACTIVE,
    created_at: new Date(),
  },
] as Device[]
