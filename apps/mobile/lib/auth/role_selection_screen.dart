import 'package:flutter/material.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako_core/ferako_core.dart';
import 'package:ferako/buyer/buyer_home_screen.dart';
import 'package:ferako/vendor/vendor_application_screen.dart';

class RoleSelectionScreen extends StatelessWidget {
  const RoleSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'How will you use Ferako?',
              style: Theme.of(context).textTheme.displayLarge,
            ),
            const SizedBox(height: 32),
            _RoleCard(
              title: 'I want to Buy',
              description: 'Order food, groceries, and more from local vendors.',
              icon: Icons.shopping_basket,
              onTap: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const BuyerHomeScreen()),
                );
              },
            ),
            const SizedBox(height: 16),
            _RoleCard(
              title: 'I want to Sell',
              description: 'Register your business and reach more customers.',
              icon: Icons.storefront,
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
    ));
  }
}

class _RoleCard extends StatelessWidget {
  final String title;
  final String description;
  final IconData icon;
  final VoidCallback onTap;

  const _RoleCard({
    required this.title,
    required this.description,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: FerakoColors.harmattanSand, width: 2),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: FerakoColors.marketClay.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: FerakoColors.marketClay, size: 32),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontFamily: 'Fraunces',
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: FerakoColors.deepPalm,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    description,
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 14,
                      color: Colors.grey,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
