# Product Listing Backend

This repository contains a Dockerized backend API built with **TypeScript** and **Express**. It provides endpoints to manage products and persist data in a `db.json` file.

## Features
- **CRUD API** for managing products.
- Persistent data storage using a `db.json` file.
- Dockerized with a `Makefile` for ease of use.

---

## Prerequisites
- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **Docker**: [Download and install Docker](https://www.docker.com/).

---

## Cloning the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/your-username/product-listing-backend.git
cd product-listing-backend
```

---

## Running the App

### **Option 1: Using Docker and Makefile**

1. Build the Docker image:
   ```bash
   make build
   ```
2. Run the app with persistent data (volume mount):
   ```bash
   make run
   ```
3. Access the API at `http://localhost:3000`.

### **Option 2: Without Docker**

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the TypeScript code:
   ```bash
   npm run build
   ```
3. Run the app:
   ```bash
   npm start
   ```
4. Access the API at `http://localhost:3000`.

---

## Endpoints

### **Base URL**
`http://localhost:3000`

### **Endpoints**

| Method | Endpoint           | Description               | Example Request Body                   |
|--------|--------------------|---------------------------|-----------------------------------------|
| GET    | `/api/products`    | Get all products          |                                         |
| GET    | `/api/products/:id`| Get a product by ID       |                                         |
| POST   | `/api/products`    | Add a new product         | `{ "name": "Product A", "price": 100 }`|
| PUT    | `/api/products/:id`| Update an existing product| `{ "name": "Updated Product A", "price": 150 }`|
| DELETE | `/api/products/:id`| Delete a product by ID    |                                         |

### Example Using `curl`:
```bash
# Get all products
curl -X GET http://localhost:3000/api/products

# Add a product
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-d '{"name": "Product A", "price": 100}'

# Update a product
curl -X PUT http://localhost:3000/api/products/1 \
-H "Content-Type: application/json" \
-d '{"name": "Updated Product A", "price": 150}'

# Delete a product
curl -X DELETE http://localhost:3000/api/products/1
```

---

## Troubleshooting

### **Problem: Docker Container Fails to Persist Data**
- Ensure the `db.json` file is in the correct directory (`./db.json`).
- Run the container with volume mount:
  ```bash
  make run
  ```

### **Problem: Container Won’t Start**
- Check the container logs:
  ```bash
  make logs
  ```

### **Problem: No Containers to Stop**
- If `make stop` gives an error, it means no containers are currently running.

### **Check Running Containers**
```bash
docker ps
```

---

## Development Commands

| Command              | Description                                         |
|----------------------|-----------------------------------------------------|
| `make build`         | Build the Docker image                              |
| `make run`           | Run the app with volume mount for persistent data   |
| `make run-no-mount`  | Run the app without persistent data                 |
| `make stop`          | Stop the first running container                    |
| `make logs`          | Show logs for the first running container           |
| `make restart`       | Stop and restart the app                            |

---

## Future Enhancements
- Add unit tests using Jest or Mocha.
- Integrate a frontend application.
- Add support for databases like MongoDB or PostgreSQL.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
