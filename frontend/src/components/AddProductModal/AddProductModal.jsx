import React, { useState } from "react";
import axios from 'axios'; 
import "./AddProductModal.scss";

const AddProductModal = ({ showModal, setShowModal }) => {
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [message, setMessage] = useState('');

  const closeModal = () => {
    setShowModal(false);
    setMessage('');  // Reset the message when closing the modal
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!productName || !productUrl || !productDescription || !productPrice || !productCategory) {
      setMessage("Please fill all the fields");
      return;
    }

    const productData = {
      name: productName,
      image: productUrl,
      description: productDescription,
      price: productPrice,
      category: productCategory,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      await axios.post('http://localhost:7000/api/products/', productData, config);
      setMessage('Product added successfully');
      setProductName('');
      setProductUrl('');
      setProductDescription('');
      setProductPrice('');
      setProductCategory('');
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error adding product: ', error);
      setMessage('Error adding product');
    }
  };

  if (!showModal) {
    return null;
  }
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h5 className="product-name">Add Product</h5>
        {message && <p>{message}</p>}
        <form onSubmit={handleAddProduct}>
          <div className="form-group">
            <label className="form-label" htmlFor="productFormControlInput2">Product image URL</label>
            <input 
              type="text" 
              className="form-control" 
              id="productFormControlInput2" 
              placeholder="Product image URL" 
              value={productUrl} 
              onChange={(e) => setProductUrl(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="productFormControlInput1">Product name</label>
            <input 
              type="text" 
              className="form-control" 
              id="productFormControlInput1" 
              placeholder="Product name" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="productFormControlTextarea1">Product description</label>
            <textarea 
              className="form-control" 
              id="productFormControlTextarea1" 
              rows="3"
              value={productDescription} 
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="productFormControlInput3">Product price</label>
            <input 
              type="number" 
              className="form-control" 
              id="productFormControlInput3" 
              placeholder="Product price" 
              value={productPrice} 
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="productFormControlInput4">Product category</label>
            <input 
              type="text" 
              className="form-control" 
              id="productFormControlInput4" 
              placeholder="Product category" 
              value={productCategory} 
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-primary add-product-button">Add Product</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
