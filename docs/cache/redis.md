# Redis Docker Compose Configuration

This guide provides a production-ready Redis configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    container_name: redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD}
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  redis_data:

networks:
  app-network:
    driver: bridge
```

## Environment Variables

Create a `.env` file:

```env
REDIS_PASSWORD=your_redis_password
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the `.env` file with your password
3. Run: `docker-compose up -d`

## Best Practices

- Always set a password in production
- Use Alpine-based images
- Enable persistence for data reliability
- Configure proper memory limits
- Enable healthcheck