# MariaDB Docker Compose Configuration

This guide provides a production-ready MariaDB configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  mariadb:
    image: mariadb:10.11
    container_name: mariadb
    restart: unless-stopped
    environment:
      MARIADB_ROOT_PASSWORD: ${MARIADB_ROOT_PASSWORD}
      MARIADB_DATABASE: ${MARIADB_DATABASE}
      MARIADB_USER: ${MARIADB_USER}
      MARIADB_PASSWORD: ${MARIADB_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - mariadb_data:/var/lib/mysql
      - ./mariadb/init:/docker-entrypoint-initdb.d
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mariadb_data:

networks:
  app-network:
    driver: bridge
```

## Environment Variables

Create a `.env` file:

```env
MARIADB_ROOT_PASSWORD=your_root_password
MARIADB_DATABASE=your_database
MARIADB_USER=your_user
MARIADB_PASSWORD=your_password
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the `.env` file with your credentials
3. Run: `docker-compose up -d`

## Best Practices

- Use environment variables for sensitive data
- Enable binary logging for replication
- Configure proper character set and collation
- Set up regular backups
- Monitor performance metrics