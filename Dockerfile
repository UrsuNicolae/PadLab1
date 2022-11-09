FROM node:16
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 8000
COPY . .
ENV NODE_ENV=production
CMD [ "node", "index.js" ]