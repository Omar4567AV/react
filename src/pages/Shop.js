import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Car from '../assets/Car.JPG';
import Carred from '../assets/Carred.JPG';
import Led from '../assets/Led.JPG';

const Shop = ({ handleAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, title: 'LED Light', price: '$15', image: Led, category: 'LED' },
    { id: 2, title: 'RED Mustang', price: '$80000', image: Carred, category: 'Car' },
    { id: 3, title: 'Corvette 1970', price: '$90000', image: Car, category: 'Car' }
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <h1>Shop Page</h1>

      <section style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '50%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </section>

      <section style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        {['All', 'Car', 'LED'].map(cat => (
          <button
            key={cat}
            style={{ 
              padding: '10px 20px', 
              cursor: 'pointer', 
              background: selectedCategory === cat ? '#007bff' : '#e2e6ea',
              color: selectedCategory === cat ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px'
            }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="products">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </section>
    </div>
  );
};

export default Shop;