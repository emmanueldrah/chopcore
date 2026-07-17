import 'package:flutter/material.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako_core/ferako_core.dart';
import 'package:ferako/buyer/buyer_home_screen.dart';
import 'package:ferako/vendor/vendor_application_screen.dart';
import 'package:ferako/widgets/basket_weave_background.dart';
import 'package:ferako/widgets/ferako_card.dart';

class RoleSelectionScreen extends StatelessWidget {
  const RoleSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BasketWeaveBackground(
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Your journey starts here',
                  style: Theme.of(context).textTheme.displayLarge,
                ),
                const SizedBox(height: 8),
                const Text(
                  'Choose how you want to interact with the Ferako market.',
                  style: TextStyle(fontFamily: 'Inter', color: Colors.grey),
                ),
                const SizedBox(height: 40),
                _RoleCard(
                  title: 'I want to Buy',
                  description: 'Order food, groceries, and medicine from local artisans.',
                  image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop',
                  onTap: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => const BuyerHomeScreen()),
                    );
                  },
                ),
                const SizedBox(height: 20),
                _RoleCard(
                  title: 'I want to Sell',
                  description: 'Join the marketplace and grow your business in Ho.',
                  image: 'https://images.unsplash.com/photo-1488459711635-0c0048344558?q=80&w=400&auto=format&fit=crop',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const VendorApplicationScreen()),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _RoleCard extends StatelessWidget {
  final String title;
  final String description;
  final String image;
  final VoidCallback onTap;

  const _RoleCard({
    required this.title,
    required this.description,
    required this.image,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return FerakoCard(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            height: 120,
            width: double.infinity,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: NetworkImage(image),
                fit: BoxFit.cover,
                opacity: 0.9,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 4),
                Text(description, style: const TextStyle(fontSize: 14, color: Colors.grey, height: 1.4)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
