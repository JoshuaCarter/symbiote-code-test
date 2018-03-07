# Symbiote Code Test
###### Joshua Carter
---

## Introduction
This is my submission for the Symbiote developer exercise.

I took this challenge as an excuse to learn several new things. As a result, this challenge was as much a learning exercise as it was test, so I've spent more time on the project than is expected. I hope that the results justify the time expenditure.

This is the first time I have used redux, express sessions, or done any user authentication. It is the second time that I have user react and nodejs. As a result, this was a sizeable undertaking for me, ultimately taking me ~30 hrs to complete in total.

---
## Tools Used

##### React with Redux
Chosen for its applicability to the position. I believe I have made proper use of redux reducers and actions (with thunk).

##### Bootstrap 4 with [reactstrap](https://reactstrap.github.io/components/alerts/)
I opted to use a styling framework for this project for presentation's sake, and because my website is already styled without any framework.

##### NodeJs and Express
I chose to use nodejs as part of my ongoing attempt to widen my skill set. An example of a PHP backend can be found [here](https://github.com/JoshuaCarter/sidekicker-code-test).

##### axios, cors, express-session, redux-thunk.
http client and middleware tools.


---
## Running the Production Build
- Pull this repo wherever you like.
- Run `init.sh`. This will run `npm install` on the backend and frontend, and then build the react project using `npm run build`.
- Run `serve_nodejs.sh`. This will serve the nodejs project with nodemon.
- Run `serve_react.sh`. This will serve the react build with npm.
- Your browser should automatically open a new tab and navigate to the react build on `localhost:3000`.

---
## Running the Source Code
- Run `init.sh` if you haven't already.
- Open the `symbiote-code-test` folder in your preferred IDE.
- Run `cd backend && nodemon start` to serve the nodejs project.
- Run `cd frontend && npm start` to serve the react project.

---
Thank you for your time.