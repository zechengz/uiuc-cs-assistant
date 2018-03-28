# CS411-Project
2018 Spring CS411 Project - Fake Engineers

## Setup Guide
1. Install node modules (at least once): `npm install`
2. Run webpack-dev-server: `npm run dev`
3. Open [http://localhost:8080/](http://localhost:8080/) in the browser
4. `Ctrl-C` to stop server at anytime

## Existing Scripts
1. `npm run dev`

   Start webpack server in development mode.
   
   Should host in [http://localhost:8080/](http://localhost:8080/), trying port `8081` if port `8080` is occupied
2. `npm run build`

   Build the react app for production (or compile into static) under `public` folder

## Bundle all dependencies and publish website
1. Make sure `npm install` run at least once
2. Compile all dependencies: `./node_modules/.bin/webpack -d`
3. All files are in the folder `/public/`
