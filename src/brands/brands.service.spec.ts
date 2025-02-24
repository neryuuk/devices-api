import { Test, TestingModule } from '@nestjs/testing';
import { brandMock } from './brand.mock';
import { BrandsService } from './brands.service';

describe('BrandsService', () => {
  let service: BrandsService
  const dataSource = {
    createQueryBuilder: jest.fn(() => {
      return { insert: jest.fn(() => {
        return { values: jest.fn(() => {
          return { returning: jest.fn(() => {
            return { execute: jest.fn(() => Promise.resolve({ raw: brandMock })) }
          }) }
        }) }
      }) }
    }),
    findOneBy: jest.fn(() => brandMock[1]),
    find: jest.fn(() => brandMock),
    delete: jest.fn(() => Promise.resolve({ affected: 1 })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        { provide: 'BrandRepository', useValue: dataSource },
      ],
    }).compile()

    service = module.get(BrandsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return created entity', async () => {
    expect(await service.create(brandMock[0])).toBe(brandMock[0])
  })

  it('should return entity by id', async () => {
    expect(await service.findOne(brandMock[1].id)).toBe(brandMock[1])
  })

  it('should return all entities', async () => {
    expect(await service.findAll()).toBe(brandMock)
  })

  it('should remove entity by id', async () => {
    expect(await service.remove()).toBe(true)
  })
})
