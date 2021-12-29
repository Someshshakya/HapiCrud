# HapiCrud

## Requirement
	Node Version v14.17.0 

## Install
	npm install

## Configure app
- Create .env file and set all evironment variables
```sh

#------------------------------------------------#
#==================== Defualt ===================#
#------------------------------------------------#
NODE_ENV=development
PROCESS_TYPE=web
PORT=3821
JWT_KEY="your key"
VERSION='/v1'

DEFAULT_LANGUAGE='en'
LANGUAGES='en,es,hi'




#------------------------------------------------#
#==================== Mongodb ===================#
#------------------------------------------------#

MONGO_DATABASE="dbName"
MONGODB_URL = <MongodbUrl_here>


#------------------------------------------------#
#==================== Redis ===================#
#------------------------------------------------#
REDIS_PORT=6379





- change env file path in - "index.js"
 
## Running the server

Go ahead and run ***npm start*** or ***node index.js*** to start the server.
Now you can navigate to <http://localhost:3821/documentation> to see the swagger documentation. 