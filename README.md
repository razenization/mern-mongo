## Available Scripts

In the project directory, you can run:

### `npm dev`

Runs both server and cli in the development mode.
The commands which are being executed are `npm run server` and `npm run client`.
They are being served via `concurrently` library to ensure their multithreading.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm start:prod`

Runs the app in the production mode.

### `npm client`

Runs the client only (front-end).

### `npm client:build`

Builds client.

### `npm client:install`

Runs npm install in the client directory to install all the packages necessary.

### `npm server`

Runs server via nodemon to dynamically reload.

## Deploy address

This project is deployed on heroku and can be accessed through the following address:
[https://mern-mongo.herokuapp.com/](https://mern-mongo.herokuapp.com/)