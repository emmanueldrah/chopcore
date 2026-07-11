import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { Order } from './order.entity';
import { Item } from '../../marketplace/entities/item.entity';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Item)
  item: Item;

  @Column()
  itemNameSnapshot: string;

  @Column({ type: 'integer' })
  unitPricePesewas: number;

  @Column({ type: 'integer' })
  quantity: number;
}
