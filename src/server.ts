import express, { Request, Response } from 'express';
import log from './logger';
import cors from 'cors';
import { readProductsFromFile, writeProductsToFile } from './productStore';
import { Product } from '../models';
import { read } from 'fs';

//initilaize express app
const app = express(); //sdfasdf

// middleware
// const allowedOrigins = ['http://localhost:3001'];
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
app.get('/', async (req: Request, res: Response) => {
    log.info('Retrieving all products');
    const products = await readProductsFromFile();
    res.json(products);
});

// basic route
app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World - V2!');
    // log.info('Default -- GET request');
    // res.json(products);
});

/** PRODUCT INVENTORY LOGIC */

// interface Product {
//     id: number;
//     name: string;
//     price: number;
// }

// const products: Product[] = readProductsFromFile(); // in mem datastore
// let nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

// GET all products
app.get('/api/products', async (req, res) => {
    log.info('Retrieving all products');
    const products = await readProductsFromFile();
    res.json(products);
});

// GET product by :id
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product){
        res.status(404).json({ error: 'Product not found' });
        return;
    }

    res.json(product)
});

// POST a new product
app.post('/api/products', async (req, res) => {
    const { name, price } = req.body;

    if(!name || price == null){
        log.error("Name or price missing from request");
        res.status(404).json({
            error: "Name and price are required"
        });
        return;
    }

    const product = await Product.create({ name, price });
    log.info(`Product created successfully: ${JSON.stringify(product)}`);
    res.status(201).json(product);
});

// PUT update a product
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
  
    const product = await Product.findByPk(id);
  
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
    await product.save();
  
    res.json(product);
  });

  // DELETE a product
  app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
  
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
  
    await product.destroy();
    log.info(`Product ${req.params.id} removed successfully`);
  
    res.status(204).send(); // No content
  });
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    log.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
