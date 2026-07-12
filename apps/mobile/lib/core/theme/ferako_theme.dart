import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FerakoTheme {
  static const marketClay = Color(0xFFC6602E);
  static const deepPalm = Color(0xFF1F3D2B);
  static const harmattanSand = Color(0xFFF2E9DC);
  static const ripePepper = Color(0xFFA32F2F);
  static const beverageTeal = Color(0xFF2E6B63);
  static const charcoalInk = Color(0xFF2B2320);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: marketClay,
        primary: marketClay,
        secondary: beverageTeal,
        surface: harmattanSand,
        error: ripePepper,
      ),
      textTheme: GoogleFonts.interTextTheme(),
    );
  }
}
