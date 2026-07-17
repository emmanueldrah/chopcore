import 'package:flutter/services.dart';

class FerakoHaptics {
  static void light() => HapticFeedback.selectionClick();
  static void medium() => HapticFeedback.mediumImpact();
  static void success() => HapticFeedback.lightImpact();
  static void error() => HapticFeedback.heavyImpact();
}
