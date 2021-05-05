#!/bin/bash

clear
REPOSITORY=$1
VERSION_TAG=$2

if [ -z "$REPOSITORY" ]
then
    REPOSITORY=dtdemos
fi

IMAGE=$REPOSITORY/dt-orders-frontend

echo ""
echo "========================================================"
echo "Building images"
echo "========================================================"
./writeManifest.sh
docker build -t $IMAGE:1 .
docker tag $IMAGE:1 $IMAGE:1.0.0

echo ""
echo "========================================================"
echo "Ready to push images ?"
echo "========================================================"
read -rsp "Press ctrl-c to abort. Press any key to continue"

docker push $IMAGE:1 
docker push $IMAGE:1.0.0

