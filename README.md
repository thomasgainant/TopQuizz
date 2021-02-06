# TopQuizz

## Overview
This app is an app built on Angular 10 (+Bootstrap 4 & RxJS) for the front end and node.js 12 (+Express & OAS 3) for the back end.

## Running the whole app as containers

The app requires Docker running. To run the database, backend and frontend containers, run:

```
docker-compose up
```

To stop them, run:

```
docker-compose down
```

If you want to reset the data from the databases containers, remove all of their volumes by running:

```
docker volume ls

docker volume rm <volume_id/name> <volume_id/name> <volume_id/name> ...
```

## Using the app

The app is available on http://localhost:3000

An example account is available with the login **topquizz@topquizz.eu** and the password **topquizz**.

A database administration app on locahost:5050 is also available using the same login information.

The database connection uses the login **topquizz** and passwordd **topquizz**

## Running the different part of the app independently

You can comment the different containers in the docker-compose.yaml file to avoid running them with docker-compose. The database containers should not be commented, though.

If you want to run the backend independently from the composed containers, in the backend folder, run:

```
npm start
```

If you want to run the frontend independently from the composed containers, in the frontend folder, run:

```
ng serve --o
```

## Miscellaneous

To view the backend API and the app communication contract:

```
open http://localhost:5000/docs
```