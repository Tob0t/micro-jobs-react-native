cd Database
mongod --dbpath="."
cd..
cd MicroServiceGateway
start node index.js
cd..
cd AuthorizationService
start node index.js
cd..
