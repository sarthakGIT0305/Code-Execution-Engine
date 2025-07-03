# Use Node base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build production version
RUN npm run build

# Install serve to host the build folder
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]
