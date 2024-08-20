FROM node:20

# Set up the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your application if necessary
RUN npm run build

# Expose the port on which the application listens
EXPOSE 8080

# Start your application using the non-root user
CMD ["node", "dist/app/index.js"]