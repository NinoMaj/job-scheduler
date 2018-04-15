## Table of Contents

- [General](#general)
- [Todo](#Todo)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)

TODO:
  [] handle error from validators
  [] impove validation https://github.com/ctavan/express-validator#schema-validation schema

## General

Schedule jobs that will be posted on slack channel.<br>
App can be found here <br>
Note: App is hosted on free now.js virtual machine which is impacted be cold start problem.<br>
Join slack workspace js-js to see jobs scheduled from the app.<br>

## Todo
- [x] App scaffold
- [x] Tabel with four columns (message, channel, time, status)
- [x] Form for scheduling new jobs
- [x] Possibility to delete jobs
- [x] Backend to server client app
- [x] API service for jobs handling
- [x] Data validation
- [x] Sending jobs to slack and updating jobs status
- [x] DB for data persistence
- [x] Notification system
- [x] Basic tests
- [ ] Background change
- [ ] Error handling
- [ ] More tests
- [ ] More robuts webpack config
- [ ] Better client notifications system (errors..)

## Available Scripts

### `npm run dev` / `yarn dev`

Runs client in the development mode.<br>
Open [http://localhost:4100](http://localhost:4100) to view it in the browser.


### `npm run prod`

Builds the app for production to the `build` folder.<br>
Server is started on [http://localhost:3001](http://localhost:3001) and it will server built client app.<br>

### `npm test` / `yarn test`

Launches the test runner in the interactive watch mode.<br>

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
