import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_card.dart';
import 'package:ferako/widgets/basket_weave_background.dart';
import 'package:ferako/buyer/item_detail_screen.dart';

class VendorStorefrontScreen extends StatelessWidget {
  final String vendorName;
  final String category;
  final String heroTag;

  const VendorStorefrontScreen({
    super.key,
    required this.vendorName,
    required this.category,
    required this.heroTag,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BasketWeaveBackground(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            SliverAppBar(
              expandedHeight: 240,
              pinned: true,
              stretch: true,
              backgroundColor: FerakoColors.deepPalm,
              flexibleSpace: FlexibleSpaceBar(
                stretchModes: const [StretchMode.zoomBackground, StretchMode.blurBackground],
                title: Text(vendorName, style: const TextStyle(shadows: [Shadow(blurRadius: 10, color: Colors.black, offset: Offset(0, 2))])),
                background: Hero(
                  tag: 'vendor-image-0',
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                      Image.network(
                        'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=600&auto=format&fit=crop',
                        fit: BoxFit.cover,
                      ),
                      const DecoratedBox(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [Colors.black54, Colors.transparent, Colors.black87],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Transform.translate(
                offset: const Offset(0, -20),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: FerakoCard(
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(category, style: const TextStyle(color: FerakoColors.marketClay, fontWeight: FontWeight.bold)),
                                  const SizedBox(height: 4),
                                  const Text('Ho Main Market, Volta Region', style: TextStyle(fontSize: 12, color: Colors.grey)),
                                ],
                              ),
                              Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(color: FerakoColors.beverageTeal.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
                                child: const Icon(Icons.info_outline, color: FerakoColors.beverageTeal),
                              ),
                            ],
                          ),
                          const Divider(height: 32),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              _InfoItem(icon: Icons.star, label: '4.8', sublabel: '120 reviews'),
                              _InfoItem(icon: Icons.access_time, label: '15-25 min', sublabel: 'Delivery'),
                              _InfoItem(icon: Icons.wallet, label: '₵₵', sublabel: 'Pricing'),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 16,
                  crossAxisSpacing: 16,
                  childAspectRatio: 0.75,
                ),
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    return FerakoCard(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const ItemDetailScreen(itemName: 'Spicy Kelewele', price: '₵ 25.00'),
                          ),
                        );
                      },
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Image.network(
                              'https://images.unsplash.com/photo-1594973585977-9f48a1a7bd85?q=80&w=300&auto=format&fit=crop',
                              width: double.infinity,
                              fit: BoxFit.cover,
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(12.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Spicy Kelewele', style: TextStyle(fontWeight: FontWeight.bold)),
                                const SizedBox(height: 4),
                                const Text('₵ 25.00', style: TextStyle(color: FerakoColors.marketClay, fontFamily: 'Inter')),
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                  childCount: 8,
                ),
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 40)),
          ],
        ),
      ),
    );
  }
}

class _InfoItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String sublabel;

  const _InfoItem({required this.icon, required this.label, required this.sublabel});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Icon(icon, size: 16, color: FerakoColors.marketClay),
            const SizedBox(width: 4),
            Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
        const SizedBox(height: 2),
        Text(sublabel, style: const TextStyle(fontSize: 10, color: Colors.grey)),
      ],
    );
  }
}
