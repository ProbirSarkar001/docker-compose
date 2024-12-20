# Elasticsearch Docker Compose Configuration

This guide provides a production-ready Elasticsearch configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  elasticsearch:
    image: elasticsearch:8.8.0
    container_name: elasticsearch
    restart: unless-stopped
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
      - xpack.security.enabled=true
      - ELASTIC_PASSWORD=${ELASTIC_PASSWORD}
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - app-network
    healthcheck:
      test: curl -s http://localhost:9200 >/dev/null || exit 1
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  elasticsearch_data:

networks:
  app-network:
    driver: bridge
```

## Environment Variables

Create a `.env` file:

```env
ELASTIC_PASSWORD=your_elastic_password
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the `.env` file with your password
3. Run: `docker-compose up -d`

## Best Practices

- Configure proper memory settings
- Enable security features
- Set up index lifecycle management
- Configure backups
- Monitor cluster health