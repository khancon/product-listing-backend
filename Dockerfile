# Step 1: Use an official Node.js runtime as a parent image
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy application source code, including db.json
COPY . .

# Step 6: Build the TypeScript code
RUN npm run build

# Step 7: Expose the application port
EXPOSE 3000

# Step 8: Define the command to start the app
# CMD ["node", "dist/server.js"]
CMD ["npm", "start"]


# Building docker image: docker build -t product-listing-backend .
# Running docker container: docker run -p 3000:3000 product-listing-backend
# Runnind docker container w/ volume mount: docker run -p 3000:3000 -v $(pwd)/db.json:/app/db.json product-listing-backend
# Check running containers: docker ps
# Reattach to a container: docker attach <container-id>
# Stop a container: docker stop <container-id>
# Exec into contianer: docker exec -it <container-id> /bin/sh
# Stop the first container in docker ps list: docker stop $(docker ps -q | head -n 1)


