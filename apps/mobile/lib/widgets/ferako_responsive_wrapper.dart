import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

class FerakoResponsiveWrapper extends StatelessWidget {
  final Widget child;

  const FerakoResponsiveWrapper({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: FerakoColors.deepPalm, // Desktop background
      child: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 480), // Mobile-first width
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.2),
                blurRadius: 30,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: child,
        ),
      ),
    );
  }
}
