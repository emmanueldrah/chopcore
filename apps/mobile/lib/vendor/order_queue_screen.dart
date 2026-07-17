import 'package:flutter/material.dart';
import 'package:ferako/theme/ferako_theme.dart';
import 'package:ferako/widgets/ferako_card.dart';
import 'dart:async';

class OrderQueueScreen extends StatelessWidget {
  const OrderQueueScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('New Orders')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: 2,
        itemBuilder: (context, index) => const _OrderQueueCard(),
      ),
    );
  }
}

class _OrderQueueCard extends StatefulWidget {
  const _OrderQueueCard();

  @override
  State<_OrderQueueCard> createState() => _OrderQueueCardState();
}

class _OrderQueueCardState extends State<_OrderQueueCard> {
  int _secondsRemaining = 900; // 15 minutes
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 0) {
        setState(() => _secondsRemaining--);
      } else {
        _timer?.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String _formatTime(int seconds) {
    final m = seconds ~/ 60;
    final s = seconds % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final isUrgent = _secondsRemaining < 300; // Less than 5 mins

    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: FerakoCard(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Order #1234', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: isUrgent ? FerakoColors.ripePepper : FerakoColors.beverageTeal,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      _formatTime(_secondsRemaining),
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontFamily: 'Inter'),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              const Text('Kojo Mensah • ₵ 65.00', style: TextStyle(color: Colors.grey)),
              const Divider(height: 24),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () {},
                      style: OutlinedButton.styleFrom(
                        foregroundColor: FerakoColors.ripePepper,
                        side: const BorderSide(color: FerakoColors.ripePepper),
                      ),
                      child: const Text('Decline'),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: FerakoColors.deepPalm,
                        foregroundColor: Colors.white,
                      ),
                      child: const Text('Accept'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
