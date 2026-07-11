import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Country } from './country.entity';

@Entity('delivery_zones')
export class DeliveryZone extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ type: 'integer' })
  baseFeePesewas: number;

  @Column({ default: true })
  isActive: boolean;
}
