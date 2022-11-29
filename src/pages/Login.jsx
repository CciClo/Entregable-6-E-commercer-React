import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const Login = () => {

   const { handleSubmit, register } = useForm();
   const dispatch = useDispatch();

   const navigate = useNavigate();

   const products = useSelector(state => state.products);

   useEffect(() => {

      if (products.length === 0) {
         dispatch(getProductsThunk());
      } else {
         dispatch(setIsLoading(true));
         setTimeout(() => dispatch(setIsLoading(false)), 400);
      }
      
   }, []);

   const submit = (userLogin) => {
      axios
         .post('https://e-commerce-api.academlo.tech/api/v1/users/login', userLogin)
         .then( res => {
            navigate('/')
            localStorage.setItem('token',res.data.data.token)
         } )
         .catch( error => {
            if( error.response?.status == 404){
               alert('Algo salio mal')
            }
         })
   }


   return (
      <div className='container-product-found' style={{width: '35rem', margin:'auto'}}  >
         <Form onSubmit={handleSubmit(submit)}  >
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control type="email" placeholder="Enter email" {...register('email')}/>

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" placeholder="Password" {...register('password')} />
            </Form.Group>

            <Button variant="primary" type="submit">
               Submit
            </Button>
         </Form>
      </div>
   );
};

export default Login;