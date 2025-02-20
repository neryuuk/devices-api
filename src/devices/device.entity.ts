import { ApiResponseProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum State {
  AVAILABLE = 'available',
  IN_USE = 'in-use',
  INACTIVE = 'inactive'
}

@Entity()
export class Device {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiResponseProperty()
  @Column()
  public name: string;

  @ApiResponseProperty()
  @Column()
  public brand_id: number;

  @ApiResponseProperty()
  @Column({ type: 'enum', enum: State, default: State.AVAILABLE })
  public state: State;

  @ApiResponseProperty()
  @CreateDateColumn()
  public created_at: Date;
}
