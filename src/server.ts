import express, { Request, Response } from 'express';
import cors from 'cors';
import { readProductsFromFile, writeProductsToFile } from './productStore';

//initilaize express app
const app = express();

// middleware
app.use(cors()); //enable cors
app.use(express.json()); // parse json requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next(); // Pass control to the next middleware or route handler
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

// basic route
app.get('/', (req: Request, res: Response) => {
    // res.send('Hello World - V2!');
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
    res.json(products);
});

// GET product by :id
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id === id);

    if(!product){
        res.status(404).json({
            error: "Product not found"
        });
        return;
    }

    res.json(product);
});

// POST a new product
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;

    if(!name || price == null){
        res.status(404).json({
            error: "Name and price are required"
        });
        return;
    }

    const newProduct: Product = { id: nextId++, name, price};
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
        res.status(404).json({ error: 'Product not found' });
        return;
    }
  
    if (!name || price == null) {
        res.status(400).json({ error: 'Name and price are required' });
        return;
    }
  
    product.name = name;
    product.price = price;
    writeProductsToFile(products);
  
    res.json(product);
  });

  // DELETE a product
  app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = products.findIndex((p) => p.id === id);
  
    if (index === -1) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }
  
    products.splice(index, 1);
    writeProductsToFile(products);
  
    res.status(204).send(); // No content
  });
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
