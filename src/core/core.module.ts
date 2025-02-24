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
      synchronize: process.env.NODE_ENV !== 'production',
      dropSchema: process.env.NODE_ENV === 'test',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'devices_api',
      password: process.env.DB_PASS || 'devices_api',
      database: process.env.DB_DB || 'devices_api',
      applicationName: process.env.APP_NAME || 'devices_api',
      entities: [Brand, Device],
    }),
    BrandsModule,
    DevicesModule,
  ],
})
export class CoreModule {
  constructor(private dataSource: DataSource) {}
}
