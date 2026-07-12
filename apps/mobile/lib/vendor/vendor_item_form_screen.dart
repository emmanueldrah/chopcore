import 'package:flutter/material.dart';
import 'package:ferako/widgets/ferako_button.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako_core/ferako_core.dart';

class VendorItemFormScreen extends StatefulWidget {
  final VendorCategory vendorCategory;

  const VendorItemFormScreen({super.key, required this.vendorCategory});

  @override
  State<VendorItemFormScreen> createState() => _VendorItemFormScreenState();
}

class _VendorItemFormScreenState extends State<VendorItemFormScreen> {
  final _nameController = TextEditingController();
  final _priceController = TextEditingController();
  String? _selectedOtcCategoryId;
  bool _isLoading = false;

  final List<Map<String, String>> _otcCategories = [
    {'id': '1', 'name': 'Pain Relievers'},
    {'id': '2', 'name': 'First Aid'},
    {'id': '3', 'name': 'Vitamins'},
  ];

  @override
  Widget build(BuildContext context) {
    final isPharmacy = widget.vendorCategory == VendorCategory.pharmacyOtc;

    return Scaffold(
      appBar: AppBar(title: const Text('Add Item')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Item Name', border: OutlineInputBorder()),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _priceController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Price (Pesewas)', border: OutlineInputBorder()),
            ),
            if (isPharmacy) ...[
              const SizedBox(height: 20),
              DropdownButtonFormField<String>(
                value: _selectedOtcCategoryId,
                decoration: const InputDecoration(labelText: 'OTC Category', border: OutlineInputBorder()),
                items: _otcCategories.map((cat) {
                  return DropdownMenuItem(value: cat['id'], child: Text(cat['name']!));
                }).toList(),
                onChanged: (val) => setState(() => _selectedOtcCategoryId = val),
              ),
              const SizedBox(height: 8),
              const Text(
                'Note: Pharmacy vendors can only list Over-The-Counter (OTC) items.',
                style: TextStyle(fontSize: 12, color: FerakoColors.ripePepper),
              ),
            ],
            const SizedBox(height: 32),
            FerakoButton(
              label: 'Save Item',
              isLoading: _isLoading,
              onPressed: () {
                final isValid = OtcValidator.isValidItem(widget.vendorCategory, _selectedOtcCategoryId);
                if (!isValid) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Please select an OTC category.'), backgroundColor: FerakoColors.ripePepper),
                  );
                  return;
                }
                setState(() => _isLoading = true);
                Future.delayed(const Duration(seconds: 1), () {
                  if (mounted) {
                    setState(() => _isLoading = false);
                    Navigator.pop(context);
                  }
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}
