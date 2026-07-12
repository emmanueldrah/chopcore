import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

class FerakoCard extends StatelessWidget {
  final Widget child;
  final VoidCallback? onTap;
  final Color? color;
  final double? width;
  final double? height;

  const FerakoCard({
    super.key,
    required this.child,
    this.onTap,
    this.color,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: FerakoColors.shadowWarm,
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Material(
        color: color ?? Colors.white,
        clipBehavior: Clip.antiAlias,
        shape: _IrregularBorder(),
        child: InkWell(
          onTap: onTap,
          child: child,
        ),
      ),
    );
  }
}

class _IrregularBorder extends ShapeBorder {
  @override
  EdgeInsetsGeometry get dimensions => EdgeInsets.zero;

  @override
  Path getInnerPath(Rect rect, {TextDirection? textDirection}) => getOuterPath(rect, textDirection: textDirection);

  @override
  Path getOuterPath(Rect rect, {TextDirection? textDirection}) {
    return Path()
      ..moveTo(rect.left + 12, rect.top)
      ..lineTo(rect.right - 8, rect.top)
      ..quadraticBezierTo(rect.right, rect.top, rect.right, rect.top + 8)
      ..lineTo(rect.right, rect.bottom - 14)
      ..quadraticBezierTo(rect.right, rect.bottom, rect.right - 14, rect.bottom)
      ..lineTo(rect.left + 10, rect.bottom)
      ..quadraticBezierTo(rect.left, rect.bottom, rect.left, rect.bottom - 10)
      ..lineTo(rect.left, rect.top + 12)
      ..quadraticBezierTo(rect.left, rect.top, rect.left + 12, rect.top)
      ..close();
  }

  @override
  void paint(Canvas canvas, Rect rect, {TextDirection? textDirection}) {}

  @override
  ShapeBorder scale(double t) => this;
}
