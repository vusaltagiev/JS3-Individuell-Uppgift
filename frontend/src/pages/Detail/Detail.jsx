import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import "../Detail/Detail.scss";

const Detail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetches the product details from the server
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/products/${productId}`
      );
      setProduct(response.data);
      setEditedProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    // Handles the click event for the edit button
    setIsEditMode(true);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Unauthorized request: Token missing");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:7000/api/products/${productId}`,
        editedProduct,
        config
      );

      if (response.status === 200) {
        setIsEditMode(false);
        setProduct(editedProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    // Handles the cancel edit action in edit mode
    setIsEditMode(false);
    setEditedProduct(product);
  };

  const handleDelete = () => {
    // Handles the click event for the delete button
    if (!product) {
      console.log("Product not found or already deleted.");
      return;
    }
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    // Handles the cancel action in the delete confirmation modal
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Unauthorized request: Token missing");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:7000/api/products/${productId}`,
        config
      );

      if (response.status === 200 || response.status === 410) {
        navigate("/product");
      } else {
        console.log("Error: ", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 410) {
        navigate("/product");
      } else {
        console.log(error);
      }
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const handleInputChange = (e) => {
    // Updates the edited product state when input fields change
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card">
        {isEditMode ? (
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="imageInput">Image URL:</label>
              <input
                type="text"
                className="form-control"
                id="imageInput"
                name="image"
                value={editedProduct.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameInput">Name:</label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description:</label>
              <textarea
                className="form-control"
                id="descriptionInput"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="priceInput">Price:</label>
              <input
                type="number"
                className="form-control"
                id="priceInput"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="row justify-content-between">
              <div className="col">
                <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
              <div className="col">
                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
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
