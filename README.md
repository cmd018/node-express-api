# Node Express API

Node express Backend API to save and retrieve user

- [Feature](#feature)
- [Development Environment Setup](#setup)

## Feature

A backend API (no front-end).

These are the 2 endpoints for the system:

1. User Signup Endpoint `/user`
   1. A `POST` endpoint, that accepts JSON, containing the user full name, password, email address, created date, and the user type (one of a student, teacher, parent or private tutor).
   1. Validation. The app checks that the fields submitted are not empty. The app should also check that the password matches the following rules:
      1. Between 8 and 64 characters
      1. Must contain at least one digit (0-9)
      1. Must contain at least one lowercase letter (a-z)
      1. Must contain at least one uppercase letter (A-Z)
   1. When validation fails the app should return an appropriate status code with error/s that can be used by the client
1. Save the signup information to a postgres data store
1. User Signup Details `/user/:id`
   1. A `GET` endpoint that takes a user ID and returns the user details as JSON.
1. TODO: testing and documentation you consider appropriate

## Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Ensure that Node.js, preferably version 16 or higher, is installed on your system, as this project utilizes the latest versions of TypeScript and Nodemon.
- [npm](https://www.npmjs.com/): npm is the package manager for Node.js and comes with the Node.js installation.
- [postgres](https://www.postgresql.org/): To install PostgreSQL.

### Installation

#### To setup your local Postgres database

- In the terminal assume postgres user: `sudo su postgres`
- Run psql: `psql`
- Create the RCIL database: `CREATE DATABASE tw;`
- Exit out of psql: `exit`

Clone the repository to your local machine:

Navigate to the directory:

```
cd node-express-api
```

Install the dependencies:

```
npm i
```

Run DB Schema and DB migrations:

```
npm run deploy:init-db
```

### Usage

In development the following command will start the server and use `nodemon` to auto-reload the server based on file changes

```
npm run dev
```

The server will start at `http://localhost:3000` by default. You can change the port in `src/index.ts`

There are no tests in the project at the moment, but a command is available to run:

```
npm run test
```

For creating DB migration run following command with migration name

```
npm run create-db-migration <NAME>
```

There are also commands to build and start a server without nodemon:

```
npm run build
npm start
```
