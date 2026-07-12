import 'package:flutter/material.dart';

class FerakoColors {
  static const Color marketClay = Color(0xFFC6602E);
  static const Color deepPalm = Color(0xFF1F3D2B);
  static const Color harmattanSand = Color(0xFFF2E9DC);
  static const Color ripePepper = Color(0xFFA32F2F);
  static const Color beverageTeal = Color(0xFF2E6B63);
  static const Color charcoalInk = Color(0xFF2B2320);
}

class FerakoTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: FerakoColors.marketClay,
        primary: FerakoColors.marketClay,
        onPrimary: Colors.white,
        secondary: FerakoColors.beverageTeal,
        onSecondary: Colors.white,
        surface: FerakoColors.harmattanSand,
        onSurface: FerakoColors.charcoalInk,
        error: FerakoColors.ripePepper,
      ),
      scaffoldBackgroundColor: FerakoColors.harmattanSand,
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontFamily: 'Fraunces',
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: FerakoColors.deepPalm,
        ),
        bodyLarge: TextStyle(
          fontFamily: 'Inter',
          fontSize: 16,
          color: FerakoColors.charcoalInk,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: FerakoColors.deepPalm,
        foregroundColor: FerakoColors.harmattanSand,
      ),
    );
  }
}
