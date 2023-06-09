import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import Products from "./pages/Products/Products";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/products/:productId" element={<Detail />} />
      <Route path="/product" element={<Products />} />
      {/* <Route path="*" element={<NotFound />} /> */} 
    </Routes>
  );
}

export default App;
