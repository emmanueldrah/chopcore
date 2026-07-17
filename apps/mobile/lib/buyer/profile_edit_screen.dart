import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_button.dart';

class ProfileEditScreen extends StatefulWidget {
  const ProfileEditScreen({super.key});

  @override
  State<ProfileEditScreen> createState() => _ProfileEditScreenState();
}

class _ProfileEditScreenState extends State<ProfileEditScreen> {
  final _nameController = TextEditingController();
  final _nameFocus = FocusNode();
  String? _nameError;

  @override
  void initState() {
    super.initState();
    _nameFocus.addListener(() {
      if (!_nameFocus.hasFocus) {
        setState(() {
          if (_nameController.text.isEmpty) {
            _nameError = 'Enter a valid name';
          } else {
            _nameError = null;
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _nameFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Edit Profile')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Profile Details', style: Theme.of(context).textTheme.displayMedium),
            const SizedBox(height: 32),
            TextField(
              controller: _nameController,
              focusNode: _nameFocus,
              decoration: InputDecoration(
                labelText: 'Full Name',
                hintText: 'John Doe',
                border: const OutlineInputBorder(),
                errorText: _nameError,
                errorStyle: const TextStyle(color: FerakoColors.ripePepper, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 32),
            FerakoButton(
              label: 'Save Changes',
              onPressed: () {
                if (_nameController.text.isEmpty) {
                  setState(() => _nameError = 'Enter a valid name');
                  return;
                }
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}
