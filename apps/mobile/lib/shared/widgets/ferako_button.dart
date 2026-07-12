import 'package:flutter/material.dart';
import '../../core/theme/ferako_theme.dart';

class FerakoButton extends StatelessWidget {
  final String title;
  final VoidCallback onPress;
  final bool isLoading;
  final bool isOutline;

  const FerakoButton({
    super.key,
    required this.title,
    required this.onPress,
    this.isLoading = false,
    this.isOutline = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 56, // Minimum 44px touch target (Bible Principle)
      width: double.infinity,
      child: isOutline
          ? OutlinedButton(
              onPressed: isLoading ? null : onPress,
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: FerakoTheme.marketClay, width: 2),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: _buildChild(),
            )
          : ElevatedButton(
              onPressed: isLoading ? null : onPress,
              style: ElevatedButton.styleFrom(
                backgroundColor: FerakoTheme.marketClay,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 0,
              ),
              child: _buildChild(),
            ),
    );
  }

  Widget _buildChild() {
    if (isLoading) {
      return const SizedBox(
        height: 24,
        width: 24,
        child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
      );
    }
    return Text(
      title,
      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
    );
  }
}
