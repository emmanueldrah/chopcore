abstract class PaymentAdapter {
  Future<bool> initiatePayment(String phone, int amountPesewas, String orderId);
  Future<bool> verifyWebhook(Map<String, dynamic> payload, String signature);
}

class PaystackAdapter implements PaymentAdapter {
  final String apiKey;

  PaystackAdapter(this.apiKey);

  @override
  Future<bool> initiatePayment(String phone, int amountPesewas, String orderId) async {
    // Implement Paystack Ghana mobile money API call
    print('Initiating Paystack payment for $orderId: $amountPesewas pesewas to $phone');
    return true;
  }

  @override
  Future<bool> verifyWebhook(Map<String, dynamic> payload, String signature) async {
    // Implement signature verification
    return true;
  }
}
