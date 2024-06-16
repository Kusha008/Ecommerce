// import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="block">
      <div className="rounded overflow-hidden shadow-lg m-1" style={{ width: '336px', height: '480px' }}>
        <img className="w-full h-2/3 object-cover" src={product.productImages[0]} alt={product.name} />
        <div className="px-4 py-2">
          <div className="font-bold text-lg mb-2">{product.name}</div>
          <p className="text-gray-700 text-sm">
            {product.description}
          </p>
        </div>
        <div className="px-4 pt-2 pb-2">
          <span className="text-gray-900 font-bold text-lg">Rs.{product.price}</span>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Validate that the product object has an id of type string
    productImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
};

export default ProductCard;
