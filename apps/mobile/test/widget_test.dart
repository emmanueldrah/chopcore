import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ferako/main.dart';

void main() {
  testWidgets('App should load and show splash screen', (WidgetTester tester) async {
    await tester.runAsync(() async {
      await tester.pumpWidget(const ProviderScope(child: FerakoApp()));
      expect(find.text('FERAKO'), findsOneWidget);
    });
  });
}
