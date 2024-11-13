FROM node:23
WORKDIR /app

# Install Git
RUN apt-get update

# Copy Node.js application files
COPY . /app

# Install dependencies
# RUN npm install

EXPOSE 3000
CMD ["node", "index.js"]
