FROM node:16

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

# only executed when container is started and tag command compose.yaml is not provided
# CMD [ "npm", "run", "start:dev" ] 
