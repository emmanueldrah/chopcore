import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'core/theme/ferako_theme.dart';
import 'shared/widgets/ferako_button.dart';
import 'shared/widgets/ferako_card.dart';
import 'shared/widgets/woven_pattern.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await Supabase.initialize(
      url: 'https://placeholder.supabase.co',
      anonKey: 'placeholder',
    );
  } catch (e) {
    debugPrint('Supabase init failed: $e');
  }

  runApp(
    const ProviderScope(
      child: FerakoApp(),
    ),
  );
}

class FerakoApp extends StatelessWidget {
  const FerakoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ferako',
      theme: FerakoTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const WovenPattern(),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Ferako',
                    style: TextStyle(
                      fontSize: 56,
                      fontWeight: FontWeight.bold,
                      color: FerakoTheme.deepPalm,
                      fontFamily: 'Fraunces-Bold',
                    ),
                  ),
                  const Text(
                    'Africa\'s Digital Commerce OS',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: FerakoTheme.marketClay,
                    ),
                  ),
                  const SizedBox(height: 48),
                  const FerakoCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'A unified commerce platform for trusted businesses and local delivery.',
                          style: TextStyle(fontSize: 18, color: FerakoTheme.charcoalInk),
                        ),
                        SizedBox(height: 16),
                        Row(
                          children: [
                            CircleAvatar(radius: 4, backgroundColor: FerakoTheme.beverageTeal),
                            SizedBox(width: 8),
                            Text(
                              'HO • VOLTA REGION',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 1.2,
                                color: Colors.grey,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),
                  FerakoButton(
                    title: 'Start Shopping',
                    onPress: () {},
                  ),
                  const SizedBox(height: 16),
                  FerakoButton(
                    title: 'I want to sell',
                    isOutline: true,
                    onPress: () {},
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
