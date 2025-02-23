import { ApiResponseProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('brands')
export class Brand {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  public id: number

  @ApiResponseProperty()
  @Column()
  public name: string
}
