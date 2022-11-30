import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { filterCategoriesThunk, filterProductThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {
   const dispatch = useDispatch();
   const [categories, setCategories] = useState([]);
   const [inputSearch, setInputSearch] = useState('');

   const products = useSelector(data => data.products);

   useEffect(() => {
      dispatch(getProductsThunk());

      axios
         .get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
         .then(res => setCategories(res.data.data.categories));
   }, []);

   const dropDown = (clas) => {
      const classN = document.querySelector(`.${clas}`);
      classN.classList.toggle('closed');
   };


   return (
      <div className='home' >

         <aside>

            <ul className='container-drop-down price closed' >
               <li className='aside-title' onClick={() => dropDown('price')} >
                  Price <i className="bi bi-chevron-compact-down"></i>
               </li>
               <li>
                  <Form>
                     <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>From</Form.Label>
                        <Form.Control type="text" placeholder="" />
                     </Form.Group>

                     <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="number" placeholder="" />
                     </Form.Group>
                     <Button variant="primary" type="submit">
                        Filter Price
                     </Button>
                  </Form>
               </li>
            </ul>

            <ul className='container-drop-down categories closed' >
               <li className='aside-title' onClick={() => dropDown('categories')} >
                  Category  <i className="bi bi-chevron-compact-down"></i>
               </li>
               <ul className='category' >
                  {
                     categories.map(category => (
                        <li onClick={() => dispatch(filterCategoriesThunk(category.id))} key={category.name}  >
                           {category.name}
                        </li>
                     ))
                  }
               </ul>
            </ul>

         </aside>

         <main>

            <InputGroup className="mb-3">
               <Form.Control
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={inputSearch}
                  onChange={e => setInputSearch(e.target.value)}
               />
               <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterProductThunk(inputSearch))} >
                  find
               </Button>
            </InputGroup>

            <ul className='container-products' >
               {
                  products.map(product => (
                     <ProductCard product={product} key={product.id} />
                  ))
               }

            </ul>

         </main>
      </div>
   );
};

export default Home; <h2>Home</h2>