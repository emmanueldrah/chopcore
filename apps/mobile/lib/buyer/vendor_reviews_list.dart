import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

class FerakoReviewsList extends StatelessWidget {
  const FerakoReviewsList({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reviews')),
      body: ListView.builder(
        padding: const EdgeInsets.all(24),
        itemCount: 5,
        itemBuilder: (context, index) => Padding(
          padding: const EdgeInsets.only(bottom: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(backgroundColor: FerakoColors.marketClay.withOpacity(0.1), child: const Text('K')),
                  const SizedBox(width: 12),
                  const Text('Kojo M.', style: TextStyle(fontWeight: FontWeight.bold)),
                  const Spacer(),
                  const Text('2 days ago', style: TextStyle(color: Colors.grey, fontSize: 12)),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: List.generate(5, (index) => Icon(Icons.star, color: index < 4 ? FerakoColors.marketClay : Colors.grey.shade300, size: 16)),
              ),
              const SizedBox(height: 8),
              const Text(
                'The food was fresh and delivered warm. Best tilapia I have had in Ho this week!',
                style: TextStyle(height: 1.4),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
