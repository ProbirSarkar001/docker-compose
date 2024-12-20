# Prometheus Docker Compose Configuration

This guide provides a production-ready Prometheus configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:v2.45.0
    container_name: prometheus
    restart: unless-stopped
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    networks:
      - monitoring-network
    healthcheck:
      test: wget --no-verbose --tries=1 --spider http://localhost:9090/-/healthy || exit 1
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  prometheus_data:

networks:
  monitoring-network:
    driver: bridge
```

## Configuration File

Create `prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the prometheus configuration file
3. Run: `docker-compose up -d`

## Best Practices

- Configure retention policies
- Set up alerting rules
- Use service discovery
- Implement proper security measures
- Monitor Prometheus itself