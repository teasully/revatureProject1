import { Component } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

class Layout extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    );
  }
}

export default Layout;