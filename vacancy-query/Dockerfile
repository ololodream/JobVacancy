FROM node:14

WORKDIR /usr/src/vacancy-query

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "run", "start" ]