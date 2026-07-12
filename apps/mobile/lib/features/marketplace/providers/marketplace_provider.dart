import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/vendor.dart';
import '../../../core/network/api_client.dart';

final vendorsProvider = FutureProvider<List<Vendor>>((ref) async {
  final api = ref.watch(apiClientProvider);
  final response = await api.dio.get('/vendors/');
  return (response.data as List).map((v) => Vendor.fromJson(v)).toList();
});
