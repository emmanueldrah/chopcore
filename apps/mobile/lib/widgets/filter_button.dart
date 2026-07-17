import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_haptics.dart';
import 'package:ferako/widgets/filter_modal.dart';

class FilterButton extends StatelessWidget {
  const FilterButton({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FerakoHaptics.light();
        showModalBottomSheet(
          context: context,
          isScrollControlled: true,
          backgroundColor: Colors.transparent,
          builder: (context) => const FilterModal(),
        );
      },
      child: Container(
        height: 52,
        width: 52,
        decoration: BoxDecoration(
          color: FerakoColors.deepPalm,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Icon(Icons.tune, color: Colors.white),
      ),
    );
  }
}
