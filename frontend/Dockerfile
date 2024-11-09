FROM node:14-alpine

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

CMD ["npm", "start"]
