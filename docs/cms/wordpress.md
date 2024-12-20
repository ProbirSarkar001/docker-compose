# Wordpress Docker Compose Configuration

This guide provides a production-ready Wordpress configuration using Docker Compose.

## Basic Configuration

```yaml

version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    container_name: wordpress
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: ${DB_USER}
      WORDPRESS_DB_PASSWORD: ${DB_PASSWORD}
      WORDPRESS_DB_NAME: ${DB_NAME}
    volumes:
      - wordpress_data:/var/www/html
    networks:
      - app-network

  db:
    image: mysql:5.7
    container_name: wordpress_db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - app-network

volumes:
  wordpress_data:
  db_data:

networks:
  app-network:
    driver: bridge
```

### Environment Variables
Create a `.env` file with the following content:
```env
DB_NAME=wordpress
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_ROOT_PASSWORD=your_root_password
```

### Usage
1. Save the configuration as `docker-compose.yml`.
2. Create the `.env` file with your credentials.
3. Run: `docker-compose up -d`.

### Best Practices
- Use environment variables for all sensitive data.
- Set up proper volume mounts for persistent data.
- Configure database connection properly.
- Use health checks for dependent services.
- Set up proper networking.
