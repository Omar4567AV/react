import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price, image, onAddToCart }) => {
  return (
    <div className="card">
      <Link to={`/product/${id}`} className="product-link">
        <img src={image} alt={title} className="card-image" />
      </Link>

      <Link to={`/product/${id}`} className="product-link">
        <h3>{title}</h3>
      </Link>

      <p>{price}</p>

      <button onClick={() => onAddToCart({ id, title, price, image })}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;