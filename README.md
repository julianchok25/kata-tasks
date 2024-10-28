# Kata - Task Management

## Local Installation

Frontend and Backend requires [Node.js](https://nodejs.org/) v20+ to run.

Install the dependencies and start the server on **each terminal**.

**New Terminal 1**
```sh
cd backend
npm i
npm run dev
```

**New Terminal 2**
```sh
cd frontend
npm i
npm run dev
```
## Tech Stack
* Node.js v20+
* ExpressJs
* MongoDB
* ReactJs
* Typescript
* Jest

## Default Ports
* backend: 3000
* frontend: 5173

## Routes
* Only base path /
    * The same path includes `Login Page` and `Home Page`

## Pages
1. Login
    * Access with any username and password and it's saved in session storage.
    * Logout from top left button header to close the session or close the tab on Navigator.

2. Home
    * Contains the Create Task, List Task, Edit Task and Delete Task component.
        * These Routes are protected with Auth token Mock when user is logged in