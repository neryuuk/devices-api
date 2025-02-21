import { ApiHideProperty, ApiResponseProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum State {
  AVAILABLE = 'available',
  IN_USE = 'in-use',
  INACTIVE = 'inactive',
}

@Entity('devices')
export class Device {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  public id: number

  @ApiResponseProperty()
  @Column()
  public name: string

  @ApiResponseProperty()
  @Column()
  public brand_id: number

  @ApiResponseProperty()
  @Column({ type: 'enum', enum: State, default: State.AVAILABLE })
  public state: State

  @ApiResponseProperty()
  @CreateDateColumn()
  public created_at: Date

  @ApiHideProperty()
  @Column()
  public is_deleted: boolean

  @ApiHideProperty()
  @DeleteDateColumn()
  public deleted_at: Date
}
