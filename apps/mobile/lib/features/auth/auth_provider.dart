import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});

class AuthState {
  final User? user;
  final bool isLoading;

  AuthState({this.user, this.isLoading = false});
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(AuthState(user: Supabase.instance.client.auth.currentUser)) {
    Supabase.instance.client.auth.onAuthStateChange.listen((data) {
      state = AuthState(user: data.session?.user);
    });
  }

  Future<void> signInWithOtp(String phone) async {
    state = AuthState(user: state.user, isLoading: true);
    await Supabase.instance.client.auth.signInWithOtp(phone: phone);
    state = AuthState(user: state.user, isLoading: false);
  }

  Future<void> verifyOtp(String phone, String token) async {
    state = AuthState(user: state.user, isLoading: true);
    await Supabase.instance.client.auth.verifyOTP(
      phone: phone,
      token: token,
      type: OtpType.sms,
    );
  }

  Future<void> signOut() async {
    await Supabase.instance.client.auth.signOut();
  }
}
