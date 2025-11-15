FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g typescript nodemon

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]