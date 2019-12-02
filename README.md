# Node-React-Books

## 1 - Start the Mongo server (make the drive you're on has "/data/" at the root and is writable)
#### mongod
## 2 - Create database and import collections
#### mongoimport -d Books -c authors authors.json
#### mongoimport -d Books -c books books.json
#### mongoimport -d Books -c comments comments.json

## 3 - Start Backend server
#### cd ./backend/ 
#### npm install
#### nodemon server

## 4 - Start Frontend Server
#### cd ./frontend/ 
#### npm install
#### npm start

Go to http://localhost:3000/

