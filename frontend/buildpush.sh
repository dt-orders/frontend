#!/bin/bash

clear
if [ $# -lt 2 ]
then
  echo "missing arguments. Expect ./buildpush.sh <REPOSITORY> <VERSION_TAG>"
  echo "example:   ./buildpush.sh dtdemos 1"
  exit 1
fi

IMAGE=keptn-orders-frontend-node
REPOSITORY=$1
VERSION_TAG=$2
FULLIMAGE=$REPOSITORY/$IMAGE:$VERSION_TAG

docker build -t $FULLIMAGE .

echo ""
echo "========================================================"
echo "Ready to push $FULLIMAGE ?"
echo "========================================================"
read -rsp "Press ctrl-c to abort. Press any key to continue"

docker push $FULLIMAGE

