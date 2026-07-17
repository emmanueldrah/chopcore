import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_button.dart';

class FilterModal extends StatefulWidget {
  const FilterModal({super.key});

  @override
  State<FilterModal> createState() => _FilterModalState();
}

class _FilterModalState extends State<FilterModal> {
  double _priceRange = 100.0;
  bool _openNow = true;
  int _rating = 4;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: FerakoColors.harmattanSand,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: Colors.grey.shade300, borderRadius: BorderRadius.circular(2)))),
          const SizedBox(height: 24),
          Text('Filters', style: Theme.of(context).textTheme.displayMedium),
          const SizedBox(height: 32),
          Text('Rating', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 16),
          Row(
            children: List.generate(5, (index) {
              final isSelected = index + 1 == _rating;
              return GestureDetector(
                onTap: () => setState(() => _rating = index + 1),
                child: Container(
                  margin: const EdgeInsets.only(right: 12),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: isSelected ? FerakoColors.marketClay : Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: isSelected ? FerakoColors.marketClay : Colors.grey.shade300),
                  ),
                  child: Row(
                    children: [
                      Text('${index + 1}+', style: TextStyle(color: isSelected ? Colors.white : Colors.black, fontWeight: FontWeight.bold)),
                      const SizedBox(width: 4),
                      Icon(Icons.star, color: isSelected ? Colors.white : FerakoColors.marketClay, size: 16),
                    ],
                  ),
                ),
              );
            }),
          ),
          const SizedBox(height: 32),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Open Now Only', style: Theme.of(context).textTheme.titleMedium),
              Switch(value: _openNow, activeColor: FerakoColors.marketClay, onChanged: (v) => setState(() => _openNow = v)),
            ],
          ),
          const SizedBox(height: 32),
          Text('Max Price (₵)', style: Theme.of(context).textTheme.titleMedium),
          Slider(
            value: _priceRange,
            max: 500,
            divisions: 10,
            label: '₵ ${_priceRange.round()}',
            activeColor: FerakoColors.marketClay,
            inactiveColor: Colors.grey.shade300,
            onChanged: (v) => setState(() => _priceRange = v),
          ),
          const SizedBox(height: 32),
          FerakoButton(label: 'Apply Filters', onPressed: () => Navigator.pop(context)),
        ],
      ),
    );
  }
}
