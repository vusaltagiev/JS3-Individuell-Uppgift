import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import "../Detail/Detail.scss";

const Detail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${productId}`);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      };
  
      await axios.delete(`http://localhost:7000/api/products/${productId}`, config);
      navigate("/products"); // Redirect to products list after deletion
    } catch (error) {
      console.log(error);
      alert('Error deleting product');
    }
  };
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">{product.price}</p>
          <div className="row">
            <div className="col-6">
              <button
                onClick={handleEdit}
                className="btn btn-warning btn-sm"
              >
                Edit
              </button>
            </div>
            <div className="col-6">
              <button
                onClick={handleDelete}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        onCancel={handleCancelDelete}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};

export default Detail;
