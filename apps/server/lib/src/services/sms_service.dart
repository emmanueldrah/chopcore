abstract class SmsProvider {
  Future<bool> sendSms(String phone, String message);
}

class HubtelSmsProvider implements SmsProvider {
  final String apiKey;

  HubtelSmsProvider(this.apiKey);

  @override
  Future<bool> sendSms(String phone, String message) async {
    // Implement Hubtel SMS API call
    print('Sending Hubtel SMS to $phone: $message');
    return true;
  }
}
