# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]


To build and run the Docker image, follow these steps:

    Open a terminal in the root directory of your Node.js project.
    
    Run the following command to build the Docker image (replace <image-name> with your desired image name):

           -- docker build -t <image-name> .
   
    Once the image is built, you can run a Docker container using the following command (replace <container-name> with your desired container name):
    
           -- docker run -d -p 3000:3000 --name <container-name> <image-name>
           
    This command runs the Docker container in detached mode (-d), maps port 3000 of the host to port 3000 of the container (-p 3000:3000), and assigns a name to the container (--name <container-name>).
    
    Now, your Node.js application should be running inside a Docker container. You can access it using localhost:3000 in your web browser or make API requests to it as usual.