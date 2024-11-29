const { sequelize, Product } = require('../models');

export const readProductsFromFile = async () => {
    try {
        return await Product.findAll();
    } catch (error) {
        console.error('Error reading products', error);
        return [];
    }

};

export const writeProductsToFile = async (products) => {
    try {
        // Clear existing products
        await Product.destroy({ where: {} });

        // Insert new products
        await Product.bulkCreate(products);
    } catch (error) {
        console.error('Error writing products');
    }
};


// import fs from 'fs';
// import path from 'path';

// interface Product {
//     id: number;
//     name: string;
//     price: number;
// }

// const productsFilePath = path.join(__dirname + "/../", 'db.json');

// // Function to read products from the JSON file
// export const readProductsFromFile = (): Product[] => {
//     try {
//         if (!fs.existsSync(productsFilePath)) {
//             // Create the file if it doesn't exist
//             fs.writeFileSync(productsFilePath, JSON.stringify([]), 'utf-8');
//         }
//         const data = fs.readFileSync(productsFilePath, 'utf-8');
//         return JSON.parse(data) as Product[];
//     } catch (error) {
//         console.error('Error reading products file:', error);
//         return [];
//     }
//   };
  
// // Function to write products to the JSON file
// export const writeProductsToFile = (products: Product[]) => {
//     try {
//         fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
//     } catch (error) {
//         console.error('Error writing products file:', error);
//     }
// };
