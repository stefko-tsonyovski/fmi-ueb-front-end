import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import SignInSide from "../../components/SignInSide/SignInSide";
import { selectCurrentUser } from "../../features/user/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/warehouse");
    }
  }, [currentUser, navigate]);

  return <SignInSide />;
};

export default Home;
