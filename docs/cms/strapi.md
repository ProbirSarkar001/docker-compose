# Strapi Docker Compose Configuration

This guide provides a production-ready Strapi configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  strapi:
    image: strapi/strapi:latest
    container_name: strapi
    restart: unless-stopped
    ports:
      - "1337:1337"
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: db
      DATABASE_PORT: 5432
      DATABASE_NAME: ${DB_NAME}
      DATABASE_USERNAME: ${DB_USER}
      DATABASE_PASSWORD: ${DB_PASSWORD}
      NODE_ENV: production
    volumes:
      - strapi_data:/srv/app
    networks:
      - app-network

  db:
    image: postgres:15
    container_name: strapi_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  strapi_data:
  db_data:

networks:
  app-network:
    driver: bridge
```

### Environment Variables

Create a `.env` file with the following content:

```env
DB_NAME=strapi
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

### Usage

1. Save the configuration as `docker-compose.yml`.
2. Create the `.env` file with your credentials.
3. Run: `docker-compose up -d`.

### Best Practices

- Use environment variables to keep sensitive data secure.
- Persist data using Docker volumes for both the Strapi app and the database.
- Ensure you configure your Strapi instance for production (`NODE_ENV=production`).
- Consider setting up health checks for the database and application.
- Use proper networking configurations for scalability and security.
