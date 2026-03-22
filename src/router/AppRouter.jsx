import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BookDetail from "../pages/BookDetail";
import Profile from "../pages/Profile";
import MyBooks from "../pages/MyBooks";
import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-books" element={<MyBooks />} />
        </Route>


        {/* Auth Pages (without Navbar) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;