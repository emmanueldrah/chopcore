import 'package:flutter_riverpod/flutter_riverpod.dart';

enum Language { en, ee }

class LocalizationNotifier extends StateNotifier<Language> {
  LocalizationNotifier() : super(Language.en);

  void setLanguage(Language lang) => state = lang;

  String translate(String key) {
    final translations = {
      Language.en: {
        'welcome': 'Welcome to Ferako',
        'buy': 'I want to Buy',
        'sell': 'I want to Sell',
        'track': 'Track Order',
        'categories': 'Market Categories',
        'add_to_cart': 'Add to Cart',
        'total': 'Total',
        'nearby': 'Nearby Vendors',
        'recently_ordered': 'Recently Ordered From',
        'search_hint': 'Search food, medicines, produce...',
      },
      Language.ee: {
        'welcome': 'Woezor yi Ferako',
        'buy': 'Mele nudzra ge',
        'sell': 'Mele nudzra ge',
        'track': 'Kpɔ wò dɔdɔ gbe',
        'categories': 'Nudzradzrawo',
        'add_to_cart': 'De kusi me',
        'total': 'Wo katã',
        'nearby': 'Dzraɖola siwo te ɖe ŋuwò',
        'recently_ordered': 'Dzraɖola siwo ŋu nèƒle nu le nyitsɔ laa',
        'search_hint': 'Di nuɖuɖu, atike, alo nudzrawo...',
      }
    };

    return translations[state]?[key] ?? key;
  }
}

final localizationProvider = StateNotifierProvider<LocalizationNotifier, Language>((ref) => LocalizationNotifier());
