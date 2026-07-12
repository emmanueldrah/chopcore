enum UserRole {
  buyer,
  vendorOwner,
  vendorStaff,
  admin;

  String toJson() => name;
  static UserRole fromJson(String name) => UserRole.values.byName(name);
}
