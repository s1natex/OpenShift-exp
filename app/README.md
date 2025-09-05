## App instructions for local usage:
- To run the application, cd to app/ and use the command: **docker-compose up --build**
- Access the frontend at http://localhost:8080
- Backend API: http://localhost:8000/api/hello
- Health: http://localhost:8000/healthz and http://localhost:8080/healthz
- To stop the application, use: **docker-compose down**
- To view logs, use: **docker-compose logs -f**
- To run tests, navigate to the backend directory and use: pytest --cov=
- Ensure Docker is installed and running on your machine
- **Manual verification:**
```
# backend health
curl -i http://localhost:8000/healthz
# backend hello
curl -i http://localhost:8000/api/hello
# frontend health
curl -i http://localhost:8080/healthz
# frontend serves page
curl -I http://localhost:8080
```
- **Healthchecks via Docker:**
```
docker compose ps # STATUS "(healthy)" for both
docker inspect --format '{{json .State.Health}}' ms-backend | jq
docker inspect --format '{{json .State.Health}}' ms-frontend | jq
```
- **Run tests in containers:**
```
cd app

# backend tests (pytest)
docker compose run --rm backend pytest -q

# frontend tests (vitest)
docker compose run --rm frontend npm test -- --run
```
- **UI sanity-check:**
    - Visit http://localhost:8080, The card will show frontend health and the backend message
    - If you temporarily stop backend (**docker stop ms-backend**), the frontend will show ***“Failed to reach backend”*** upon reload, and ***depends_on*** will keep frontend up but healthcheck for backend will fail (as expected), Start it again: **docker start ms-backend**
