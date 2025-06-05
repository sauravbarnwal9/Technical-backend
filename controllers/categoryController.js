import Category from '../models/category.model.js';

export default class CategoryController {
    static async addCategory(req, res) {
        try {
            const { name, type } = req.body;
            const userId = req.user.id;

            const category = new Category({ name, type, userId });
            await category.save();

            return res.status(201).json(category);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    static async getCategories(req, res) {
        try {
            const userId = req.user.id;
            const categories = await Category.find({ userId });
            return res.json(categories);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
