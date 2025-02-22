import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Brand, BrandsModule } from '../brands'
import { Device, DevicesModule } from '../devices'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'devices_api',
      password: 'devices_api',
      database: 'devices_api',
      applicationName: 'devices_api',
      entities: [Brand, Device],
    }),
    BrandsModule,
    DevicesModule,
  ],
})
export class CoreModule {
  constructor(private dataSource: DataSource) {}
}
