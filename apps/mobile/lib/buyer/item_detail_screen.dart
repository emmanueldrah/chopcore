import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/widgets/basket_weave_background.dart';
import 'package:ferako/widgets/stock_badge.dart';

class ItemDetailScreen extends StatelessWidget {
  final String itemName;
  final String price;

  const ItemDetailScreen({
    super.key,
    required this.itemName,
    required this.price,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BasketWeaveBackground(
        child: Column(
          children: [
            Expanded(
              child: CustomScrollView(
                slivers: [
                  SliverAppBar(
                    expandedHeight: 300,
                    pinned: true,
                    flexibleSpace: FlexibleSpaceBar(
                      background: Image.network(
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(itemName, style: Theme.of(context).textTheme.displayLarge),
                              const StockBadge(level: StockLevel.inStock),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(price, style: const TextStyle(fontSize: 24, color: FerakoColors.marketClay, fontWeight: FontWeight.bold, fontFamily: 'Inter')),
                          const SizedBox(height: 24),
                          const Text(
                            'Authentic Ghanaian dish prepared with fresh ingredients sourced from the local Ho market. Served with a side of spicy pepper sauce and shito.',
                            style: TextStyle(fontSize: 16, height: 1.6, color: Colors.grey),
                          ),
                          const SizedBox(height: 32),
                          Text('Quantity', style: Theme.of(context).textTheme.titleMedium),
                          const SizedBox(height: 16),
                          Row(
                            children: [
                              _QuantityButton(icon: Icons.remove, onTap: () {}),
                              const Padding(
                                padding: EdgeInsets.symmetric(horizontal: 24.0),
                                child: Text('1', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                              ),
                              _QuantityButton(icon: Icons.add, onTap: () {}),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: FerakoButton(
                label: 'Add to Cart',
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _QuantityButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;

  const _QuantityButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.shade300),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, size: 20),
      ),
    );
  }
}
