import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInSide from "./components/SignInSide/SignInSide";
import SignUp from "./components/SignUp/SignUp";
import Warehouse from "./routes/Warehouse/Warehouse";
import CreateProduct from "./routes/CreateProduct/CreateProduct";
import EditProduct from "./routes/EditProduct/EditProduct";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SignInSide />} />
        <Route path="register" element={<SignUp />} />
        <Route path="warehouse" element={<Warehouse />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path="edit/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
