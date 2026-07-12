class Vendor {
  final String id;
  final String businessName;
  final String category;
  final String addressText;
  final double rating;

  Vendor({
    required this.id,
    required this.businessName,
    required this.category,
    required this.addressText,
    required this.rating,
  });

  factory Vendor.fromJson(Map<String, dynamic> json) {
    return Vendor(
      id: json['id'],
      businessName: json['businessName'],
      category: json['category'],
      addressText: json['addressText'] ?? '',
      rating: (json['avgRating'] ?? 5.0).toDouble(),
    );
  }
}
