# Use node.js image
FROM node:20

# Specify working directory
WORKDIR /usr/src/app

# Get node package manager going
COPY package*.json ./
RUN npm install

# Copy require content
COPY server.js ./

# Expose node.js port
EXPOSE 5000

# Initialize
CMD ["node", "server.js"]