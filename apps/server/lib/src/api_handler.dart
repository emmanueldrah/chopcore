import 'dart:convert';
import 'package:ferako_core/ferako_core.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class ApiHandler {
  Handler get handler {
    final router = Router();

    router.get('/', (Request req) {
      return Response.ok('Ferako API v1\n');
    });

    router.get('/health', (Request req) {
      return Response.ok('OK');
    });

    router.post('/v1/orders/<id>/status', (Request req, String id) async {
      final body = await req.readAsString();
      final data = jsonDecode(body);
      final newStatus = OrderStatus.fromJson(data['status']);

      // Mock current status
      const currentStatus = OrderStatus.placed;

      if (!OrderStateMachine.canTransition(currentStatus, newStatus)) {
        return Response(400, body: jsonEncode({'error': 'Invalid transition from $currentStatus to $newStatus'}));
      }

      return Response.ok(jsonEncode({'id': id, 'status': newStatus.toJson()}));
    });

    return router.call;
  }
}
