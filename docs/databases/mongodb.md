# MongoDB Docker Compose Configuration

This guide provides a production-ready MongoDB configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    container_name: mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGO_DATABASE}
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init:/docker-entrypoint-initdb.d
    networks:
      - app-network
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongodb_data:

networks:
  app-network:
    driver: bridge
```

## Environment Variables

Create a `.env` file:

```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_root_password
MONGO_DATABASE=your_database
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the `.env` file with your credentials
3. Run: `docker-compose up -d`

## Best Practices

- Enable authentication in production
- Use volumes for data persistence
- Configure proper memory limits
- Enable monitoring and backups
- Use specific version tags