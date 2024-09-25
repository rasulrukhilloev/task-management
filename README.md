RUN docker-compose up --build -d

Backend port: 3000
DB admin(mongo-express docker image): 8081

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login a user |

## Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/tasks | Create a new task (requires auth) |
| GET    | /api/tasks | Get all tasks for the authenticated user |
| GET    | /api/tasks/:id | Get a specific task by ID (requires auth) |
| PATCH  | /api/tasks/:id | Update a specific task (requires auth) |
| DELETE | /api/tasks/:id | Delete a specific task (requires auth) |

## Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/admin/analytics | Get task analytics (requires admin auth) |

