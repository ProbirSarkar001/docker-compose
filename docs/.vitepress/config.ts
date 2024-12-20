import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Docker Compose Guide",
  description: "Production-ready Docker Compose configurations for modern applications",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Databases', link: '/databases/mysql' },
      { text: 'Monitoring', link: '/monitoring/prometheus' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Best Practices', link: '/guide/best-practices' }
        ]
      },
      {
        text: 'Databases',
        items: [
          { text: 'MySQL', link: '/databases/mysql' },
          { text: 'PostgreSQL', link: '/databases/postgresql' },
          { text: 'MongoDB', link: '/databases/mongodb' },
          { text: 'MariaDB', link: '/databases/mariadb' }
        ]
      },
      {
        text: 'Cache & Queue',
        items: [
          { text: 'Redis', link: '/cache/redis' },
          { text: 'Memcached', link: '/cache/memcached' },
          { text: 'RabbitMQ', link: '/cache/rabbitmq' }
        ]
      },
      {
        text: 'CMS',
        items: [
          { text: 'Directus', link: '/cms/directus' },
          { text: 'WordPress', link: '/cms/wordpress' },
          { text: 'Strapi', link: '/cms/strapi' }
        ]
      },
      {
        text: 'Search Engines',
        items: [
          { text: 'Elasticsearch', link: '/search/elasticsearch' },
          { text: 'Meilisearch', link: '/search/meilisearch' }
        ]
      },
      {
        text: 'Monitoring',
        items: [
          { text: 'Prometheus', link: '/monitoring/prometheus' },
          { text: 'Grafana', link: '/monitoring/grafana' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/docker-compose-docs' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023'
    }
  }
})