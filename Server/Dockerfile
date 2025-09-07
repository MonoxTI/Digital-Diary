# Use official Node.js runtime as base
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json (and package-lock.json if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Start the bot (server.js instead of index.js)
CMD ["node", "server.js"]
