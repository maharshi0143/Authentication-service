# Authentication Service

A secure, fully containerized, production-ready RESTful authentication service built with Node.js, Express, PostgreSQL, and Redis. This service provides robust user management including local and OAuth 2.0 authentication, Role-Based Access Control (RBAC), and stateless session management via JWT.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Testing & Verification](#testing--verification)

## Features

### Authentication & Authorization
- **Local Authentication**: Secure email/password login using Bcrypt for password hashing.
- **OAuth 2.0**: Integrated support for Google and GitHub authentication flows.
- **JWT Implementation**: Short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d) with secure rotation.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions with 'user' and 'admin' roles.
- **Rate Limiting**: Brute-force protection on auth endpoints (limit: 10 requests/minute).

### Infrastructure
- **Containerization**: Full Docker support for App, Database, and Cache services.
- **Database**: PostgreSQL with automatic schema migration and seeding.
- **Cache**: Redis for high-performance data caching (ready for session/token management).
- **Health Checks**: Built-in health check endpoints for container orchestration.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL 13
- **Cache**: Redis 6.2
- **Containerization**: Docker & Docker Compose

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd auth-service
   ```

2. **Configure Environment**
   Duplicate the example environment file:
   ```bash
   cp .env.example .env
   ```
   *Note: Detailed configuration options are available in the [Configuration](#configuration) section.*

3. **Start the Application**
   Build and start all services using Docker Compose:
   ```bash
   docker-compose up --build -d
   ```

4. **Verify Deployment**
   Check the status of the containers:
   ```bash
   docker-compose ps
   ```

## Configuration

The application is configured via environment variables in the `.env` file.

| Variable | Description | Default / Example |
|----------|-------------|-------------------|
| `API_PORT` | Port for the API server | `8080` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@db:5432/auth_service` |
| `REDIS_URL` | Redis connection string | `redis://cache:6379` |
| `JWT_SECRET` | Secret for signing Access Tokens | `your-secret-key` |
| `JWT_REFRESH_SECRET` | Secret for Refresh Tokens | `your-refresh-secret` |
| `GOOGLE_CLIENT_ID` | OAuth Client ID for Google | `...` |
| `GITHUB_CLIENT_ID` | OAuth Client ID for GitHub | `...` |

## API Documentation

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login with email/password | No |
| `POST` | `/api/auth/refresh` | Refresh access token | No |
| `GET`  | `/api/auth/google` | Initiate Google OAuth | No |
| `GET`  | `/api/auth/github` | Initiate GitHub OAuth | No |

### User Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET`  | `/api/users/me` | Get current user profile | Yes |
| `PATCH`| `/api/users/me` | Update current user profile | Yes |
| `GET`  | `/api/users` | List all users (Admin only)| Yes (Admin) |

### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/health` | Service health status |

## Testing & Verification

### Automated Verification Script
A Node.js script is included to verify all core functionalities:
```bash
node tests/verify.js
```

### Manual Testing Credentials
The database is automatically seeded with the following accounts:

**Admin User**
- **Email**: `admin@example.com`
- **Password**: `AdminPassword123!`

**Regular User**
- **Email**: `user@example.com`
- **Password**: `UserPassword123!`

---
Project structure follows standard MVC pattern with separated Services, Controllers, and Routes for maintainability and scalability.
