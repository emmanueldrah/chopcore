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
              CustomPaint(
                size: const Size(120, 120),
                painter: _MarketBasketPainter(),
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

class _MarketBasketPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = FerakoColors.marketClay
      ..strokeWidth = 2.0
      ..style = PaintingStyle.stroke;

    final path = Path();

    // Basket base (trapezoid)
    path.moveTo(size.width * 0.2, size.height * 0.4);
    path.lineTo(size.width * 0.8, size.height * 0.4);
    path.lineTo(size.width * 0.7, size.height * 0.9);
    path.lineTo(size.width * 0.3, size.height * 0.9);
    path.close();

    // Handle (arc)
    path.moveTo(size.width * 0.2, size.height * 0.4);
    path.quadraticBezierTo(
      size.width * 0.5,
      size.height * -0.1,
      size.width * 0.8,
      size.height * 0.4,
    );

    // Weave lines (horizontal)
    path.moveTo(size.width * 0.23, size.height * 0.55);
    path.lineTo(size.width * 0.77, size.height * 0.55);

    path.moveTo(size.width * 0.27, size.height * 0.73);
    path.lineTo(size.width * 0.73, size.height * 0.73);

    // Weave lines (vertical)
    path.moveTo(size.width * 0.4, size.height * 0.4);
    path.lineTo(size.width * 0.43, size.height * 0.9);

    path.moveTo(size.width * 0.6, size.height * 0.4);
    path.lineTo(size.width * 0.57, size.height * 0.9);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
