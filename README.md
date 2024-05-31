# Auction API

This project is a backend service for an auction platform, providing endpoints for users, items, bids, and notifications. The project uses Node.js, Express, and Sequelize for database management, and Socket.io for real-time bid notifications.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
  - [Users](#users)
  - [Items](#items)
  - [Bids](#bids)
  - [Notifications](#notifications)
- [Testing](#testing)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (v6 or later)
- MySQL

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/auction-api.git

2. Install the dependencies: 
-  npm install
-  npm install --save-dev jest supertest @types/jest @types/supertest
-  npm install socket.io
-  npm install express
-  npm install dotenv
-  npm install bcrypt
-  npm install cors
-  npm install jsonwebtoken
-  npm install sequelize
-  npm install eslint
-  npm install express-rate-limit
-  npm install 

## Running the Project
1. CREATE DATABASE auction_db;
2. Start the MySQL server if it is not already running.
3. Run the migrations to create the necessary tables:npx sequelize-cli db:migrate
4. Start the server:npm start (!--The server should be running on http://localhost:3000.)

## API Documentation

https://docs.google.com/document/d/1nnWOkZZBbqogycTilBZha2JxOvoGrX4OE27n4IfB69Q/edit


## Testing

- npm test