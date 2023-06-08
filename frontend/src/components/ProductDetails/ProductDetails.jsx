import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../ProductDetails/ProductDetails.scss";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="card-row">
      {products.map((product) => (
        <div key={product._id} className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={product.image}
                className="card-img img-small"
                alt={product.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text description">
                  {truncateDescription(product.description, 50)}
                </p>
                <div className="card-text-row">
                  <span className="text-lg">{product.price}</span>
                  <Link to={`/products/${product._id}`} className="btn btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
