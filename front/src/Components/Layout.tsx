import { Component } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import { UserProvider } from "../UserContext";

class Layout extends Component {
  render() {

    return (
      <div className="container">
        <UserProvider>
          <Navbar />
          <Outlet />
        </UserProvider>
      </div>
    );
  }
}

export default Layout;