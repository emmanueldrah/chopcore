import 'package:server/src/api_handler.dart';
import 'package:test/test.dart';
import 'package:shelf/shelf.dart';

void main() {
  final handler = ApiHandler().handler;

  test('Root', () async {
    final response = await handler(Request('GET', Uri.parse('http://localhost/')));
    expect(response.statusCode, 200);
    final body = await response.readAsString();
    expect(body, contains('Ferako API v1'));
  });

  test('Health', () async {
    final response = await handler(Request('GET', Uri.parse('http://localhost/health')));
    expect(response.statusCode, 200);
    final body = await response.readAsString();
    expect(body, 'OK');
  });
}
