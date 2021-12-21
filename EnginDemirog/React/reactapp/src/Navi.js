import React from 'react';
import {useState} from 'react';
import CartSummary from './CartSummary';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
  import {Link} from 'react-router-dom';

export default function Navi(props) {
const [state,setState]=useState({isOpen: false});
  const toggle=()=> {
    setState({
      isOpen: !state.isOpen
    });
  }
      return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Nortwind App</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink>
                  <Link to="form1">Form1 Demo1</Link>
                  </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink>
                  <Link to="form2">Form Demo2</Link>
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
             <CartSummary 
             cart={props.cart}
             removeFromCart={props.removeFromCart}
             />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }