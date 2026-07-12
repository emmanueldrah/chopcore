import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FerakoColors {
  // Primary Palette
  static const Color marketClay = Color(0xFFC6602E);
  static const Color deepPalm = Color(0xFF1F3D2B);
  static const Color harmattanSand = Color(0xFFF2E9DC);
  static const Color ripePepper = Color(0xFFA32F2F);
  static const Color beverageTeal = Color(0xFF2E6B63);
  static const Color charcoalInk = Color(0xFF2B2320);

  // Surface & Accent
  static final Color shadowWarm = marketClay.withOpacity(0.08);
}

class FerakoTheme {
  static ThemeData get lightTheme {
    final textTheme = GoogleFonts.interTextTheme();

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
        background: FerakoColors.harmattanSand,
      ),
      scaffoldBackgroundColor: FerakoColors.harmattanSand,
      textTheme: textTheme.copyWith(
        displayLarge: GoogleFonts.fraunces(
          fontSize: 32,
          fontWeight: FontWeight.w800,
          color: FerakoColors.deepPalm,
          letterSpacing: -0.5,
        ),
        displayMedium: GoogleFonts.fraunces(
          fontSize: 24,
          fontWeight: FontWeight.w700,
          color: FerakoColors.deepPalm,
        ),
        titleMedium: GoogleFonts.fraunces(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: FerakoColors.deepPalm,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          color: FerakoColors.charcoalInk,
          height: 1.5,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          color: FerakoColors.charcoalInk.withOpacity(0.8),
        ),
        labelSmall: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.5,
          color: FerakoColors.deepPalm,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.fraunces(
          fontSize: 24,
          fontWeight: FontWeight.w800,
          color: FerakoColors.deepPalm,
        ),
        iconTheme: const IconThemeData(color: FerakoColors.deepPalm),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }
}
