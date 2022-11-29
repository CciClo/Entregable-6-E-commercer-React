import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
   return (
      <li className='productCard' >
         <Link to={`/product/${product.id}`}>
            <div className='container-image-product' >
               <img src={product.productImgs[0]} alt="" />

            </div>
            <div className='container-information-product' >
               <h3>{product.title}</h3>
               <span>Price</span>
               <h4>{product.price}</h4>
            </div>
         </Link>
         <i className="bi bi-cart2"></i>
      </li>
   );
};

export default ProductCard;