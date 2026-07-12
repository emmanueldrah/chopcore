import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ferako/shared/widgets/ferako_button.dart';

void main() {
  testWidgets('FerakoButton renders correctly', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: FerakoButton(
          title: 'Test Button',
          onPress: () {},
        ),
      ),
    ));

    expect(find.text('Test Button'), findsOneWidget);
  });
}
