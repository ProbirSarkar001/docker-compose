# Meilisearch Docker Compose Configuration

This guide provides a production-ready Meilisearch configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  meilisearch:
    image: getmeili/meilisearch:latest
    container_name: meilisearch
    restart: unless-stopped
    ports:
      - "7700:7700"
    environment:
      MEILI_MASTER_KEY: ${MEILI_MASTER_KEY}
      MEILI_ENV: production
    volumes:
      - meilisearch_data:/meili_data
    networks:
      - app-network

volumes:
  meilisearch_data:

networks:
  app-network:
    driver: bridge
```

### Environment Variables

Create a `.env` file with the following content:

```env
MEILI_MASTER_KEY=your_master_key
```

### Usage

1. Save the configuration as `docker-compose.yml`.
2. Create the `.env` file with your credentials.
3. Run: `docker-compose up -d`.

### Best Practices

- Use a strong `MEILI_MASTER_KEY` to secure your instance.
- Persist data using Docker volumes (`meilisearch_data`).
- Run Meilisearch in production mode by setting `MEILI_ENV=production`.
- Configure networking to ensure access control.
- Expose only necessary ports and consider securing access behind a reverse proxy.

