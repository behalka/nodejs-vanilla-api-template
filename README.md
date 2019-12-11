# STRV vanilla API template

## What's the goal here

- to try to explore the options of pure Javascript
- to try to leverage simple composition patterns over OOP
- to build a minimal API skeleton with as little magic as possible
  - with GraphQL server
  - without decorators
  - with the most transparent ORM I know of - Objection.js

## TODO - functionality

- simple 3-entities example (User, Event, Tag)
- fancy tags search to test ORM capabilities
- Nexus/Objection.js implementation
- generic pagination
- efficient DB/Repository mocks -> paralel tests

## More tests for the codebase

- Admin/User operation setup
- Validation (probably in operations)
-

## Feedback from Michal

- Injection example -> different impl. of findUser for admin and user operation
  - shared operation code
  - findUser repo call will implement some implicit restrictions
- Inject different validation schemas

- Typescript interfaces -> JUST like contracts between layers

  - try to include a reasonable amount of TS, stick with JS files maybe
  - without TS, there will be basically no intellisense in business logic files

- Prepare some basic methods for a repo and build them for every model-based repo
  - e.g basic "update" method
  - copy those methods to each "built" repo
  - that would require DI
