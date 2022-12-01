import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkoutThunk, getCartSide } from '../store/slices/cartSideBar.slice';

const CartSideBars = ({ show, handleClose }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartSide = useSelector(state => state.cart);

  useEffect(() => {

    if(cartSide.length === 0){
      dispatch(getCartSide());
    }
  },[]);

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end' >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
          {
            cartSide.map(product => (
              <li key={product.id} >
                <h4>{product.title}</h4>
              </li>
            ))
          }
          <Button onClick={() => ( cartSide.length !== 0 && dispatch(checkoutThunk()), cartSide.length !== 0 && navigate('/purchases') ) } >Checkout</Button>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSideBars;