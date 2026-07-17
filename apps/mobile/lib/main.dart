import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/auth/splash_screen.dart';
import 'package:ferako/widgets/ferako_responsive_wrapper.dart';

void main() {
  runApp(const ProviderScope(child: FerakoApp()));
}

class FerakoApp extends StatelessWidget {
  const FerakoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ferako',
      theme: FerakoTheme.lightTheme,
      builder: (context, child) => FerakoResponsiveWrapper(child: child!),
      home: const SplashScreen(),
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
