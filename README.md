# A sphere demo app

## 1. Requirements
- A simple app that display a sphere by using [threejs](https://threejs.org/) library
- Set the sphere radius via an JSON-RPC API (call set_radius) and request it again via a get_radius to display it

## 2. Running with Docker
First, make sure these two ports are available on your local machine: **3001 and 9003**. Then run the following command in your terminal:
```
docker compose up --build
```
Once the build is finished, the app will run under http://localhost:3001

## 3. Running locally
You need `nodejs` as prerequisite.

Again, also make sure these ports are available: **3001 and 9003**.

Then navigate to `sphere-app-demo/backend` and run this command:
```
node ./bin/www
```
Open a new terminal and navigate to `sphere-app-demo/frontend` and run this command:
```
npm run dev
```
The app will run under http://localhost:3001
