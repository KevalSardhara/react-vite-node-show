import fs from "fs";
import bodyParser from "body-parser";
import Product from "../models/products-model.js";


// conver into a JSON object
let fsFile = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

console.log(Product);

export const getAllProduct = async (req, res) => {
    // res.products = fsFile;
    try {
        const allProduct = await Product.find({});
        // const allProduct = await Product.find({price: 100}).exec();

        // const { id } = req.body;
        // const allProduct = await Product.findById(id);
        // allProduct.name = 'Samsung Product A71';
        // await allProduct.save();

        return res.status(201).json({
            successTrue: true,
            message: allProduct,
        });

    } catch (error) {
        return res.status(404).json({
            successTrue: false,
            message: error.message,
        });
    }
};

export const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // const allProduct = await Product.findById({_id : id});
        const allProduct = await Product.findById(id);

        return res.status(201).json({
            successTrue: true,
            message: allProduct,
        });

    } catch (error) {
        return res.status(404).json({
            successTrue: false,
            message: error.message,
        });
    }
};

export const postCreateProduct = async (req, res) => {
    try {
        res.products = req.body; // Data come through the convert into a "JSON.parse(object)"
        // fsFile.push(req.body);

        // #1 Methods to create Object
        // const product = new Product(res.products);
        // await product.save(); // always write await it's async function here write here

        // #2 Methods to create Object
        const product = await Product.create(res.products);

        // #3 Methods to create Object
        // product.name = "Keval";
        // product.price = 100000;
        // await product.save(); // always write await it's async function here write here
        // console.log(product);

        // product.save().then((product) => {
        //     console.log(product);
        // }).catch((err) => {
        //     console.log(err);
        // });

        return res.status(201).json({
            successTrue: true,
            message: product,
        });
    }
    catch (err) {
        return res.status(404).json({
            successTrue: false,
            message: err,
        });
    }
}

export const putProduct = async (req, res) => {
    // const temp = fsFile.find(p => p.id === (+req.params.id));
    // fsFile.splice(+req.params.id, 1, { ...fsFile[+req.params.id], ...req.body });
    try {
        const { id } = req.params;
        // const pId = await Product.findOneAndUpdate({_id : id}, req.body).save();
        // const replaceProduct = await Product.findOneAndReplace({_id : id}, req.body);
        const replaceProduct = await Product.findOneAndReplace({ _id: id }, req.body, { new: true });
        // await updateProduct.save();

        return res.status(201).json({
            successTrue: true,
            message: replaceProduct,
        });
    } catch (error) {
        return res.status(404).json({
            successTrue: true,
            message: error.message,
        });
    }
};

export const patchProduct = async (req, res) => {
    // const temp = fsFile.find(p => p.id === (+req.params.id));
    // fsFile.splice(+req.params.id, 1, { ...fsFile[+req.params.id], ...req.body });
    try {
        const { id } = req.params;
        // const pId = await Product.findOneAndUpdate({_id : id}, req.body).save();
        const updateProduct = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
        // const updateProduct = await Product.findOneAndReplace({_id : id}, req.body, {new : true});
        // await updateProduct.save();

        return res.status(201).json({
            successTrue: true,
            message: updateProduct,
        });
    } catch (error) {
        return res.status(404).json({
            successTrue: true,
            message: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // const temp = fsFile.find(p => p.id === (+req.params.id));
        // fsFile.splice((+req.params.id) - 1, 1);
        // const deleteProduct = Product.deleteOne(Product.find(id)._id);
        const deleteProduct = await Product.findByIdAndDelete({_id : id});

        return res.status(201).json({
            successTrue: true,
            message: deleteProduct || "product not exist",
        });
    }
    catch (error) {
        return res.status(404).json({
            successTrue: false,
            message: error.message,
        });
    }
};
