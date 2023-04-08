# Core Concepts of Redux.js for Beginners
This project aims at explaining the key concepts of Redux as a stand only library on Node.js Engine.

## Technologies
| Title | Description |
|-------|-------------|
| `Redux.js` | A predictable state container for the project |
| `Logger.js` | Middleware for displaying the transitioin of the redux state |
| `Axios.js` | A promised-based HTTP client for the project |
| `Redux-thunk.js` | A middleware that allows me to return dirty functions, rather than just actions, within Redux in the project |

## Installation
* clone the project `git clone https://github.com/malishben360/node_redux.git`
* move to the root folder `cd node_redux`
* install all neccessary dependencies `npm install`
* start the non async version run `nodemon`
* start the async version: change nodemon.json line 5 from "exec": "npx ts-node ./src/index.ts" to "exec": "npx ts-node ./src/reduxAsync.ts" and run `nodemon`

## Out Comes
* How to create Redux store using [legacy_createStore] function.
* Industry standard for creating Redux actions, reducers.
* How to subscribe to the Redux store to listen to state transitions.
* How to handle HTTP client promises and dispatch appropriate actions.

## Contributors
| Developer | Email Address | Social Handle |
|-----------|---------------|---------------|
| Elisha Benjamin | malishben360@gmail.com | https://linkedin.com/in/elisha-benjamin |