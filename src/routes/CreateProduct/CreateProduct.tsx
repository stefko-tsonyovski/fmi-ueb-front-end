import React from "react";
import ProductForm from "../../components/ProductForm.tsx/ProductForm";
import {
  createProduct,
  Product,
  selectAllProducts,
} from "../../features/products/productsSlice";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";

const initialValues = {
  id: "",
  image: "",
  name: "",
  description: "",
  boughtPrice: 0,
  salesPrice: 0,
  quantity: 0,
  category: 1,
  code: "",
};

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const products = useAppSelector(selectAllProducts);

  const handleAddProduct = (values: Product, imageUrl: string) => {
    const product = {
      ...values,
      id: uuidv4(),
      image: imageUrl,
    };

    if (products.find((p) => p.code === product.code)) {
      alert("Product with such a code already exists");
    } else {
      dispatch(createProduct(product));
      navigate("/warehouse");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Create Product</h1>
      <ProductForm
        handler={handleAddProduct}
        buttonLabel="Create"
        image=""
        initialValues={initialValues}
      />
    </div>
  );
};

export default CreateProduct;
