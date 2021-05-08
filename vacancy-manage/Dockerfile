FROM node:14

WORKDIR /usr/src/vacancy-manage

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start" ]