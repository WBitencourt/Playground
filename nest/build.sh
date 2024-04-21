
new_version=$(npm version patch)

docker image build -t docker-nest-backend-image:$new_version .

docker container run -d -p 3333:3000 --name docker-nest-backend-container-$new_version docker-nest-backend-image:$new_version