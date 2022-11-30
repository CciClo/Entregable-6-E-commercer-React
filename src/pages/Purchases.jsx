import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
   const dispatch = useDispatch();

   const purchases = useSelector(state => state.purchases);

   useEffect(() => {
      if(purchases.length == 0){
         dispatch(getPurchasesThunk());
         console.log(purchases);
      };
   }, []);

   return (
      <div className='container-product-found' >
         <h2>purchases</h2>
         <ul>
            {
               purchases.map(purchase => (
                  <li key={purchase.createdAt}>
                     <h2>{purchase.createdAt}</h2>
                     <ul>
                        {purchase.cart.products.map(product => (
                           <li key={product.id} >
                              <h3>{product.title}</h3>
                              <h4>{product.productsInCart.quantity}</h4>
                           </li>
                        ))}
                     </ul>
                  </li>
               ))
            }
         </ul>
      </div>
   );
};

export default Purchases;