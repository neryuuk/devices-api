import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Device, DevicesModule } from './devices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'devices-api',
      password: 'devices-api',
      database: 'devices-api',
      entities: [Device],
      synchronize: true,
    }),
    DevicesModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
