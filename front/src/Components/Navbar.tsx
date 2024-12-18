import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserAction, UserContext, UserDispatch } from "../UserContext";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {

  const userContext = useContext(UserContext);
  const userDispatch = useContext(UserDispatch);

  return (
    <>
      <BNavbar className="bg-body-tertiary">
        <Container>
          <BNavbar.Brand as={Link} to="/">Home</BNavbar.Brand>
          <BNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {userContext.authenticated ? <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link> : <></>}
            </Nav>
            <Nav>
              {userContext.authenticated ? (
                <>
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => {
                      userDispatch?.({ action: UserAction.LOGOUT });
                    }}>Log Out</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                </>
              )}
            </Nav>
          </BNavbar.Collapse>
        </Container>
      </BNavbar>
    </>
  );
}

export default Navbar;