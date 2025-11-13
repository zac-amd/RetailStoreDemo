# RetailStore-Demo

A lightweight microservices demo showing a Java Spring Boot Product Service and a Python FastAPI Pricing Service. The services communicate over REST and run with Docker Compose using PostgreSQL containers. A simple React frontend shows products and requests prices.

## Services

- **Product Service** (Java / Spring Boot) — port **8080**
  - CRUD products
  - Endpoint to fetch product price by calling Pricing Service

- **Pricing Service** (Python / FastAPI) — port **8000**
  - Simple pricing logic (demo)

- **Frontend** (React + Vite) — port **5173** (development server)

## Requirements

- Docker & Docker Compose
- (Optional) Java and Maven if you want to build locally, but Docker multi-stage build will run Maven inside the builder stage.

## Run locally

From the project root:

```bash
docker-compose up --build
```

Wait for services to start. You can then:

1. Create a product (example):
```bash
curl -X POST http://localhost:8080/products -H "Content-Type: application/json" -d '{"name":"T-Shirt","category":"Apparel","basePrice":29.99}'
```

2. Get product list:
```bash
curl http://localhost:8080/products
```

3. Get product price (calls pricing service):
```bash
curl http://localhost:8080/products/1/price
```

4. Open frontend: http://localhost:5173 and click "Get Price" for a product.

## Notes & Extensions

- The Product service uses `spring.jpa.hibernate.ddl-auto=update` for demo ease. For production use explicit migrations (Flyway / Liquibase).
- Optional improvements: add Redis caching for prices, use Kafka for price update events, secure endpoints with JWT, or add a React production build served by nginx.
