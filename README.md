# devices-api

## Description

REST API using [NestJS](https://github.com/nestjs/nest) framework

## Running inside docker

The project is containerized and can be run via [`docker-compose.yaml`](docker-compose.yaml)

```bash
docker compose up
```

## Running locally

The project uses [Node.js v22](https://nodejs.org/en/download) and dependencies are managed via [pnpm](https://pnpm.io/)

The application will need to connect to PostgreSQL, which can be provisioned from the [`docker-compose.yaml`](docker-compose.yaml) if necessary.

### Project setup

```bash
# Configuring locally

npm i -g corepack@latest;

corepack enable pnpm;

corepack use pnpm@latest-10;

pnpm install;
```

### Environment variables

The necessary environment variables are listed at [`.env.example`](.env.example)

```bash
# Creating the '.env' file based on '.env.example'
cp .env.example .env
```

### Transpile and run the project

```bash
# Development mode
pnpm run start;

# Watch mode
pnpm run start:dev;

# Production mode
pnpm build;
pnpm run start:prod;
```

### Run tests

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## Documentation

Given the default port (`3005`) for running the application, the API documentation is available at [localhost:3005/docs](http://localhost:3005/docs)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
