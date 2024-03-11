# README

README for the Take-Home Assignment

## Overview

The repository is a monorepo containing both the frontend and backend code for the assignment.

## Running the application

### Backend

_note that you will need to update the .env file with the appropriate DATABASE_URL before running the application_

cd to /backend and run the following:

1. `npm install`
2. `npm run migrate`
   1. This sets up the prisma database
3. `npm run seed`
   1. This seeds the prisma database with the csv file of staff members (long)
4. `npm run dev`

### Frontend

cd to /frontend and run the following:

1. `npm install`
2. `npm start`

## More about the implementation…

### Backend

The backend is implemented using express, node, prisma (as an ORM), using a PostgresSQL database.

### Frontend

The frontend consists of a single page built using React

### Assumptions made

The application assumes the following:

1. IDs are no longer than 24 characters long (causes issues with Prisma when storing it as primary key)
2. The user will go through the flow of:
   1. Checking ID and retrieving team name → Checking if team is available for redemption → Completing redemption
   2. This is enforced on the frontend by disabling certain buttons
   3. An alternative flow may be that: The user wants to key in the team name directly
      1. In this case, a separate input field would have to be created and validation that the team name is correct (incl. a query unto the backend) will have to be done.

### Video demo

Link[https://youtu.be/EIdDuqQXmB0]
