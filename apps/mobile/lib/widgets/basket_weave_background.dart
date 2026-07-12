import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

class BasketWeaveBackground extends StatelessWidget {
  final Widget child;

  const BasketWeaveBackground({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned.fill(
          child: CustomPaint(
            painter: _BasketWeavePainter(),
          ),
        ),
        child,
      ],
    );
  }
}

class _BasketWeavePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = FerakoColors.marketClay.withOpacity(0.03)
      ..strokeWidth = 1.0;

    const spacing = 20.0;
    for (var i = 0.0; i < size.width + size.height; i += spacing) {
      canvas.drawLine(Offset(i, 0), Offset(0, i), paint);
      canvas.drawLine(Offset(size.width - i, 0), Offset(size.width, i), paint);
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
