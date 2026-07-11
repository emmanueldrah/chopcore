import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Order } from '../../transaction/entities/order.entity';

@Entity('transactions')
export class Transaction extends BaseEntity {
  @ManyToOne(() => Order)
  order: Order;

  @Column({ type: 'integer' })
  amountPesewas: number;

  @Column()
  paymentMethod: string;

  @Column()
  externalReference: string;

  @Column({ default: 'pending' })
  status: string;
}
