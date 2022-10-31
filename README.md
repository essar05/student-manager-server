# student-manager-server

## Description

REST API server implementation for student-manager client apps done with [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

## Setup

A .env file needs to created with the environment variables defined. Use .env.template for the template

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations

```bash
# generate migrations
$ npm run typeorm:generate-migration

# run migrations
$ npm run typeorm:run-migrations

# revert migrations
$ npm run typeorm:revert-migrations
```

Generated migrations are found under `./migrations/` and must be included in `./src/data-source.ts` in order for the run
script to pick them up 