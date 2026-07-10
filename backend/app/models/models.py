import enum
from datetime import datetime
from typing import List, Optional
from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, ForeignKey,
    Numeric, Enum, Text, JSON, Float, UniqueConstraint, Table
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid

class Base(DeclarativeBase):
    pass

class UserRole(str, enum.Enum):
    BUYER = "buyer"
    VENDOR_OWNER = "vendor_owner"
    VENDOR_STAFF = "vendor_staff"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone_number = Column(String, unique=True, nullable=False)
    full_name = Column(String)
    role = Column(Enum(UserRole), nullable=False)
    push_token = Column(String, nullable=True)
    notification_prefs = Column(JSONB, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    vendor = relationship("Vendor", back_populates="owner", uselist=False)
    addresses = relationship("Address", back_populates="user")
    orders = relationship("Order", back_populates="buyer")

class VendorCategory(str, enum.Enum):
    FOOD = "food"
    PHARMACY_OTC = "pharmacy_otc"
    PRODUCE = "produce"
    BEVERAGES = "beverages"

class VerificationStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    SUSPENDED = "suspended"

class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    business_name = Column(String, nullable=False)
    category = Column(Enum(VendorCategory), nullable=False)
    verification_status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    verification_doc_url = Column(String)
    rejection_reason = Column(String, nullable=True)
    location_lat = Column(Float)
    location_lng = Column(Float)
    address_text = Column(String)
    avg_rating = Column(Numeric(3, 2), default=0.0)
    open_hours = Column(JSONB)
    is_open_override = Column(Boolean, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    owner = relationship("User", back_populates="vendor")
    items = relationship("Item", back_populates="vendor")
    staff = relationship("VendorStaff", back_populates="vendor")
    orders = relationship("Order", back_populates="vendor")

class VendorStaff(Base):
    __tablename__ = "vendor_staff"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    permissions = Column(JSONB, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    vendor = relationship("Vendor", back_populates="staff")

class OtcCategory(Base):
    __tablename__ = "otc_categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)

class Item(Base):
    __tablename__ = "items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    price_pesewas = Column(Integer, nullable=False)
    stock_quantity = Column(Integer, default=0)
    low_stock_threshold = Column(Integer, default=5)
    photo_url = Column(String)
    otc_category_id = Column(UUID(as_uuid=True), ForeignKey("otc_categories.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    vendor = relationship("Vendor", back_populates="items")

class Address(Base):
    __tablename__ = "addresses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    label = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    address_text = Column(String)
    is_default = Column(Boolean, default=False)

    user = relationship("User", back_populates="addresses")

class OrderStatus(str, enum.Enum):
    PLACED = "placed"
    ACCEPTED = "accepted"
    DECLINED = "declined"
    PREPARING = "preparing"
    OUT_FOR_DELIVERY = "out_for_delivery"
    DELIVERED = "delivered"
    DISPUTED = "disputed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"
    AUTO_FLAGGED = "auto_flagged"

class EscrowStatus(str, enum.Enum):
    HELD = "held"
    RELEASED = "released"
    REFUNDED = "refunded"

class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    delivery_address_id = Column(UUID(as_uuid=True), ForeignKey("addresses.id"), nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.PLACED)
    subtotal_pesewas = Column(Integer, nullable=False)
    commission_pesewas = Column(Integer, nullable=False)
    total_pesewas = Column(Integer, nullable=False)
    commission_rate_snapshot = Column(Numeric(5, 4))
    escrow_status = Column(Enum(EscrowStatus), default=EscrowStatus.HELD)
    idempotency_key = Column(String, unique=True, nullable=False)
    placed_at = Column(DateTime, default=datetime.utcnow)
    accepted_at = Column(DateTime, nullable=True)
    out_for_delivery_at = Column(DateTime, nullable=True)
    delivered_at = Column(DateTime, nullable=True)
    eta_minutes = Column(Integer, nullable=True)

    buyer = relationship("User", back_populates="orders")
    vendor = relationship("Vendor", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    item_id = Column(UUID(as_uuid=True), ForeignKey("items.id"), nullable=False)
    item_name_snapshot = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price_pesewas = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")

class PayoutStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"

class Payout(Base):
    __tablename__ = "payouts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    amount_pesewas = Column(Integer, nullable=False)
    status = Column(Enum(PayoutStatus), default=PayoutStatus.PENDING)
    aggregator_reference = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    paid_at = Column(DateTime, nullable=True)

class DisputeStatus(str, enum.Enum):
    OPEN = "open"
    RESOLVED = "resolved"

class DisputeResolution(str, enum.Enum):
    RELEASED = "released"
    REFUNDED = "refunded"

class Dispute(Base):
    __tablename__ = "disputes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    raised_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    reason = Column(String, nullable=False)
    note = Column(Text)
    photo_url = Column(String, nullable=True)
    status = Column(Enum(DisputeStatus), default=DisputeStatus.OPEN)
    resolved_by_admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    resolution = Column(Enum(DisputeResolution), nullable=True)
    resolution_notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

class Review(Base):
    __tablename__ = "reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), unique=True, nullable=False)
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    entity_type = Column(String, nullable=False)
    entity_id = Column(UUID(as_uuid=True), nullable=False)
    action = Column(String, nullable=False)
    actor_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    before_state = Column(JSONB)
    after_state = Column(JSONB)
    created_at = Column(DateTime, default=datetime.utcnow)

class TicketStatus(str, enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    CLOSED = "closed"

class SupportTicket(Base):
    __tablename__ = "support_tickets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=True)
    subject = Column(String, nullable=False)
    description = Column(Text)
    status = Column(Enum(TicketStatus), default=TicketStatus.OPEN)
    created_at = Column(DateTime, default=datetime.utcnow)
