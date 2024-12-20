# Memcached Docker Compose Configuration

This guide provides a production-ready Memcached configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  memcached:
    image: memcached:1.6-alpine
    container_name: memcached
    restart: unless-stopped
    command: memcached -m 512
    ports:
      - "11211:11211"
    networks:
      - app-network
    healthcheck:
      test: echo stats | nc localhost 11211
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  app-network:
    driver: bridge
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Run: `docker-compose up -d`

## Best Practices

- Set appropriate memory limits
- Use Alpine-based images
- Configure connection pooling
- Monitor cache hit rates
- Implement proper key expiration strategies