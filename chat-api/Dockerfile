FROM node:14

# Create app directory
WORKDIR /app

# Install nodemon for hot reload
RUN npm install -g nodemon

EXPOSE 80
CMD [ "nodemon", "index.js" ]
