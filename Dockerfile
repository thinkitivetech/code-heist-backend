# Use an official Node.js runtime as the base image
FROM node:16.15.1

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package*.json ./
COPY yarn.lock ./
COPY .env ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will listen on
EXPOSE 3000

# Define the command to run when the container starts
CMD ["yarn", "start"]
