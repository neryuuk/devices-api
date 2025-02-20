import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './devices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DevicesModule,
  ],
})
export class AppModule {}
