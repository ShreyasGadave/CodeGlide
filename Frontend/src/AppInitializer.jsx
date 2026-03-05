import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./Features/Auth/AuthSlice";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AppInitializer = ({ router }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());   // 🔥 runs on refresh
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AppInitializer;
