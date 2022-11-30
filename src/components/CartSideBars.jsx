import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartSide } from '../store/slices/cartSideBar.slice';

const CartSideBars = ({ show, handleClose }) => {

  const dispatch = useDispatch();

  const cartSide = useSelector(state => state.cart)

  useEffect(() => {

    if(cartSide.length === 0){
      dispatch(getCartSide())
    }
  },[])

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end' >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
          {
            cartSide.map(product => (
              <li key={product.id} >{product.title}</li>
            ))
          }
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSideBars;