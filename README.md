# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

## Routes
  ### / (Login Page)
  redirects to /characters if user is logged.\
  ### /register (Register Page)

  Serves as register page but also performs logout.\

  ### /characters (List page)
  Redirects to detail page where more info about the character is displayed.\
  Responsive grid where set/remove favorite is enabled by clicking hearts.\
  ### /characters/:id (Detail Page)

  ### /someOtherPath (Not found Page)
