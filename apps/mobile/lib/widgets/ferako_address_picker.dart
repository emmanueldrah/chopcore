import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_card.dart';
import 'package:ferako/widgets/ferako_button.dart';

class FerakoAddressPicker extends StatelessWidget {
  const FerakoAddressPicker({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Delivery Address')),
      body: Column(
        children: [
          Expanded(
            child: Stack(
              children: [
                // Mock Map View
                Container(
                  color: FerakoColors.harmattanSand,
                  child: Center(
                    child: Icon(Icons.location_on, size: 50, color: FerakoColors.marketClay),
                  ),
                ),
                Positioned(
                  top: 20,
                  left: 20,
                  right: 20,
                  child: FerakoCard(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                      child: TextField(
                        decoration: InputDecoration(
                          hintText: 'Search for your location...',
                          border: InputBorder.none,
                          icon: Icon(Icons.search, color: FerakoColors.marketClay),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
              boxShadow: [
                BoxShadow(color: FerakoColors.shadowWarm, blurRadius: 20, offset: const Offset(0, -5)),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Confirm Location', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                const SizedBox(height: 8),
                const Text('Ho Technical University Campus, Volta Region', style: TextStyle(color: Colors.grey)),
                const SizedBox(height: 24),
                FerakoButton(
                  label: 'Set Delivery Location',
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
