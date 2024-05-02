
docker compose down

docker container rm nest

docker image rm nest-app

docker compose up --watch

npx prisma db pull
npx prisma generate