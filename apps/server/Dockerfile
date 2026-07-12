# Use latest stable dart sdk.
FROM dart:stable AS build

WORKDIR /app

# Copy shared core first
COPY packages/ferako_core /app/packages/ferako_core

# Copy server code
COPY apps/server /app/apps/server

# Resolve dependencies
WORKDIR /app/apps/server
RUN dart pub get

# Compile server
RUN dart compile exe bin/server.dart -o bin/server

# Final image
FROM subfuzion/dart:slim
COPY --from=build /app/apps/server/bin/server /app/bin/server
EXPOSE 8080
CMD ["/app/bin/server"]
