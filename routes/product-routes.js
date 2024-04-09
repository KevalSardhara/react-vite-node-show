import express from "express";
import {getAllProduct,getOneProduct,patchProduct, postCreateProduct, putProduct, deleteProduct} from "../controllers/product-controller.js";

const router = express.Router();

router.get("/products", getAllProduct);

router.get("/products/:id", getOneProduct);

router.post("/products", postCreateProduct);

router.put("/products/:id", putProduct);

router.patch("/products/:id", patchProduct);

router.delete("/products/:id", deleteProduct);

export default router;
