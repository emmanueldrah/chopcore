import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/auth/phone_auth_screen.dart';

void main() {
  runApp(const FerakoApp());
}

class FerakoApp extends StatelessWidget {
  const FerakoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ferako',
      theme: FerakoTheme.lightTheme,
      home: const PhoneAuthScreen(),
      routes: {
        '/style-guide': (context) => const StyleGuideScreen(),
      },
    );
  }
}

class StyleGuideScreen extends StatelessWidget {
  const StyleGuideScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ferako Style Guide'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Typography',
              style: Theme.of(context).textTheme.displayLarge,
            ),
            const SizedBox(height: 16),
            const Text(
              'This is body text using Inter font. Highly legible for small screens.',
              style: TextStyle(fontFamily: 'Inter'),
            ),
            const SizedBox(height: 32),
            Text(
              'Colors',
              style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 24),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                _ColorBox(color: FerakoColors.marketClay, label: 'Market Clay'),
                _ColorBox(color: FerakoColors.deepPalm, label: 'Deep Palm'),
                _ColorBox(color: FerakoColors.beverageTeal, label: 'Bev Teal'),
              ],
            ),
            const SizedBox(height: 32),
            Text(
              'Buttons',
              style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 24),
            ),
            const SizedBox(height: 16),
            FerakoButton(
              label: 'Primary Action',
              onPressed: () {},
            ),
            const SizedBox(height: 16),
            const FerakoButton(
              label: 'Loading State',
              isLoading: true,
            ),
          ],
        ),
      ),
    );
  }
}

class _ColorBox extends StatelessWidget {
  final Color color;
  final String label;

  const _ColorBox({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 80,
          height: 80,
          margin: const EdgeInsets.only(right: 8),
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }
}
