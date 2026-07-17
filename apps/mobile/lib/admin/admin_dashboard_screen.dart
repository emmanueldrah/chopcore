import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';

class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Admin Dashboard', style: TextStyle(fontFamily: 'Fraunces'))),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Platform Overview',
              style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 24),
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                _StatCard(title: 'Vendors', value: '12', color: FerakoColors.marketClay),
                const SizedBox(width: 16),
                _StatCard(title: 'Orders', value: '156', color: FerakoColors.beverageTeal),
              ],
            ),
            const SizedBox(height: 32),
            Text(
              'Pending Approvals',
              style: Theme.of(context).textTheme.displayLarge?.copyWith(fontSize: 24),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: 3,
                itemBuilder: (context, index) {
                  return Card(
                    color: Colors.white,
                    child: ListTile(
                      title: Text('Vendor ${index + 1}', style: const TextStyle(fontWeight: FontWeight.bold)),
                      subtitle: const Text('Pharmacy • Pending since 2h ago'),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {},
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final Color color;

  const _StatCard({required this.title, required this.value, required this.color});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.2)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: TextStyle(color: color, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text(
              value,
              style: TextStyle(
                color: color,
                fontSize: 28,
                fontWeight: FontWeight.bold,
                fontFamily: 'Inter',
              ),
            ),
          ],
        ),
      ),
    );
  }
}
