export enum OrderStatus {
  CREATED = 'created',
  PAYMENT_PENDING = 'payment_pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY_FOR_DELIVERY = 'ready_for_delivery',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}
