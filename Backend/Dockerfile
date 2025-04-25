FROM node:18-alpine

# Create app directory
WORKDIR /app

COPY package.json package-lock.json ./
# Install app dependencies
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm","run"]