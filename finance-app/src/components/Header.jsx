import React from 'react'
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>Finance App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={NavLink} to='/'>Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to='/transactions'>Transactions</Nav.Link>
            <Nav.Link as={NavLink} to='/budgets'>Budgets</Nav.Link>
            <Nav.Link as={NavLink} to='/profile'>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
