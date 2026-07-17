import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_card.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/widgets/basket_weave_background.dart';
import 'package:ferako/providers/cart_provider.dart';

class CheckoutScreen extends ConsumerWidget {
  const CheckoutScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Checkout')),
      body: BasketWeaveBackground(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Delivery Address', style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 16),
                    FerakoCard(
                      child: ListTile(
                        leading: const Icon(Icons.location_on, color: FerakoColors.marketClay),
                        title: const Text('Ho Technical University'),
                        subtitle: const Text('Campus Residency, Block A'),
                        trailing: TextButton(onPressed: () {}, child: const Text('Change')),
                      ),
                    ),
                    const SizedBox(height: 32),
                    Text('Order Summary', style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 16),
                    ...cart.items.values.map((item) => Padding(
                      padding: const EdgeInsets.only(bottom: 12.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('${item.quantity}x ${item.name}'),
                          Text('₵ ${(item.pricePesewas * item.quantity / 100).toStringAsFixed(2)}'),
                        ],
                      ),
                    )),
                    const Divider(height: 40),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Total', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                        Text('₵ ${(cart.totalPesewas / 100).toStringAsFixed(2)}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: FerakoColors.marketClay)),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: FerakoButton(
                label: 'Place Order & Pay',
                onPressed: () {
                  // Simulate order placement
                  _showSuccessDialog(context);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showSuccessDialog(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text('Order Placed!', style: TextStyle(fontFamily: 'Fraunces')),
        content: const Text('Your payment is being processed via Mobile Money. We will notify you once the vendor accepts.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.popUntil(context, (route) => route.isFirst),
            child: const Text('Back to Home', style: TextStyle(color: FerakoColors.marketClay)),
          ),
        ],
      ),
    );
  }
}
