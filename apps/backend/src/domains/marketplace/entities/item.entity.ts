import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Vendor } from './vendor.entity';

@Entity('items')
export class Item extends BaseEntity {
  @ManyToOne(() => Vendor, (vendor) => vendor.items)
  vendor: Vendor;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer' })
  pricePesewas: number;

  @Column({ type: 'integer', default: 0 })
  stockQuantity: number;

  @Column({ nullable: true })
  otcCategoryId: string;

  @Column({ default: true })
  isActive: boolean;
}
