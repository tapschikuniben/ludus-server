FROM node:latest

WORKDIR /opt/ludus_web_api/backend/ludus-server

COPY package.json /opt/ludus_web_api/backend/ludus-server/

RUN npm install

COPY . /opt/ludus_web_api/backend/ludus-server

EXPOSE 3000
CMD [ "node", "app.js" ]