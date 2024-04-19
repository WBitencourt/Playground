
new_version=$(npm version patch)

docker image build -t docker-playground-image:$new_version .

docker container run -d -p 3333:3000 --name docker-playground-container-$new_version docker-playground-image:$new_version
