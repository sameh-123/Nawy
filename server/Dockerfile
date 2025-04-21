FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY tsconfig.json ./

EXPOSE 5000
CMD ["npm", "start"]
