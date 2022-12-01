import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkoutThunk, getCartSide } from '../store/slices/cartSideBar.slice';

const CartSideBars = ({ show, handleClose, setShow }) => {

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
      <Offcanvas.Body style={{position:'relative'}} >
        <ul>
          {
            cartSide.map(product => (
              <li key={product.id} >
                <Link to={`/product/${product.id}`} onClick={() => setShow(false)} >
                  <h4>{product.title}</h4>
                </Link>
                <h5>{product.productsInCart.quantity}</h5>
                <h5>{Number(product.price)*product.productsInCart.quantity}</h5>
              </li>
            ))
          }
        </ul>

        <div style={{width:'100%', padding:'30px', position:'absolute', bottom:'0', right:'0'}} >
          <span>Total</span>
          <p>0</p>
          <Button 
            onClick={() => ( cartSide.length !== 0 && dispatch(checkoutThunk()), cartSide.length !== 0 && navigate('/purchases') ) } 
            style={{width:'100%'}}
          >
              Checkout
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSideBars;