import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../identity/entities/user.entity';
import { Vendor } from '../../marketplace/entities/vendor.entity';
import { Order } from '../../transaction/entities/order.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => User)
  buyer: User;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @Column({ type: 'integer' })
  rating: number; // 1-5

  @Column({ type: 'text', nullable: true })
  comment: string;
}
