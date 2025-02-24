import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { brandMock } from 'src/brands/brand.mock'
import { deviceMock } from 'src/devices/device.mock'
import request from 'supertest'
import { App } from 'supertest/types'
import { DataSource } from 'typeorm'
import { CoreModule } from '../src/core/core.module'

describe('device-api (e2e)', () => {
  let app: INestApplication<App>
  let dataSource: DataSource

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
    }).compile()

    app = module.createNestApplication()

    await app.init()
  })

  it('GET /brands (empty)', () => {
    return request(app.getHttpServer())
      .get('/brands')
      .expect(200)
      .expect([])
  })

  it('POST /brands', () => {
    return request(app.getHttpServer())
      .post('/brands')
      .send(brandMock[0])
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect(brandMock[0])
  })

  it('POST /brands', () => {
    return request(app.getHttpServer())
      .post('/brands')
      .send(brandMock[1])
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect(brandMock[1])
  })

  it('GET /brands/1', () => {
    return request(app.getHttpServer())
      .get('/brands/1')
      .expect(200)
      .expect(brandMock[0])
  })

  it('GET /brands', () => {
    return request(app.getHttpServer())
      .get('/brands')
      .expect(200)
      .expect([brandMock[0], brandMock[1]])
  })

  it('GET /devices (empty)', () => {
    return request(app.getHttpServer())
      .get('/devices')
      .expect(200)
      .expect([])
  })

  it('POST /devices', () => {
    return request(app.getHttpServer())
      .post('/devices')
      .send(deviceMock[0])
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect(({ body }) => {
        if (
          (body.name !== deviceMock[0].name) ||
          (body.brand_id !== deviceMock[0].brand_id) ||
          (body.state !== deviceMock[0].state)
        ) throw new Error()
      })
  })

  it('GET /devices/1', () => {
    return request(app.getHttpServer())
      .get('/devices/1')
      .expect(200)
      .expect(({ body }) => {
        if (
          (body.name !== deviceMock[0].name) ||
          (body.brand_id !== deviceMock[0].brand_id) ||
          (body.state !== deviceMock[0].state)
        ) throw new Error()
      })
  })

  it('DELETE /devices/1', () => {
    return request(app.getHttpServer())
      .delete('/devices/1')
      .expect(200)
      .expect('true')
  })

  it('DELETE /brands/2', () => {
    return request(app.getHttpServer())
      .delete('/brands/2')
      .expect(200)
      .expect('true')
  })

  afterAll(async () => { await app.close() })
})
