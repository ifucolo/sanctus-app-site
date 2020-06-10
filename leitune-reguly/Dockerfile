FROM node:12.16.2
COPY package.json .
RUN NODE_ENV=development npm install
COPY . .
RUN npm run build
CMD npm start
