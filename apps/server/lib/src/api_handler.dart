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

    return router.call;
  }
}
