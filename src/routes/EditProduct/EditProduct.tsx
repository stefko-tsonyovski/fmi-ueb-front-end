import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { v4 as uuidv4 } from "uuid";
import {
  editProduct,
  Product,
  selectAllProducts,
  selectProductById,
} from "../../features/products/productsSlice";
import ProductForm from "../../components/ProductForm.tsx/ProductForm";

export type EditProductParams = {
  id: string;
};

const EditProduct = () => {
  const { id } = useParams<EditProductParams>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const products = useAppSelector(selectAllProducts);
  const product = useAppSelector((state) =>
    selectProductById(state, id as string)
  ) as Product;

  const handleEditProduct = (values: Product, imageUrl: string) => {
    const product = {
      ...values,
      image: imageUrl,
    };

    dispatch(editProduct(product));
    navigate("/warehouse");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Edit Product</h1>
      <ProductForm
        handler={handleEditProduct}
        buttonLabel="Save"
        image={product?.image as string}
        initialValues={product}
      />
    </div>
  );
};

export default EditProduct;
