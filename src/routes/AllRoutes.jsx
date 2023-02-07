import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Blog from "../pages/Blog/Blog";
import CreateBlog from "../pages/CreateBlog/CreateBlog";
import PrivateRoute from "./PrivateRoute";
import User from "../pages/User/User";
const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/blog/:id"
        element={
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
