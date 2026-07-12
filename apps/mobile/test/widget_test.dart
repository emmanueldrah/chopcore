import 'package:flutter_test/flutter_test.dart';
import 'package:ferako/main.dart';

void main() {
  testWidgets('App should load and show welcome message', (WidgetTester tester) async {
    await tester.pumpWidget(const FerakoApp());
    expect(find.text('Welcome to Ferako'), findsOneWidget);
  });
}
