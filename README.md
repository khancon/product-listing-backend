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

## Additional Information: Hosting on AWS App Runner

This section provides details about deploying and managing the backend app on **AWS App Runner**, including the build and start configurations required, and general tips for working with App Runner.

---

### **AWS App Runner Configuration for This App**

When deploying this app to AWS App Runner, you must configure the build and start commands manually instead of using the `Dockerfile`. Here’s the required configuration:

#### **Build Configuration**
- **Build Command**:
  ```bash
  npm install && npm run build
  ```
  - This installs dependencies and builds the TypeScript app into the `dist/` directory.

#### **Start Configuration**
- **Start Command**:
  ```bash
  node dist/server.js
  ```
  - This runs the compiled app from the `dist/` directory.

#### **Port**
- **Port**: `3000`

---

### **How to Access the Deployed App**

1. **Public URL**:
   Once deployed, App Runner provides a public HTTPS URL for the app (e.g., `https://<unique-id>.<region>.awsapprunner.com`).
2. Use this URL to interact with the API endpoints. For example:
   ```bash
   curl -X GET https://qrbgumsmdq.us-east-1.awsapprunner.com/api/products
   ```

---

### **Continuous Deployment from GitHub**

AWS App Runner supports automatic deployment from a connected GitHub repository. Any new commits pushed to the `main` branch will trigger an automatic rebuild and redeploy of the app.

#### Steps:
1. Ensure your App Runner service is linked to your GitHub repository.
2. Push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Update backend logic"
   git push origin main
   ```
3. App Runner will detect the changes, rebuild the app, and deploy the latest version.

---

### **Testing the Deployed API**

You can test the deployed API using tools like `curl`, Postman, or a web browser.

#### Example `curl` Commands:
- **Get All Products**:
  ```bash
  curl -X GET https://qrbgumsmdq.us-east-1.awsapprunner.com/api/products
  ```

- **Add a Product**:
  ```bash
  curl -X POST https://qrbgumsmdq.us-east-1.awsapprunner.com/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Product A", "price": 100}'
  ```

- **Update a Product**:
  ```bash
  curl -X PUT https://qrbgumsmdq.us-east-1.awsapprunner.com/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Product A", "price": 150}'
  ```

- **Delete a Product**:
  ```bash
  curl -X DELETE https://qrbgumsmdq.us-east-1.awsapprunner.com/api/products/1
  ```

---

### **Monitoring and Logs**

AWS App Runner provides built-in monitoring and logging features:
1. **Logs**:
   - Go to the **Logs** tab in the App Runner console to view application logs (e.g., requests and errors).
2. **Metrics**:
   - App Runner tracks performance metrics like CPU utilization, memory usage, and request counts.

---

### **Managing the App**

#### **Restart the Service**:
If you need to restart the app manually:
1. Go to the **AWS App Runner Console**.
2. Select your service.
3. Click **Actions > Deploy current image** to trigger a restart.

#### **Scaling**:
App Runner automatically scales your app based on traffic. You can configure minimum and maximum instances in the service settings:
- Minimum instances: `1` (default)
- Maximum instances: `25` (default)

---

### **Future Enhancements for App Runner Deployment**

1. **Environment Variables**:
   - Store sensitive data (e.g., database credentials) securely using App Runner's environment variable feature.
   - Example:
     - Key: `NODE_ENV`
     - Value: `production`

2. **Custom Domain Name**:
   - Configure a custom domain for the app using the App Runner **Domain** feature.

3. **Advanced Build and Start Commands**:
   - You can extend the build and start commands to include custom logic, such as migrations or seed scripts.

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
