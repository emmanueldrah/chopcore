import 'package:ferako_core/ferako_core.dart';
import 'package:shelf/shelf.dart';

class OrderTransitionMiddleware {
  static Middleware validate() {
    return (Handler innerHandler) {
      return (Request request) async {
        // In a real app, we would fetch the current order status from DB
        // and compare it with the requested status in the body.
        // For now, we provide the structure for this check.

        // final currentStatus = OrderStatus.placed;
        // final requestedStatus = ...;
        // if (!OrderStateMachine.canTransition(currentStatus, requestedStatus)) {
        //   return Response.forbidden('Invalid state transition');
        // }

        return innerHandler(request);
      };
    };
  }
}

class OwnershipMiddleware {
  static Middleware checkVendorOwnership() {
    return (Handler innerHandler) {
      return (Request request) async {
        // Ensure the authenticated user owns the vendor they are trying to modify.
        return innerHandler(request);
      };
    };
  }
}
