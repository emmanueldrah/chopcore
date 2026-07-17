import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_card.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/widgets/ferako_haptics.dart';

class RatingPromptModal extends StatefulWidget {
  const RatingPromptModal({super.key});

  @override
  State<RatingPromptModal> createState() => _RatingPromptModalState();
}

class _RatingPromptModalState extends State<RatingPromptModal> {
  int _rating = 0;
  final _commentController = TextEditingController();

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
        children: [
          Text('Rate your experience', style: Theme.of(context).textTheme.displayMedium),
          const SizedBox(height: 8),
          const Text('Your feedback helps local vendors in Ho grow.', style: TextStyle(color: Colors.grey)),
          const SizedBox(height: 32),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(5, (index) {
              final isFilled = index < _rating;
              return GestureDetector(
                onTap: () {
                  setState(() => _rating = index + 1);
                  FerakoHaptics.success();
                },
                child: Icon(
                  isFilled ? Icons.star : Icons.star_border,
                  color: FerakoColors.marketClay,
                  size: 48,
                ),
              );
            }),
          ),
          const SizedBox(height: 32),
          TextField(
            controller: _commentController,
            maxLines: 3,
            decoration: const InputDecoration(
              hintText: 'Add a comment (optional)',
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(borderSide: BorderSide.none, borderRadius: BorderRadius.all(Radius.circular(12))),
            ),
          ),
          const SizedBox(height: 32),
          FerakoButton(
            label: 'Submit Rating',
            onPressed: _rating == 0 ? null : () => Navigator.pop(context),
          ),
        ],
      ),
    );
  }
}
