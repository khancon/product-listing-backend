import express, { Request, Response } from 'express';
import log from './logger';
import cors from 'cors';
import { readProductsFromFile, writeProductsToFile } from './productStore';

//initilaize express app
const app = express();

// middleware
app.use(cors()); //enable cors
app.use(express.json()); // parse json requests
app.use((req, res, next) => {
    log.info(`Incoming request -- ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

// basic route
app.get('/', (req: Request, res: Response) => {
    // res.send('Hello World - V2!');
    log.info('Default -- GET request');
    res.json(products);
});

/** PRODUCT INVENTORY LOGIC */

interface Product {
    id: number;
    name: string;
    price: number;
}

const products: Product[] = readProductsFromFile(); // in mem datastore
let nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

// GET all products
app.get('/api/products', (req, res) => {
    log.info('Retrieving all products');
    res.json(products);
});

// GET product by :id
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id === id);

    if(!product){
        log.error("Product not found");
        res.status(404).json({
            error: "Product not found"
        });
        return;
    }
    
    log.info(`Product id ${req.params.id} found: ${JSON.stringify(product)}`)
    res.json(product);
});

// POST a new product
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;

    if(!name || price == null){
        log.error("Name or price missing from request");
        res.status(404).json({
            error: "Name and price are required"
        });
        return;
    }

    const newProduct: Product = { id: nextId++, name, price};
    log.info(`Product created successfully: ${JSON.stringify(newProduct)}`);
    products.push(newProduct);
    writeProductsToFile(products);

    res.status(201).json(newProduct);
});

// PUT update a product
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, price } = req.body;
  
    const product = products.find((p) => p.id === id);
  
    if (!product) {
        log.error("Product not found");
        res.status(404).json({ error: 'Product not found' });
        return;
    }
  
    if (!name || price == null) {
        log.error("Name or price missing from request");
        res.status(400).json({ error: 'Name and price are required' });
        return;
    }
  
    product.name = name;
    product.price = price;
    log.info(`Product ${req.params.id} updated successfully: ${JSON.stringify(product)}`);
    writeProductsToFile(products);
  
    res.json(product);
  });

  // DELETE a product
  app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = products.findIndex((p) => p.id === id);
  
    if (index === -1) {
        log.error("Product not found");
        res.status(404).json({ error: 'Product not found' });
        return;
    }
  
    products.splice(index, 1);
    log.info(`Product ${req.params.id} removed successfully`);
    writeProductsToFile(products);
  
    res.status(204).send(); // No content
  });
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    log.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
