#!/bin/sh

docker compose down
docker container rm nest
docker image rm nest-app
docker compose up --watch