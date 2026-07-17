import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ferako/providers/localization_provider.dart';
import 'package:ferako/theme/ferako_theme.dart';

class LanguageSwitcher extends ConsumerWidget {
  const LanguageSwitcher({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentLang = ref.watch(localizationProvider);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: FerakoColors.deepPalm.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: DropdownButton<Language>(
        value: currentLang,
        underline: const SizedBox(),
        icon: const Icon(Icons.language, size: 16, color: FerakoColors.deepPalm),
        items: [
          const DropdownMenuItem(value: Language.en, child: Text('EN', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
          const DropdownMenuItem(value: Language.ee, child: Text('EE', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
        ],
        onChanged: (lang) {
          if (lang != null) {
            ref.read(localizationProvider.notifier).setLanguage(lang);
          }
        },
      ),
    );
  }
}
