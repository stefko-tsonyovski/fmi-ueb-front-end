import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import { selectCurrentUser, signOut } from "../../features/user/userSlice";
import { Button } from "@mui/material";

const Warehouse = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <Button
        onClick={() => dispatch(signOut())}
        color="error"
        variant="contained"
      >
        Sign out
      </Button>
      <h1 style={{ textAlign: "center" }}>Warehouse</h1>
      <ProductsTable />
    </div>
  );
};

export default Warehouse;
