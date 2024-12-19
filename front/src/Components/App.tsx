import { Component } from 'react';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";

import Layout from './Layout';
import Home from '../Pages/Home';
import Tickets from '../Pages/Tickets';
import AuthenticatedRoute from './AuthenticatedRoute';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import TicketProvider from './TicketContext';

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route path="tickets" element={<AuthenticatedRoute>
                <TicketProvider>
                  <Tickets />
                </TicketProvider>
              </AuthenticatedRoute>} />

            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;