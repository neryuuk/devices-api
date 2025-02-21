import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Brand } from './brand.entity'
import { BrandsController } from './brands.controller'
import { BrandsService } from './brands.service'

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [TypeOrmModule.forFeature([Brand])],
})
export class BrandsModule {}
