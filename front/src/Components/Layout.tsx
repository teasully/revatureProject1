import { Component } from "react";
import { Outlet } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import Navbar from "./Navbar";
import { UserProvider } from "../UserContext";

class Layout extends Component {
  render() {

    return (
      <Container>
        <UserProvider>
          <Navbar />
          <Outlet />
        </UserProvider>

        <hr />

      </Container>
    );
  }
}

export default Layout;