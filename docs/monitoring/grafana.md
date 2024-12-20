# Grafana Docker Compose Configuration

This guide provides a production-ready Grafana configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  grafana:
    image: grafana/grafana:10.0.3
    container_name: grafana
    restart: unless-stopped
    environment:
      GF_SECURITY_ADMIN_USER: ${GRAFANA_ADMIN_USER}
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_ADMIN_PASSWORD}
      GF_USERS_ALLOW_SIGN_UP: "false"
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    networks:
      - monitoring-network
    healthcheck:
      test: wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  grafana_data:

networks:
  monitoring-network:
    driver: bridge
```

## Environment Variables

Create a `.env` file:

```env
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=your_secure_password
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the `.env` file with your credentials
3. Run: `docker-compose up -d`
4. Access Grafana at `http://localhost:3000`

## Best Practices

- Use environment variables for configuration
- Set up proper authentication
- Configure data source provisioning
- Enable automatic dashboard provisioning
- Implement proper backup strategy