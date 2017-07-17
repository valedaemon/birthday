# Birthday Food Checker!
Welcome to the BFC, a handy tool that checks common birthday-related foodstuffs against the FDA to determine what kinds of food you should avoid.

## Technology:

The BFC is written in Vue 2 for the frontend and Feathersjs on the backend.

## How to Run BFC in Development Mode
1. Get MongoDB up and running locally (preferably 3.2).
2. Once Mongo is running, start the backend by issuing the command

`npm start`

3. Once that's going, start up the frontend with

`npm run dev`

4. At that point, a browser should start up, showcasing the site!

## How to Run BFC in Production Mode
1. Make sure MongoDB is up and running.
2. Right now, BFC is still set up to run on localhost. If you want to run it in the cloud, modify the configs in 
/client/config and /server/config to point to your new host.
3. Change the production URL in /client/src/services/index.js and point it to the new host.
4. Make sure you have Docker installed. Once done, issue the command

`./buildrun.sh`

5. That pulls down the docker image for pm2-docker I wrote and starts it up.
6. Browse to the new site over port 80.