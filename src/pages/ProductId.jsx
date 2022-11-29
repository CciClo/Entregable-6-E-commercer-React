import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { getProductsThunk } from '../store/slices/products.slice';
import ProductCard from '../components/ProductCard'
import { Button } from 'react-bootstrap';

const ProductId = () => {

   const [indexImage, setIndexImage] = useState(0);
   const [ quantity, setQuantity ] = useState(1);

   const { id } = useParams();
   const dispatch = useDispatch();

   const products = useSelector(state => state.products);
   const productFound = products.find(Product => Product.id == Number(id));

   const relateProduct = products.filter(Product => Product.category.id === productFound.category.id);

   useEffect(() => {

      if (!productFound) {
         dispatch(getProductsThunk());
      } else {
         dispatch(setIsLoading(true))
         setTimeout(() => dispatch(setIsLoading(false)), 400);
      }

   }, []);


   return (
      <div className='container-product-found' >
         <h2>{productFound?.title}</h2>
         <div className='container-product-id' >

            <section className='container-image-product-id' >
               <div className='container-image-id' >
                  <i className="bi bi-chevron-left" onClick={() => (indexImage > 0 && setIndexImage(indexImage - 1))} ></i>
                  <img src={productFound?.productImgs[indexImage]} alt="" />
                  <i className="bi bi-chevron-right" onClick={() => (indexImage < productFound?.productImgs.length - 1 && setIndexImage(indexImage + 1))} ></i>
               </div>
               <div className='container-image-selector' >
                  {
                     productFound?.productImgs.map((image, index) => (
                        <img src={image} alt="" onClick={() => setIndexImage(index)} key={image} className={`image-selector ${ indexImage === index && 'image-selector-observer' }`} />
                     ))
                  }
               </div>
            </section>

            <section className='container-information-product-id' >
               <h2>{productFound?.title}</h2>
               <p>{productFound?.description}</p>
               <div className='flex' >
                  <div className='container-information-product' >
                     <span>Price</span>
                     <h4>{productFound?.price}</h4>
                  </div>

                  <div className='container-information-product' >
                     <span>Quantity</span>
                     <div className='flex'>
                        <i className="bi bi-dash quantity " onClick={() => quantity > 1 && setQuantity(quantity-1) } ></i>
                        <div className='quantity' >{quantity}</div>
                        <i className="bi bi-plus quantity" onClick={() => setQuantity(quantity+1) } ></i>
                     </div>
                  </div>
               </div>
               <Button style={{width:'100%'}} >
                  Add to cart
               </Button>
            </section>

         </div>

         <ul className='container-products'>
            {
               relateProduct.map(product => (
                  <ProductCard product={product} key={product.id} />
               ))
            }
         </ul>

      </div>
   );
};

export default ProductId;