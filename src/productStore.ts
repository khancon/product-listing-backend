import fs from 'fs';
import path from 'path';

interface Product {
    id: number;
    name: string;
    price: number;
}

const productsFilePath = path.join(__dirname + "/../", 'db.json');

// Function to read products from the JSON file
export const readProductsFromFile = (): Product[] => {
    try {
        if (!fs.existsSync(productsFilePath)) {
            // Create the file if it doesn't exist
            fs.writeFileSync(productsFilePath, JSON.stringify([]), 'utf-8');
        }
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(data) as Product[];
    } catch (error) {
        console.error('Error reading products file:', error);
        return [];
    }
  };
  
// Function to write products to the JSON file
export const writeProductsToFile = (products: Pr