import express from "express";
import { getAllProduct, getOneProduct, patchProduct, postCreateProduct, putProduct, deleteProduct, getProductRenderList } from "../controllers/product-controller.js";
import { authorization } from "../authorization/userAuth.js";

const productRouter = express.Router();

productRouter.get("/products/one", getProductRenderList);

productRouter.get("/products", authorization, getAllProduct);

productRouter.get("/products/:id", authorization, getOneProduct);

productRouter.post("/products", authorization, postCreateProduct);

productRouter.put("/products/:id", authorization, putProduct);

productRouter.patch("/products/:id", authorization, patchProduct);

productRouter.delete("/products/:id", authorization, deleteProduct);

export default productRouter;
