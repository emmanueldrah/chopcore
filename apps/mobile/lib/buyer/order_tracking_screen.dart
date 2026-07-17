import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_card.dart';
import 'package:ferako/widgets/basket_weave_background.dart';
import 'package:ferako_core/ferako_core.dart';

class OrderTrackingScreen extends StatelessWidget {
  final OrderStatus currentStatus;

  const OrderTrackingScreen({super.key, required this.currentStatus});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Track Order')),
      body: BasketWeaveBackground(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              FerakoCard(
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    children: [
                      const Text('Estimated Delivery', style: TextStyle(color: Colors.grey)),
                      const SizedBox(height: 8),
                      Text('12:45 PM', style: Theme.of(context).textTheme.displayLarge),
                      const SizedBox(height: 24),
                      _OrderPipeline(currentStatus: currentStatus),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),
              Text('Order Summary', style: Theme.of(context).textTheme.displayMedium),
              const SizedBox(height: 16),
              const _OrderSummaryItem(label: 'Banku & Tilapia', price: '₵ 45.00'),
              const _OrderSummaryItem(label: 'Sobolo (Medium)', price: '₵ 10.00'),
              const Divider(height: 32),
              const _OrderSummaryItem(label: 'Total', price: '₵ 55.00', isBold: true),
            ],
          ),
        ),
      ),
    );
  }
}

class _OrderPipeline extends StatelessWidget {
  final OrderStatus currentStatus;

  const _OrderPipeline({required this.currentStatus});

  @override
  Widget build(BuildContext context) {
    final stages = [
      {'status': OrderStatus.placed, 'label': 'Placed', 'icon': Icons.receipt_long, 'color': FerakoColors.marketClay},
      {'status': OrderStatus.accepted, 'label': 'Accepted', 'icon': Icons.check_circle_outline, 'color': FerakoColors.beverageTeal},
      {'status': OrderStatus.preparing, 'label': 'Preparing', 'icon': Icons.restaurant, 'color': Colors.orange},
      {'status': OrderStatus.outForDelivery, 'label': 'On the Way', 'icon': Icons.moped, 'color': Colors.purple},
      {'status': OrderStatus.delivered, 'label': 'Delivered', 'icon': Icons.home, 'color': FerakoColors.deepPalm},
    ];

    int currentIndex = stages.indexWhere((s) => s['status'] == currentStatus);
    if (currentIndex == -1) currentIndex = 0;

    return Column(
      children: List.generate(stages.length, (index) {
        final stage = stages[index];
        final isActive = index <= currentIndex;
        final isLast = index == stages.length - 1;

        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: isActive ? (stage['color'] as Color) : Colors.grey.shade300,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(stage['icon'] as IconData, size: 18, color: Colors.white),
                ),
                if (!isLast)
                  Container(
                    width: 2,
                    height: 40,
                    color: index < currentIndex ? (stages[index]['color'] as Color) : Colors.grey.shade300,
                  ),
              ],
            ),
            const SizedBox(width: 16),
            Padding(
              padding: const EdgeInsets.only(top: 4.0),
              child: Text(
                stage['label'] as String,
                style: TextStyle(
                  fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                  color: isActive ? FerakoColors.deepPalm : Colors.grey,
                  fontSize: 16,
                ),
              ),
            ),
          ],
        );
      }),
    );
  }
}

class _OrderSummaryItem extends StatelessWidget {
  final String label;
  final String price;
  final bool isBold;

  const _OrderSummaryItem({required this.label, required this.price, this.isBold = false});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontWeight: isBold ? FontWeight.bold : FontWeight.normal, fontSize: 16)),
          Text(price, style: TextStyle(fontWeight: isBold ? FontWeight.bold : FontWeight.normal, fontSize: 16, fontFamily: 'Inter')),
        ],
      ),
    );
  }
}
