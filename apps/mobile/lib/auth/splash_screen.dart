import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/basket_weave_background.dart';
import 'package:ferako/auth/phone_auth_screen.dart';
import 'package:ferako/widgets/ferako_page_transitions.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fade;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 2));
    _fade = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));

    _controller.forward();

    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        Navigator.pushReplacement(context, FerakoPageTransitions.createRoute(const PhoneAuthScreen()));
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BasketWeaveBackground(
        child: Center(
          child: FadeTransition(
            opacity: _fade,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: FerakoColors.marketClay.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.shopping_basket, size: 80, color: FerakoColors.marketClay),
                ),
                const SizedBox(height: 24),
                Text(
                  'FERAKO',
                  style: Theme.of(context).textTheme.displayLarge?.copyWith(
                    letterSpacing: 8,
                    fontSize: 40,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Local Commerce. Ho Pride.',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    letterSpacing: 2,
                    fontWeight: FontWeight.w600,
                    color: FerakoColors.deepPalm,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
