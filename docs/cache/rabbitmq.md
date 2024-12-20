# RabbitMQ Docker Compose Configuration

This guide provides a production-ready RabbitMQ configuration using Docker Compose.

## Basic Configuration

```yaml
version: '3.8'

services:
  rabbitmq:
    image: rabbitmq:3.12-management-alpine
    container_name: rabbitmq
    restart: unless-stopped
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_USER}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD}
    ports:
      - "5672:5672"   # AMQP protocol
      - "15672:15672" # Management interface
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - app-network
    healthcheck:
      test: rabbitmq-diagnostics -q ping
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  rabbitmq_data:

networks:
  app-network:
    driver: bridge
```

## Environment Variables

Create a `.env` file:

```env
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=your_password
```

## Usage

1. Save the configuration as `docker-compose.yml`
2. Create the `.env` file with your credentials
3. Run: `docker-compose up -d`
4. Access the management interface at `http://localhost:15672`

## Best Practices

- Enable SSL/TLS in production
- Set up proper queue mirroring
- Configure message persistence
- Monitor queue lengths
- Implement dead letter exchanges