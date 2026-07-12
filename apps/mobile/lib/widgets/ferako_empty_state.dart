import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/widgets/basket_weave_background.dart';

class FerakoEmptyState extends StatelessWidget {
  final String title;
  final String description;
  final String buttonLabel;
  final VoidCallback onButtonPressed;

  const FerakoEmptyState({
    super.key,
    required this.title,
    required this.description,
    required this.buttonLabel,
    required this.onButtonPressed,
  });

  @override
  Widget build(BuildContext context) {
    return BasketWeaveBackground(
      child: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: FerakoColors.marketClay.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.shopping_basket_outlined, size: 60, color: FerakoColors.marketClay),
              ),
              const SizedBox(height: 32),
              Text(
                title,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.displayMedium,
              ),
              const SizedBox(height: 12),
              Text(
                description,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 16, color: Colors.grey, height: 1.4),
              ),
              const SizedBox(height: 32),
              FerakoButton(
                label: buttonLabel,
                onPressed: onButtonPressed,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
