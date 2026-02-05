"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
class ProductApiController {
    async createProduct(req, res) {
        try {
            const newProduct = new product_1.default(req.body);
            const savedProduct = await newProduct.save();
            return res.status(201).json({ success: true, data: savedProduct });
        }
        catch (err) {
            console.error('CREATE ERROR:', err);
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    async getProducts(req, res) {
        try {
            const { search, size, color, minPrice, maxPrice } = req.query;
            const query = {};
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
                if (minPrice)
                    query.price.$gte = Number(minPrice);
                if (maxPrice)
                    query.price.$lte = Number(maxPrice);
            }
            const products = await product_1.default.find(query).sort({ createdAt: -1 });
            return res.status(200).json({ success: true, data: products });
        }
        catch (err) {
            console.error('SERVER ERROR:', err);
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    async getProductById(req, res) {
        try {
            const product = await product_1.default.findById(req.params.id);
            if (!product)
                return res.status(404).json({ success: false });
            return res.status(200).json({ success: true, data: product });
        }
        catch (err) {
            return res.status(500).json({ success: false });
        }
    }
    async updateProduct(req, res) {
        try {
            const product = await product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({ success: true, data: product });
        }
        catch (err) {
            console.error('UPDATE ERROR:', err);
            return res.status(400).json({ success: false, message: err.message });
        }
    }
    async deleteProduct(req, res) {
        try {
            await product_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json({ success: true });
        }
        catch (err) {
            return res.status(500).json({ success: false });
        }
    }
}
exports.default = new ProductApiController();
