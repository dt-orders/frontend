# Overview

This repo has the code for a simple Node Express application for demostrations.  

The application serves the front end HTML and acts as a proxy too the backend functionality for orders, catalog, and customer services.

The overall application is made up of 4 components: a front-end and 3 backend services.  The front-end look like this.

<img src="images/orders.png" width="300"/>

Once monitored by Dynatrace, a multi-tier call flow will be available such as shown below.

<img src="images/dt-call-flow.png" width="500"/>

Footnotes:
* Demo app credits go to: https://github.com/ewolff/microservice-kubernetes
* css from: https://www.w3schools.com/w3css/tryw3css_templates_clothing_store.htm
* image from: https://www.pexels.com/photo/five-people-standing-against-wall-1345082/

# Developer Notes

## Run Application and All Services Locally

To use pre-build or locally build images to start the entire application, just run `docker-compose up` to start all the services.  It takes about 45 seconds to start, but then the application can be accessed on port 80 at ```http://localhost```.  You can adjust the `docker-compose.yaml` for alternate ports and images names to meet your needs.

## Build Docker Images and Run Locally 

Use the provided Unix shell scipt that will build the frontend docker image and run it. For the frontend to call backend services locally, the ports and IP of these services needs to be passed into Docker as environment variables -AND- the orders, catalog, and customer services must be listening on the ports defined in this script.

    Just call: `./buildrun.sh <REPOSITORY> <VERSION_TAG>`

    For example:

    ```
    cd frontend
    ./buildrun.sh dtdemos 1
    ```


2. access application at ```http://localhost```

## Build Docker Images and Push Images to a repository

Use the provided Unix shell scipt that will build the frontend docker image and publish it. 

    Just call: `./buildpush.sh <REPOSITORY> <VERSION_TAG>`

    For example:

    ```
    cd frontend
    ./buildpush.sh dtdemos 1
    ```

