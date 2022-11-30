import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import CartSideBars from './CartSideBars';

const NavBar = () => {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <div className='navbar'>

         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
               <Navbar.Brand as={Link} to='/' >e-commerce</Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                  </Nav>
                  <Nav>
                     <Nav.Link as={Link} to='/login' >
                        <i className="bi bi-person"  ></i>
                     </Nav.Link>
                     <Nav.Link as={Link} to='/purchases'>
                        <i className="bi bi-bag"></i>
                     </Nav.Link>
                     <Nav.Link onClick={handleShow} >
                        <i className="bi bi-cart3"></i>
                     </Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <CartSideBars show={show} handleClose={handleClose} />

      </div>
   );
};

export default NavBar;