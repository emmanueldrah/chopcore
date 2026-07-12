import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

class BasketWeaveBackground extends StatelessWidget {
  final Widget child;

  const BasketWeaveBackground({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: FerakoColors.harmattanSand,
      child: Stack(
        children: [
          Positioned.fill(
            child: Opacity(
              opacity: 0.04,
              child: CustomPaint(
                painter: _OrganicWeavePainter(),
              ),
            ),
          ),
          child,
        ],
      ),
    );
  }
}

class _OrganicWeavePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = FerakoColors.charcoalInk
      ..strokeWidth = 1.2
      ..style = PaintingStyle.stroke;

    const double gap = 24.0;

    // Diagonal lines for weave effect
    for (double i = -size.height; i < size.width; i += gap) {
      final path = Path()
        ..moveTo(i, 0)
        ..lineTo(i + size.height, size.height);
      canvas.drawPath(path, paint);
    }

    for (double i = gap; i < size.width + size.height; i += gap) {
      final path = Path()
        ..moveTo(i, 0)
        ..lineTo(i - size.height, size.height);
      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
