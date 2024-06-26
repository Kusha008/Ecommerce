import React, { useState } from 'react';
import './ProductCard.css'; // Make sure to create this CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice.js';
import {Link} from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/cart/addto-cart', 
        { productId: product._id },
        { withCredentials: true }
      );
      
      if (response.status === 201) {
        // dispatch(addItem(product));
        setAddedToCart(true);
      } else {
        console.error('Failed to add product to cart:', response.data);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="block">
      <img className="w-200px h-220px" src={product.productImages[0]} alt={product.name} />
      <div className="product-details">
        <div className="product-name">{product.name}</div>
      </div>
      <div className="product-price">
        <span>Rs {product.price}</span>
      </div>
      </Link>
      {addedToCart ? (
        <div className="added-to-cart">Added to Cart</div>
      ) : (
      
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
        </button>

      )}
    </div>
    
  );
};

export default ProductCard;
