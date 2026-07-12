import 'package:ferako_core/ferako_core.dart';

class User {
  final String id;
  final String phoneNumber;
  final String? fullName;
  final UserRole role;
  final String? pushToken;
  final DateTime createdAt;

  User({
    required this.id,
    required this.phoneNumber,
    this.fullName,
    required this.role,
    this.pushToken,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'phone_number': phoneNumber,
      'full_name': fullName,
      'role': role.toJson(),
      'push_token': pushToken,
      'created_at': createdAt.toIso8601String(),
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'],
      phoneNumber: map['phone_number'],
      fullName: map['full_name'],
      role: UserRole.fromJson(map['role']),
      pushToken: map['push_token'],
      createdAt: DateTime.parse(map['created_at']),
    );
  }
}

class Vendor {
  final String id;
  final String ownerUserId;
  final String businessName;
  final VendorCategory category;
  final String? verificationDocUrl;
  final double? lat;
  final double? lng;
  final String? addressText;
  final double avgRating;

  Vendor({
    required this.id,
    required this.ownerUserId,
    required this.businessName,
    required this.category,
    this.verificationDocUrl,
    this.lat,
    this.lng,
    this.addressText,
    this.avgRating = 0,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'owner_user_id': ownerUserId,
      'business_name': businessName,
      'category': category.toJson(),
      'verification_doc_url': verificationDocUrl,
      'location_lat': lat,
      'location_lng': lng,
      'address_text': addressText,
      'avg_rating': avgRating,
    };
  }

  factory Vendor.fromMap(Map<String, dynamic> map) {
    return Vendor(
      id: map['id'],
      ownerUserId: map['owner_user_id'],
      businessName: map['business_name'],
      category: VendorCategory.fromJson(map['category']),
      verificationDocUrl: map['verification_doc_url'],
      lat: map['location_lat']?.toDouble(),
      lng: map['location_lng']?.toDouble(),
      addressText: map['address_text'],
      avgRating: map['avg_rating']?.toDouble() ?? 0,
    );
  }
}
