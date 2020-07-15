FROM node:12.16.2
WORKDIR /srv/app
CMD mkdir uploads
CMD git init
COPY package.json .
RUN NODE_ENV=development npm install --verbose
COPY . .
RUN npm run build
CMD npm start
