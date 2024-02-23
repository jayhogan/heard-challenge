# heard-challenge

Here is my version of the [Heard Take Home Assessment](https://github.com/Heard-Mental-Health/heard-technical-assessment).

## Tech Stack

### Frontend

- React
- Typescript
- Ant Design
- Fetch

### Backend

- NestJS
- Prisma
- class-validator
- Sqlite

## Running the app

### Backend
- Open a terminal and switch to the `backend` directory
- Run `yarn` or `npm install` to fetch dependencies
- Create a `.env` file in `backend` directory and add `DATABASE_URL="file:./dev.sqlite"` to the file
- Run `yarn prisma migrate dev` or `npx prisma migrate dev` to create the database, migrate to latest schema version and seed with sample data
- Run `yarn run dev` or `npm run dev` to start the backend service

## Frontend
- Open a terminal and switch to the `frontend` directory
- Run `yarn` or `npm install` to fetch dependencies
- Run `yarn run dev` or `npm run dev` to start the frontend service
- Open your browser to [localhost:5173](http://localhost:5173) or whatever URL is listed in the terminal (in case of a port clash)

