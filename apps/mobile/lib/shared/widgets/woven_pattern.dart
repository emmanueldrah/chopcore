import 'package:flutter/material.dart';

class WovenPattern extends StatelessWidget {
  final double opacity;

  const WovenPattern({super.key, this.opacity = 0.05});

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Opacity(
        opacity: opacity,
        child: Container(
          decoration: const BoxDecoration(
            color: Color(0xFFF2E9DC),
            // In a real build, we'd use a CustomPainter or an SVG pattern here
          ),
        ),
      ),
    );
  }
}
