import 'package:flutter_riverpod/flutter_riverpod.dart';

class CartItem {
  final String id;
  final String name;
  final int pricePesewas;
  final int quantity;
  final String vendorId;

  CartItem({
    required this.id,
    required this.name,
    required this.pricePesewas,
    required this.quantity,
    required this.vendorId,
  });

  CartItem copyWith({int? quantity}) {
    return CartItem(
      id: id,
      name: name,
      pricePesewas: pricePesewas,
      quantity: quantity ?? this.quantity,
      vendorId: vendorId,
    );
  }
}

class CartState {
  final Map<String, CartItem> items;
  final String? vendorId;

  CartState({this.items = const {}, this.vendorId});

  int get totalPesewas => items.values.fold(0, (sum, item) => sum + (item.pricePesewas * item.quantity));
}

class CartNotifier extends StateNotifier<CartState> {
  CartNotifier() : super(CartState());

  void addItem(CartItem item) {
    if (state.vendorId != null && state.vendorId != item.vendorId) {
      throw Exception('CLEAR_CART_REQUIRED');
    }

    final existing = state.items[item.id];
    final updatedItems = Map<String, CartItem>.from(state.items);

    if (existing != null) {
      updatedItems[item.id] = existing.copyWith(quantity: existing.quantity + item.quantity);
    } else {
      updatedItems[item.id] = item;
    }

    state = CartState(items: updatedItems, vendorId: item.vendorId);
  }

  void clearCart() {
    state = CartState();
  }

  void removeItem(String id) {
    final updatedItems = Map<String, CartItem>.from(state.items);
    updatedItems.remove(id);

    if (updatedItems.isEmpty) {
      state = CartState();
    } else {
      state = CartState(items: updatedItems, vendorId: state.vendorId);
    }
  }
}

final cartProvider = StateNotifierProvider<CartNotifier, CartState>((ref) => CartNotifier());
