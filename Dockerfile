FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 7077

CMD ["node", "app.js"]