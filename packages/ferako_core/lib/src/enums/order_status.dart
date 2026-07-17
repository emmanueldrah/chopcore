enum OrderStatus {
  placed,
  accepted,
  declined,
  preparing,
  outForDelivery,
  delivered,
  disputed,
  cancelled,
  refunded,
  autoFlagged;

  String toJson() => name;
  static OrderStatus fromJson(String name) => OrderStatus.values.byName(name);
}
