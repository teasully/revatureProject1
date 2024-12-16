import { Component } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

import Layout from './Layout';
import Home from '../Pages/Home';
import Tickets from '../Pages/Tickets';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<p>Login</p>} />
              <Route path="register" element={<p>Register</p>} />

              <Route path="tickets" element={<Tickets />} />
            </Route>
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;