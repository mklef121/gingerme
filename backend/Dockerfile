# Use an official Node.js runtime as a parent image
FROM node:alpine

WORKDIR /app

RUN chown -R node:node /app

COPY package*.json ./


RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD [ "npm", "start" ]