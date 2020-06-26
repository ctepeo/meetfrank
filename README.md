# Meetfrank Chat

Initial config, everything needs to be installed:

`cp .env.example .env && cd ./chat-api && npm i && cd ../chat-app && npm i`

Run backend as 

`docker-compose up`

Then run FE part as

`cd ./chat-app && npm run dev`


Navigate to `http://127.0.0.1:8080` to get the React app, backend is available at `http://127.0.0.1:8888`
