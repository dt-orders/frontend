FROM node:16

# used to control the path used
ARG MONOLITH=false
ENV MONOLITH=$MONOLITH

# set NODE_ENV=dev for http access logging
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# override express default port of 3000
ENV PORT=8080

CMD ["sh", "-c", "cat public/MANIFEST && npm start"]
