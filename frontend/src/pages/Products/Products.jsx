import React, { useState } from "react";
import "./Products.scss";
import { useNavigate } from "react-router-dom";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import AddProductModal from "../../components/AddProductModal/AddProductModal";

const Products = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Clear admin information
    localStorage.removeItem("adminToken"); // Remove the admin token from local storage
    // Reset any relevant state variables to their initial values

    navigate("/");
  };

  const handleSuccess = () => {
    // Show the modal when the success button is clicked
    setShowModal(true);
  };


  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand d-flex align-items-center ms-4" href="#">
          <img
            src="logga.svg"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt=""
          />
          <span className="ms-1">CMS</span>
        </a>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={handleSuccess}
          >
            Add Product
          </button>
          <button
            type="button"
            className="btn btn btn-secondary btn-red"
            data-toggle="button"
            aria-pressed="false"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </nav>
      <div className="container-productDetails">
        <ProductDetails />
      </div>
      {showModal && (
        <AddProductModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default Products;
