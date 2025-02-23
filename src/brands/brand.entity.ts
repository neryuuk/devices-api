import { ApiResponseProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('brands')
export class Brand {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  public id: number

  @ApiResponseProperty()
  @Column({ type: 'varchar', length: 64, nullable: false })
  public name: string
}
