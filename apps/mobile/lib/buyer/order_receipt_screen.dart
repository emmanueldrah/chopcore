import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_card.dart';
import 'package:ferako/widgets/basket_weave_background.dart';

class OrderReceiptScreen extends StatelessWidget {
  const OrderReceiptScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Order Receipt')),
      body: BasketWeaveBackground(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: FerakoCard(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  const Icon(Icons.check_circle, color: FerakoColors.beverageTeal, size: 64),
                  const SizedBox(height: 16),
                  Text('Thank You!', style: Theme.of(context).textTheme.displayMedium),
                  const Text('Order #1234 was successful', style: TextStyle(color: Colors.grey)),
                  const Divider(height: 48),
                  _ReceiptRow(label: 'Subtotal', value: '₵ 55.00'),
                  _ReceiptRow(label: 'Delivery Fee', value: '₵ 5.00'),
                  _ReceiptRow(label: 'Commission (10%)', value: '₵ 5.50'),
                  const Divider(height: 32),
                  _ReceiptRow(label: 'Total Paid', value: '₵ 65.50', isBold: true),
                  const SizedBox(height: 32),
                  const Text('Paid via MTN Mobile Money', style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Colors.grey)),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _ReceiptRow extends StatelessWidget {
  final String label;
  final String value;
  final bool isBold;

  const _ReceiptRow({required this.label, required this.value, this.isBold = false});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontWeight: isBold ? FontWeight.bold : FontWeight.normal)),
          Text(value, style: TextStyle(fontWeight: isBold ? FontWeight.bold : FontWeight.normal, fontFamily: 'Inter')),
        ],
      ),
    );
  }
}
