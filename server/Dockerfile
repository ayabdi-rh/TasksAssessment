FROM node:20

# Set up the working directory
WORKDIR /app

RUN npm install

# Build your application if necessary
RUN npm run build

# Expose the port on which the application listens
EXPOSE 8080

# Start your application using the non-root user
CMD ["node", "dist/app/index.js"]