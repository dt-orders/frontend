#!/bin/bash

MONOLITH=$1
REPOSITORY=$2
VERSION_TAG=$3

if [ -z "$MONOLITH" ]
then
    MONOLITH=false
fi

if [ -z "$REPOSITORY" ]
then
    REPOSITORY=dtdemos
fi

if [ -z "$VERSION_TAG" ]
then
    VERSION_TAG=1
fi

IMAGE=dt-orders-frontend
FULLIMAGE=$REPOSITORY/$IMAGE:$VERSION_TAG

echo "Building: $FULLIMAGE"
docker build -t $FULLIMAGE .

echo ""
echo "=============================================================="
echo "Running $FULLIMAGE with Monolith = $MONOLITH"
echo "=============================================================="
echo ""
echo "access app @ http://localhost"
echo "" 
docker run -it -p 80:8080 \
  --env CUSTOMER_URL=http://172.17.0.1:8181 \
  --env CATALOG_URL=http://172.17.0.1:8182 \
  --env ORDER_URL=http://172.17.0.1:8183 \
  --env MONOLITH=$MONOLITH \
  $FULLIMAGE 

