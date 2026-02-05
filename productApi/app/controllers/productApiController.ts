import { Request, Response } from 'express';
import Product from '../models/product';

class ProductApiController {

    async createProduct(req: Request, res: Response): Promise<Response> {
        try {

            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            return res.status(201).json({ success: true, data: savedProduct });
        } catch (err: any) {
            console.error('CREATE ERROR:', err);
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    async getProducts(req: Request, res: Response): Promise<Response> {
        try {
            const { search, size, color, minPrice, maxPrice } = req.query;
            const query: any = {};



            // SEARCH (Partial Match)
            if (search) {
                query.name = { $regex: String(search), $options: 'i' };
            }

            // SIZE (Exact Match in Array)
            if (size) {
                const sizes = String(size).split(',').filter(Boolean);
                if (sizes.length > 0) {
                    query.size = { $in: sizes }; // MongoDB $in matches if element is in array
                }
            }

            // COLOR (Exact Match in Array)
            if (color) {
                const colors = String(color).split(',').filter(Boolean);
                if (colors.length > 0) {
                    query.color = { $in: colors };
                }
            }


            // CATEGORY (Exact Match)
            if (req.query.category) {
                const categories = String(req.query.category).split(',').filter(Boolean);
                if (categories.length > 0) {
                    query.category = { $in: categories };
                }
            }

            // PRICE
            if (minPrice || maxPrice) {
                query.price = {};
                if (minPrice) query.price.$gte = Number(minPrice);
                if (maxPrice) query.price.$lte = Number(maxPrice);
            }



            const products = await Product.find(query).sort({ createdAt: -1 });
            return res.status(200).json({ success: true, data: products });
        } catch (err: any) {
            console.error('SERVER ERROR:', err);
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    async getProductById(req: Request, res: Response): Promise<Response> {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ success: false });
            return res.status(200).json({ success: true, data: product });
        } catch (err: any) {
            return res.status(500).json({ success: false });
        }
    }

    async updateProduct(req: Request, res: Response): Promise<Response> {
        try {

            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({ success: true, data: product });
        } catch (err: any) {
            console.error('UPDATE ERROR:', err);
            return res.status(400).json({ success: false, message: err.message });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<Response> {
        try {
            await Product.findByIdAndDelete(req.params.id);
            return res.status(200).json({ success: true });
        } catch (err: any) {
            return res.status(500).json({ success: false });
        }
    }
}

export default new ProductApiController();
