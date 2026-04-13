import { useParams } from 'react-router-dom';
import Car from '../assets/Car.JPG';
import Carred from '../assets/Carred.JPG';
import Led from '../assets/Led.JPG';

const ProductDetails = ({ handleAddToCart }) => {
  const { id } = useParams();

  const products = [
    {
      id: 1,
      title: 'LED Light',
      price: '$15',
      image: Led,
      description: 'LED lights for decoration'
    },
    {
      id: 2,
      title: 'RED Mustang',
      price: '$80000',
      image: Carred,
      description: 'Classic red Mustang'
    },
    {
      id: 3,
      title: 'Corvette 1970',
      price: '$90000',
      image: Car,
      description: 'Vintage Corvette'
    }
  ];

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <main className="details-page">
      <div className="details-card">
        <img
          src={product.image}
          alt={product.title}
          className="details-image"
        />

        <div className="details-info">
          <h1>{product.title}</h1>
          <p className="price">{product.price}</p>
          <p className="desc">{product.description}</p>
          <button className="buy-btn" onClick={() => handleAddToCart(product)}>Buy Now</button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;