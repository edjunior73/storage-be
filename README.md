# Files Storage

## Description

Project using the [NestJS](https://github.com/nestjs/nest) framework with TypeScript.

## Installation

```bash
yarn
```

or

```bash
yarn install
```

## Running the application

### Running locally (without Docker)

```bash
yarn db:migrate
yarn dev
```

### Running in development mode with Docker

```bash
yarn docker-dev-up
```

### Running in production mode with Docker

```bash
yarn docker-up
```

## Testing

```bash
# Unit tests
yarn test

# Integration tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## API Documentation

You can access the Swagger documentation at `{server_address}/docs`.

