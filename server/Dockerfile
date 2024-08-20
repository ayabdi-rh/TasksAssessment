# Use the specific Node.js image
FROM node:20@sha256:cb7cd40ba6483f37f791e1aace576df449fc5f75332c19ff59e2c6064797160e

# Set up the working directory
WORKDIR /app

# Install your application's dependencies including Puppeteer
RUN npm install

# Build your application if necessary
RUN npm run build

# Expose the port on which the application listens
EXPOSE 8080

# Start your application using the non-root user
CMD ["node", "dist/app/index.js"]