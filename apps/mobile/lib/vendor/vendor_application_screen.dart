import 'package:flutter/material.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako_core/ferako_core.dart';

class VendorApplicationScreen extends StatefulWidget {
  const VendorApplicationScreen({super.key});

  @override
  State<VendorApplicationScreen> createState() => _VendorApplicationScreenState();
}

class _VendorApplicationScreenState extends State<VendorApplicationScreen> {
  final _businessNameController = TextEditingController();
  VendorCategory? _selectedCategory;
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Vendor Application', style: TextStyle(fontFamily: 'Fraunces'))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Register your business',
              style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 24),
            ),
            const SizedBox(height: 8),
            const Text(
              'Fill out the details below to start selling on Ferako.',
              style: TextStyle(fontFamily: 'Inter', color: Colors.grey),
            ),
            const SizedBox(height: 32),
            TextField(
              controller: _businessNameController,
              decoration: const InputDecoration(
                labelText: 'Business Name',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            DropdownButtonFormField<VendorCategory>(
              value: _selectedCategory,
              decoration: const InputDecoration(
                labelText: 'Category',
                border: OutlineInputBorder(),
              ),
              items: VendorCategory.values.map((cat) {
                return DropdownMenuItem(
                  value: cat,
                  child: Text(cat.name[0].toUpperCase() + cat.name.substring(1)),
                );
              }).toList(),
              onChanged: (val) => setState(() => _selectedCategory = val),
            ),
            const SizedBox(height: 32),
            FerakoButton(
              label: 'Submit Application',
              isLoading: _isLoading,
              onPressed: () {
                setState(() => _isLoading = true);
                Future.delayed(const Duration(seconds: 2), () {
                  if (mounted) {
                    setState(() => _isLoading = false);
                    _showSuccessDialog();
                  }
                });
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showSuccessDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text('Application Submitted', style: TextStyle(fontFamily: 'Fraunces')),
        content: const Text('Your application is pending review. We will notify you once approved.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.popUntil(context, (route) => route.isFirst),
            child: const Text('OK', style: TextStyle(color: FerakoColors.marketClay)),
          ),
        ],
      ),
    );
  }
}
