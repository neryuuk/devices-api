import { ApiHideProperty, ApiResponseProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum State {
  AVAILABLE = 'available',
  IN_USE = 'in-use',
  INACTIVE = 'inactive',
}

@Entity('devices')
export class Device {
  public static readonly fields: string[] = [
    'id','name','brand_id','state','created_at'
  ]

  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  public id: number

  @ApiResponseProperty()
  @Column()
  public name: string

  @ApiResponseProperty()
  @Column()
  @ManyToOne('brands', { createForeignKeyConstraints: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'brand_id' })
  public brand_id: number

  @ApiResponseProperty()
  @Column({ type: 'enum', enum: State, default: State.AVAILABLE })
  public state: State

  @ApiResponseProperty()
  @CreateDateColumn()
  public created_at: Date

  @ApiHideProperty()
  @Column({ default: false })
  public is_deleted: boolean

  @ApiHideProperty()
  @DeleteDateColumn()
  public deleted_at: Date
}
