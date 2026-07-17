import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

enum StockLevel { inStock, lowStock, outOfStock }

class StockBadge extends StatelessWidget {
  final StockLevel level;

  const StockBadge({super.key, required this.level});

  @override
  Widget build(BuildContext context) {
    Color color;
    String label;

    switch (level) {
      case StockLevel.inStock:
        color = FerakoColors.deepPalm;
        label = 'IN STOCK';
        break;
      case StockLevel.lowStock:
        color = FerakoColors.marketClay;
        label = 'LOW STOCK';
        break;
      case StockLevel.outOfStock:
        color = Colors.grey;
        label = 'OUT OF STOCK';
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontSize: 10,
          fontWeight: FontWeight.w800,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}
