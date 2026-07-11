import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { User } from '../../identity/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}

  // Bible Principle: Rigid State Machine
  private readonly allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.CREATED]: [OrderStatus.PAYMENT_PENDING, OrderStatus.CANCELLED],
    [OrderStatus.PAYMENT_PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
    [OrderStatus.PREPARING]: [OrderStatus.READY_FOR_DELIVERY],
    [OrderStatus.READY_FOR_DELIVERY]: [OrderStatus.OUT_FOR_DELIVERY],
    [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED],
    [OrderStatus.DELIVERED]: [OrderStatus.COMPLETED],
    [OrderStatus.COMPLETED]: [],
    [OrderStatus.CANCELLED]: [],
    [OrderStatus.REFUNDED]: [],
  };

  async updateOrderStatus(orderId: string, newStatus: OrderStatus, actor: User) {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new BadRequestException('Order not found');

    if (!this.allowedTransitions[order.status].includes(newStatus)) {
      throw new BadRequestException(`Invalid transition from ${order.status} to ${newStatus}`);
    }

    order.status = newStatus;
    if (newStatus === OrderStatus.CONFIRMED) order.confirmedAt = new Date();
    if (newStatus === OrderStatus.DELIVERED) order.deliveredAt = new Date();

    return this.orderRepository.save(order);
  }
}
