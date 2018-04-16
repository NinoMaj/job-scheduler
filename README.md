## Table of Content

- [General](#general)
- [Todo](#Todo)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Env setup](#env-setup)

## General

This is Schedule Jobs app that allows users to add, remove and preview scheduled messages on slack channel.  
App can be found here [https://shrouded-ocean-55728.herokuapp.com/](https://shrouded-ocean-55728.herokuapp.com/)  
Join slack workspace [js-js-bot.slack.com](js-js-bot.slack.com) to see jobs scheduled from the app.  
Note: App is hosted on free heroku virtual machine that can be affected by cold start problem.  

## Todo
- [x] App scaffold
- [x] Table with four columns (message, channel, time, status)
- [x] Form for scheduling new jobs (message and time)
- [x] Possibility to delete jobs
- [x] Backend to server client app
- [x] API service for jobs handling
- [x] Data validation
- [x] Sending jobs to slack and updating jobs status
- [x] DB for data persistence
- [x] Notification system
- [x] Start of front-end tests
- [x] Background color change :)
- [ ] Error handling
- [ ] Finish front end test and make backend tests
- [ ] More robuts webpack config
- [ ] Full slack integration
= [ ] Edit jobs
- [ ] Enhance client notifications system (errors..)
- [ ] Use constants in CSS, for message... 


## Available Scripts

### `npm run dev` / `yarn dev`

Runs client in the development mode.<br>
Open [http://localhost:4100](http://localhost:4100) to view it in the browser.


### `npm run prod`

Builds the app for production to the `build` folder.<br>
Server is started on [http://localhost:3001](http://localhost:3001) and it will serve built client app. Open [http://localhost:3001](http://localhost:3001) in your browser to see the app.<br>

### `npm test` / `yarn test`

Launches the test runner in the interactive watch mode.<br>


## Env setup

To run app locally in root folder create .env file with URLs for MONGODB_URI and SLACK_WEBHOOK_URL keys.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).