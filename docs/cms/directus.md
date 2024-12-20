# Directus Docker Compose Configuration

This guide provides a production-ready Directus configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  directus:
    image: directus/directus:latest
    container_name: directus
    restart: unless-stopped
    ports:
      - "8055:8055"
    environment:
      KEY: ${DIRECTUS_KEY}
      SECRET: ${DIRECTUS_SECRET}
      ADMIN_EMAIL: ${DIRECTUS_ADMIN_EMAIL}
      ADMIN_PASSWORD: ${DIRECTUS_ADMIN_PASSWORD}
      DB_CLIENT: "pg"
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_DATABASE: ${DB_DATABASE}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
    volumes:
      - directus_uploads:/directus/uploads
      - directus_extensions:/directus/extensions
    networks:
      - app-network
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:15-alpine
    container_name: directus_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_DATABASE}"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  directus_uploads:
  directus_extensions:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

## Environment Variables

Create a `.env` file:

```env
DIRECTUS_KEY=your_random_key
DIRECTUS_SECRET=your_random_secret
DIRECTUS_ADMIN_EMAIL=admin@example.com
DIRECTUS_ADMIN_PASSWORD=your_admin_password
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=your_database_password
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the `.env` file with your credentials
3. Run: `docker-compose up -d`

## Best Practices

- Use environment variables for all sensitive data
- Set up proper volume mounts for uploads and extensions
- Configure database connection properly
- Use health checks for dependent services
- Set up proper networking