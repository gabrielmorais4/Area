# Backend documentation

## Backend stack
Stratos backend service uses [AdonisJS](https://adonisjs.com/) tech.

### Prerequisites
You should install node 18.
To launch the backend project, you should install [docker](https://www.docker.com/) first.

Then install all dependencies of the project with this command below:

`yarn` | `npm install`

### Env

Create a `.env` file and copy all content of `.env.example` and paste it in `.env` file.

### Docker
Before trying to run the project, you should install all images required for the backend.
The Dockerfile builds the project and the docker-compose pulls the Postgresql image.
Run these commands below:

`docker pull node:18-alpine3.18`

`docker-compose up --build`

### To run:
Clone the backend project.
Run these commands below:

`yarn`

`yarn dev` -> to run the dev mode

All configurations for the Postgresql are for the dev mode.
On the docker dashboard, you can see your containers that are running called "backend".
You can only run the "PostgreSQL" service to test your code.
The "adonis" container builds the adonisJS project to test the "production" mode but you can just run `yarn dev` instead

### Migration
If your postgresql image is running, you should migrate all sql table to your local database.

To do that, run these commands below:

`node ace migration:run`

> :warning: **Be carefull with the migration**: If you have already some data, the migration delete it all!
