import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displayLarge: GoogleFonts.fraunces(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: FerakoColors.deepPalm,
        ),
        displayMedium: GoogleFonts.fraunces(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          color: FerakoColors.deepPalm,
        ),
        titleMedium: GoogleFonts.fraunces(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: FerakoColors.deepPalm,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: FerakoColors.deepPalm,
        foregroundColor: FerakoColors.harmattanSand,
        titleTextStyle: GoogleFonts.fraunces(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: FerakoColors.harmattanSand,
        ),
      ),
    );
  }
}
