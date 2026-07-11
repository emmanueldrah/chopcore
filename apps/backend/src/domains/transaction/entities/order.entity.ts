import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { User } from '../../identity/entities/user.entity';
import { Vendor } from '../../marketplace/entities/vendor.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @ManyToOne(() => User)
  buyer: User;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.CREATED })
  status: OrderStatus;

  @Column({ type: 'integer' })
  subtotalPesewas: number;

  @Column({ type: 'integer' })
  totalPesewas: number;

  @Column({ type: 'numeric', precision: 5, scale: 4 })
  commissionRateSnapshot: number;

  @Column({ unique: true })
  idempotencyKey: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date;
}
