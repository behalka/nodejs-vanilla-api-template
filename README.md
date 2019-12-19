# STRV vanilla API template

## What's the goal

- to try to explore the options of not-so-OOP Typescript (pure JS version also available)
- to try to leverage simple composition patterns over OOP
- to build a minimal API skeleton with as little magic as possible
  - with GraphQL server
  - without decorators
  - with the most transparent ORM I know of - Objection.js

## Run it

- `$ docker-compose up -d`
- database: make sure to create `vanilla-template-db` and `vanilla-template-db-test` databases
- create your `.env` file following `.env.example`
- and then:

```bash
  $ make migrate
  # runs the initial migration
  $ make seed
  # optional :)
  $ make run
  # starts the API on default port
```

```bash
  $ make migrate-test
  # prepares DB for integration tests
  $ make test
  # hopefully runs the tests suite 🤖
```

## Functionality/examples

- simple 3-entities example (User, Event, Tag)
- fancy tags search to test ORM capabilities
- Nexus/Objection.js implementation
- generic pagination
- efficient DB/Repository mocks -> paralel tests
- Dataloader
- Admin/User operation setup
- Validation in operations
- Authorization/user roles (todo)
- mocks: maybe mocked repos must have different outputs on first/second call
  - might work to add sinon mocks there (can program it to return different things on each call)
- errors, error handlers
- seed files in tests/helpers (todo)
