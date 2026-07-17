import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_haptics.dart';

class FerakoCard extends StatefulWidget {
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
  State<FerakoCard> createState() => _FerakoCardState();
}

class _FerakoCardState extends State<FerakoCard> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 100));
    _scale = Tween<double>(begin: 1.0, end: 0.98).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) {
        _controller.reverse();
        FerakoHaptics.light();
      },
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: FerakoColors.shadowWarm,
                blurRadius: 24,
                offset: const Offset(0, 10),
                spreadRadius: -2,
              ),
            ],
          ),
          child: Material(
            color: widget.color ?? Colors.white,
            clipBehavior: Clip.antiAlias,
            shape: _IrregularBorder(),
            child: InkWell(
              onTap: widget.onTap,
              child: widget.child,
            ),
          ),
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
      ..moveTo(rect.left + 14, rect.top)
      ..lineTo(rect.right - 10, rect.top)
      ..quadraticBezierTo(rect.right, rect.top, rect.right, rect.top + 10)
      ..lineTo(rect.right, rect.bottom - 16)
      ..quadraticBezierTo(rect.right, rect.bottom, rect.right - 16, rect.bottom)
      ..lineTo(rect.left + 12, rect.bottom)
      ..quadraticBezierTo(rect.left, rect.bottom, rect.left, rect.bottom - 12)
      ..lineTo(rect.left, rect.top + 14)
      ..quadraticBezierTo(rect.left, rect.top, rect.left + 14, rect.top)
      ..close();
  }

  @override
  void paint(Canvas canvas, Rect rect, {TextDirection? textDirection}) {}

  @override
  ShapeBorder scale(double t) => this;
}
