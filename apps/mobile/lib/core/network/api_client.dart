import 'package:dio/dio.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class ApiClient {
  late final Dio dio;
  static const String baseUrl = 'http://localhost:8000/v1';

  ApiClient() {
    dio = Dio(BaseOptions(baseUrl: baseUrl));

    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final session = Supabase.instance.client.auth.currentSession;
        if (session != null) {
          options.headers['Authorization'] = 'Bearer ${session.accessToken}';
        }
        return handler.next(options);
      },
      onError: (error, handler) {
        // Bible Principle: Standardized Error Shape
        final message = error.response?.data?['error']?['message'] ?? 'Unexpected error occurred';
        return handler.next(DioException(
          requestOptions: error.requestOptions,
          response: error.response,
          message: message,
        ));
      },
    ));
  }
}

final apiClientProvider = Provider((ref) => ApiClient());
