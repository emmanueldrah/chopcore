import 'package:ferako_core/src/enums/order_status.dart';

class OrderStateMachine {
  static const Map<OrderStatus, List<OrderStatus>> _transitions = {
    OrderStatus.placed: [OrderStatus.accepted, OrderStatus.declined, OrderStatus.cancelled],
    OrderStatus.accepted: [OrderStatus.preparing, OrderStatus.cancelled],
    OrderStatus.preparing: [OrderStatus.outForDelivery, OrderStatus.cancelled],
    OrderStatus.outForDelivery: [OrderStatus.delivered, OrderStatus.autoFlagged],
    OrderStatus.delivered: [OrderStatus.disputed],
    OrderStatus.disputed: [OrderStatus.refunded, OrderStatus.delivered], // Simplified resolution
  };

  static bool canTransition(OrderStatus from, OrderStatus to) {
    return _transitions[from]?.contains(to) ?? false;
  }
}
