# Redis & MongoDB

## MongoDB Setup using docker
- In this app I use mongodb database using docker.
  ``` bash
  docker run -d -p 20111:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoredis -e MONGO_INITDB_ROOT_PASSWORD=mongoredis123 --name mongo-redis-cont -v mongo-data:/data/db mongo
  ``` 
  - Here I expose port 20111 in localhost and bind the port with container port which is 27017
  - Here user name is `mongoredis` and password is `mongoredis123`
  - Here Container name is `mongo-redis-cont`
  - and  volume name is `mongo-data`
  ``` bash 
  docker stop mongo-redis-cont # stop docker container
  docker start mongo-redis-cont # start docker container
  docker rm mongo-redis-cont # Delete container from docker
  docker volume rm mongo-data # Delete volume created by mongodb container
  ```