import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../Firebase/config';
import './View.css';

function View() {
  const { productId } = useParams();
  console.log('productId:', productId); // Log productId to ensure it's correctly extracted

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product...');
        const productRef = doc(firestore, 'products', productId);
        console.log('productRef:', productRef); // Log productRef to ensure it's correct
        const productSnapshot = await getDoc(productRef);
        console.log('productSnapshot:', productSnapshot); // Log productSnapshot to check its value
        if (productSnapshot.exists()) {
          setProduct(productSnapshot.data());
        } else {
          console.log('No such product found!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return (
    <div className="viewParentDiv">
      {product ? (
        <>
          <div className="imageShowDiv">
            <img src={product.image} alt="" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {product.price}</p>
              <span>{product.name}</span>
              <p>{product.category}</p>
              <span>{product.createAt}</span>
            </div>
            <div className="contactDetails">
              <p>Seller details</p>
              <p>{product.sellerName}</p>
              <p>{product.contactNumber}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
}

export default View;
