import 'package:flutter/material.dart';
import '../../core/theme/ferako_theme.dart';

class FerakoCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;

  const FerakoCard({super.key, required this.child, this.padding});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding ?? const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: FerakoTheme.harmattanSand, width: 2),
        boxShadow: [
          BoxShadow(
            color: FerakoTheme.charcoalInk.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: child,
    );
  }
}
