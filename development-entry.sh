#!/bin/bash
if [ $NODE_ENV == "development" ] 
then
    echo "development mode running";
    npm run start:dev
else
    npm run start
fi