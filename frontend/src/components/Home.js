import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      console.log('Viewing product:', productId);
    }
  };

  return (
    <div className="products-container">
      <h1 className="page-title">Featured Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">${product.price}</p>
            <button className="view-button">
              {isAuthenticated ? 'View Details' : 'Login to View'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;