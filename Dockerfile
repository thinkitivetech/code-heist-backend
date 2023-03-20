# Use an official Node.js runtime as the base image
FROM node:16.15.1

# Create a new user with UID and GID of 1000
RUN groupadd -g 1000 myuser && \
    useradd -u 1000 -g 1000 -s /bin/bash myuser

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package*.json yarn.lock .env /app/

# Install dependencies
RUN npm install -g @nestjs/cli && yarn install

# Copy the rest of the application code to the container
COPY . /app/

# Change the owner of the application code to the new user
RUN chown -R myuser:myuser /app

# Switch to the new user
USER myuser 

# Expose the port that the application will listen on
EXPOSE 3000

# Define the command to run when the container starts
CMD ["yarn", "start"]
