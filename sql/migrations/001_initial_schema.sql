-- 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles Enum
CREATE TYPE user_role AS ENUM ('buyer', 'vendor_owner', 'vendor_staff', 'admin');

-- Vendor Category Enum
CREATE TYPE vendor_category AS ENUM ('food', 'pharmacy_otc', 'produce', 'beverages');

-- Order Status Enum
CREATE TYPE order_status AS ENUM (
    'placed', 'accepted', 'declined', 'preparing',
    'out_for_delivery', 'delivered', 'disputed',
    'cancelled', 'refunded', 'auto_flagged'
);

-- Verification Status Enum
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');

-- Escrow Status Enum
CREATE TYPE escrow_status AS ENUM ('held', 'released', 'refunded');

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role NOT NULL DEFAULT 'buyer',
    push_token TEXT,
    notification_prefs JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Vendors Table
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_user_id UUID REFERENCES users(id),
    business_name TEXT NOT NULL,
    category vendor_category NOT NULL,
    verification_status verification_status DEFAULT 'pending',
    verification_doc_url TEXT,
    rejection_reason TEXT,
    location_lat NUMERIC,
    location_lng NUMERIC,
    address_text TEXT,
    avg_rating NUMERIC DEFAULT 0,
    open_hours JSONB DEFAULT '{}'::jsonb,
    is_open_override BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- OTC Categories (Seed Data)
CREATE TABLE otc_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

-- Items Table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id),
    name TEXT NOT NULL,
    description TEXT,
    price_pesewas INTEGER NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    photo_url TEXT,
    otc_category_id UUID REFERENCES otc_categories(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    status order_status NOT NULL DEFAULT 'placed',
    subtotal_pesewas INTEGER NOT NULL,
    commission_pesewas INTEGER NOT NULL,
    total_pesewas INTEGER NOT NULL,
    escrow_status escrow_status DEFAULT 'held',
    idempotency_key TEXT UNIQUE,
    placed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP WITH TIME ZONE,
    out_for_delivery_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_vendors_location ON vendors (location_lat, location_lng);
CREATE INDEX idx_items_vendor ON items (vendor_id);
CREATE INDEX idx_orders_buyer ON orders (buyer_id);
CREATE INDEX idx_orders_vendor ON orders (vendor_id);
