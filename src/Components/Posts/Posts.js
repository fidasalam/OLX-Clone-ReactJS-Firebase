import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Heart from '../../assets/Heart';
import './Post.css';
import { firestore } from '../../Firebase/config'; // Import your Firebase config

function MyComponent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, 'products'));
        const productsData = [];
        querySnapshot.forEach((doc) => {
          const product = { id: doc.id, ...doc.data() };
          const createDate = new Date(product.createAt);
          product.createDate = createDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          productsData.push(product);
        });
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleCardClick = (productId) => {
    console.log("productid:",productId)
    navigate(`/view/${productId}`); 
  };

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
          
              onClick={() => handleCardClick(product.id)} // Pass product ID to handleCardClick
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.image} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createDate}</span> {/* Displaying month and date */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
