import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_card.dart';
import 'package:ferako/widgets/basket_weave_background.dart';

class VendorEarningsScreen extends StatelessWidget {
  const VendorEarningsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Earnings')),
      body: BasketWeaveBackground(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Business Earnings', style: Theme.of(context).textTheme.displayMedium),
              const SizedBox(height: 24),
              FerakoCard(
                color: FerakoColors.deepPalm,
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Total Paid Out', style: TextStyle(color: Colors.white70, fontSize: 14)),
                      const SizedBox(height: 8),
                      Text('₵ 1,240.50', style: Theme.of(context).textTheme.displayLarge?.copyWith(color: Colors.white, fontSize: 36)),
                      const SizedBox(height: 24),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          _MiniStat(label: 'Pending Escrow', value: '₵ 350.00'),
                          _MiniStat(label: 'This Week', value: '₵ 580.00'),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),
              Text('Payout History', style: Theme.of(context).textTheme.titleMedium),
              const SizedBox(height: 16),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: 3,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: FerakoCard(
                      child: ListTile(
                        title: Text('Payout #${1024 - index}', style: const TextStyle(fontWeight: FontWeight.bold)),
                        subtitle: Text('Paid to MoMo Account ending in *123 • ${10 + index}/07/2024'),
                        trailing: Text('₵ ${150 + index * 50}.00', style: const TextStyle(fontWeight: FontWeight.bold, fontFamily: 'Inter')),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _MiniStat extends StatelessWidget {
  final String label;
  final String value;

  const _MiniStat({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: Colors.white60, fontSize: 12)),
        const SizedBox(height: 4),
        Text(value, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18, fontFamily: 'Inter')),
      ],
    );
  }
}
