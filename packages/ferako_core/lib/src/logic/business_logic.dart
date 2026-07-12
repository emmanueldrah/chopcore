import 'package:ferako_core/ferako_core.dart';

class PricingCalculator {
  static const double defaultCommissionRate = 0.10; // 10% commission

  static int calculateCommission(int subtotalPesewas, double rate) {
    return (subtotalPesewas * rate).round();
  }

  static int calculateTotal(int subtotalPesewas, int commissionPesewas) {
    return subtotalPesewas + commissionPesewas;
  }
}

class OtcValidator {
  static bool isValidItem(VendorCategory vendorCategory, String? otcCategoryId) {
    if (vendorCategory == VendorCategory.pharmacyOtc) {
      return otcCategoryId != null && otcCategoryId.isNotEmpty;
    }
    return true;
  }
}
