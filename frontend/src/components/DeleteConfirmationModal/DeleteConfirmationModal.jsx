import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteConfirmationModal = ({ show, onCancel, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await onDelete(); // awaiting the deletion operation
      navigate('/product'); // navigate to products page after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete the product</h5>
            <button type="button" className="close" onClick={onCancel}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to remove the product?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
