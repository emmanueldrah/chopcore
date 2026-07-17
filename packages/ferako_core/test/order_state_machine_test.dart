import 'package:ferako_core/ferako_core.dart';
import 'package:test/test.dart';

void main() {
  group('OrderStateMachine', () {
    test('can transition from placed to accepted', () {
      expect(OrderStateMachine.canTransition(OrderStatus.placed, OrderStatus.accepted), isTrue);
    });

    test('cannot transition from placed to delivered', () {
      expect(OrderStateMachine.canTransition(OrderStatus.placed, OrderStatus.delivered), isFalse);
    });

    test('can transition from outForDelivery to delivered', () {
      expect(OrderStateMachine.canTransition(OrderStatus.outForDelivery, OrderStatus.delivered), isTrue);
    });

    test('can transition from delivered to disputed', () {
      expect(OrderStateMachine.canTransition(OrderStatus.delivered, OrderStatus.disputed), isTrue);
    });
  });
}
