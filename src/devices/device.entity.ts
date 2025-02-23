import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { State } from './state.enum'

@Entity('devices')
export class Device {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  public id: number

  @ApiProperty()
  @Column({ type: 'varchar', length: 64, nullable: false })
  public name: string

  @ApiProperty()
  @Column()
  @ManyToOne('brands', {
    createForeignKeyConstraints: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'brand_id' })
  public brand_id: number

  @ApiProperty({ type: String, enum: State })
  @Column({ type: 'enum', enum: State, default: State.AVAILABLE })
  public state: State

  @ApiResponseProperty()
  @CreateDateColumn({ update: false })
  public created_at: Date

  @DeleteDateColumn({ select: false })
  @Exclude({ toPlainOnly: true })
  public deleted_at?: Date

  constructor(partial: Partial<Device>) {
    Object.assign(this, partial)
  }
}
