import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  const navLinks = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Transactions',
      href: '/transactions',
    },
    {
      label: 'Budgets',
      href: '/budgets',
    },
    {
      label: 'Profile',
      href: '/profile',
    },
  ];

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Finance App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navLinks.map((link, i) => (
              <Nav.Link key={i} as={NavLink} to={link.href}>{link.label}</Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header