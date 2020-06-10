FROM node:12
COPY package.json .
RUN NODE_ENV=development npm i
COPY . .
RUN npm run build
CMD npm start
