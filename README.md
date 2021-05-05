# Overview

This repo has the code for a simple Node Express frontend application for demostrations.  

The frontend serves the home page and acts as a proxy too the backend functionality for orders, catalog, and customer services.

See the [overview](https://github.com/dt-orders/overview) repo for an overiew for that whole application.

The frontend supports both the monolith and non-monolith backends. Set an environment variable `MONOLITH=true` to be in monolith mode which will serve a a different index HTML page with adjusted URL paths.

# URL reference

| url | type | description |
|-----|------|-------------|
| / | GET | home page|
| manifest | GET | show the DOCKER image manifest file |
| backend/manifest | GET | show the backend service DOCKER image manifest file |
| backend/setversion/# | GET | set the backend service version e.g. backend/setversion/1 |
| backend/version | GET | show the version |

# Developer Notes

For the frontend to call the backend services locally, the ports and IP of these services needs to be passed into Docker as environment variables -AND- the orders, catalog, and customer services must be listening on the ports defined in this script.

## Run Application and all services locally

To use pre-build or locally build images to start the entire application, see the [[overview](https://github.com/dt-orders/overview) repo for a `docker-compose` file you can use.

## Run front end application from code

    ```
    cd frontend
    npm install
    DEBUG=frontend:* npm start
    ```

## Build Docker images and run locally 

Use the provided Unix shell script that will build the frontend docker image and run it. 

    Just call: `./buildrun.sh <MONOLITH> <REPOSITORY> <VERSION_TAG>`

    For example run as monolith:

    ```
    cd frontend
    ./buildrun.sh true dtdemos 1
    ```

2. access application at ```http://localhost```

## Build Docker Images and push images to a repository

Use the provided Unix shell script that will build the frontend docker image and publish it. 

    Just call: `./buildpush.sh <REPOSITORY>`

    For example:

    ```
    cd frontend
    ./buildpush.sh dtdemos
    ```

# Credits

* Original demo code: https://github.com/ewolff/microservice-kubernetes
* CSS: https://www.w3schools.com/w3css/tryw3css_templates_clothing_store.htm
* Order Image: https://www.pexels.com/photo/five-people-standing-against-wall-1345082/
