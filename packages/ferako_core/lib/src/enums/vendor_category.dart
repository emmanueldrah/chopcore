enum VendorCategory {
  food,
  pharmacyOtc,
  produce,
  beverages;

  String toJson() => name;
  static VendorCategory fromJson(String name) => VendorCategory.values.byName(name);
}
