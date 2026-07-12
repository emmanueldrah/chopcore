# Ferako Marketplace

Ferako is a multi-vendor local commerce marketplace serving Ho and the Volta Region, Ghana. Buyers order from independent local vendors across four categories — food, pharmacy (OTC only), fruits & vegetables, and beverages.

## Tech Stack

- **Monorepo:** Dart / Flutter
- **Frontend:** Flutter (Mobile-first responsive web + native)
- **Backend:** Dart (Shelf)
- **Shared Logic:** `ferako_core` (Dart package)
- **Database:** PostgreSQL (via Supabase)
- **Auth:** Supabase Auth (Phone OTP)

## Project Structure

- `apps/mobile`: Flutter mobile/web application.
- `apps/server`: Dart server application.
- `packages/ferako_core`: Shared DTOs, Enums, and business logic.
- `sql/migrations`: PostgreSQL schema migrations.

## Getting Started

### Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install)
- [Dart SDK](https://dart.dev/get-started/sdk)

### Setup

1. Install dependencies for all packages:
   ```bash
   cd packages/ferako_core && dart pub get
   cd ../../apps/mobile && flutter pub get
   cd ../server && dart pub get
   ```

2. Run the server:
   ```bash
   cd apps/server
   dart run bin/server.dart
   ```

3. Run the mobile/web app:
   ```bash
   cd apps/mobile
   flutter run -d chrome # For web
   ```

## Development

### Database Migrations
Migrations are located in `sql/migrations`. Apply them to your Supabase project via the Supabase SQL Editor.

### Testing
Each package/app has its own tests. Run them using `dart test` or `flutter test`.
