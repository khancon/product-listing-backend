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