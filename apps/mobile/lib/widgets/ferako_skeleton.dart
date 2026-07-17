import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

class FerakoSkeleton extends StatefulWidget {
  final double width;
  final double height;
  final ShapeBorder? shape;

  const FerakoSkeleton({
    super.key,
    required this.width,
    required this.height,
    this.shape,
  });

  @override
  State<FerakoSkeleton> createState() => _FerakoSkeletonState();
}

class _FerakoSkeletonState extends State<FerakoSkeleton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 1))..repeat(reverse: true);
    _animation = Tween<double>(begin: 0.3, end: 0.6).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _animation,
      child: Container(
        width: widget.width,
        height: widget.height,
        decoration: ShapeDecoration(
          color: FerakoColors.marketClay.withOpacity(0.1),
          shape: widget.shape ?? RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
      ),
    );
  }
}
