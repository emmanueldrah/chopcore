import 'dart:io';

import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:ferako_core/ferako_core.dart';

// Configure routes.
final _router = Router()
  ..get('/', _rootHandler)
  ..get('/echo/<message>', _echoHandler)
  ..get('/health', _healthHandler)
  ..post('/v1/auth/otp/request', _otpRequestHandler)
  ..get('/v1/vendors', _vendorsHandler);

Response _rootHandler(Request req) {
  return Response.ok('Ferako API v1\n');
}

Response _echoHandler(Request request) {
  final message = request.params['message'];
  return Response.ok('$message\n');
}

Response _healthHandler(Request request) {
  return Response.ok('OK');
}

Future<Response> _otpRequestHandler(Request request) async {
  return Response.ok('OTP sent');
}

Future<Response> _vendorsHandler(Request request) async {
  return Response.ok('[]'); // Return empty list for now
}

void main(List<String> args) async {
  // Use any available host or container IP (usually `0.0.0.0`).
  final ip = InternetAddress.anyIPv4;

  // Configure a pipeline that logs requests.
  final handler = Pipeline().addMiddleware(logRequests()).addHandler(_router.call);

  // For running in containers, we respect the PORT environment variable.
  final port = int.parse(Platform.environment['PORT'] ?? '8080');
  final server = await serve(handler, ip, port);
  print('Server listening on port ${server.port}');
}
