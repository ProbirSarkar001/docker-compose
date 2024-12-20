# MySQL Docker Compose Configuration

This guide provides a production-ready MySQL configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql/init:/docker-entrypoint-initdb.d
    networks:
      - app-network
    command: --default-authentication-plugin=mysql_native_password
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mysql_data:

networks:
  app-network:
    driver: bridge
```

## Environment Variables

Create a `.env` file:

```env
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=your_database
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the `.env` file with your credentials
3. Run: `docker-compose up -d`

## Best Practices

- Always use environment variables for sensitive data
- Use volumes for data persistence
- Enable healthcheck for container monitoring
- Set up proper networking
- Use specific version tags instead of `latest`