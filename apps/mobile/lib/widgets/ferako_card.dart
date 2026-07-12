import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

class FerakoCard extends StatelessWidget {
  final Widget child;
  final VoidCallback? onTap;
  final Color? color;

  const FerakoCard({
    super.key,
    required this.child,
    this.onTap,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: color ?? Colors.white,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(12),
            topRight: Radius.circular(8),
            bottomLeft: Radius.circular(10),
            bottomRight: Radius.circular(14),
          ),
          boxShadow: [
            BoxShadow(
              color: FerakoColors.marketClay.withOpacity(0.1),
              blurRadius: 12,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        child: child,
      ),
    );
  }
}
