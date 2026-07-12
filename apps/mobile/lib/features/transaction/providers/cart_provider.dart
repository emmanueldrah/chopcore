import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/cart_item.dart';

class CartState {
  final String? vendorId;
  final List<CartItem> items;

  CartState({this.vendorId, this.items = const []});

  int get total => items.fold(0, (sum, item) => sum + (item.pricePesewas * item.quantity));
}

class CartNotifier extends StateNotifier<CartState> {
  CartNotifier() : super(CartState());

  void addItem(String vendorId, CartItem item) {
    if (state.vendorId != null && state.vendorId != vendorId) {
      // Bible Rule: Single-vendor enforced.
      // In a real UI, this would trigger a confirmation dialog.
      state = CartState(vendorId: vendorId, items: [item]);
      return;
    }

    final existingIndex = state.items.indexWhere((i) => i.id == item.id);
    if (existingIndex != -1) {
      final updatedItems = List<CartItem>.from(state.items);
      final existing = updatedItems[existingIndex];
      updatedItems[existingIndex] = CartItem(
        id: existing.id,
        name: existing.name,
        pricePesewas: existing.pricePesewas,
        quantity: existing.quantity + item.quantity,
      );
      state = CartState(vendorId: vendorId, items: updatedItems);
    } else {
      state = CartState(vendorId: vendorId, items: [...state.items, item]);
    }
  }

  void clear() => state = CartState();
}

final cartProvider = StateNotifierProvider<CartNotifier, CartState>((ref) {
  return CartNotifier();
});
