import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutContextProvider from './context/CheckoutContext';
import CheckoutContainer from './components/CheckoutContainer';
import Login from './components/Login';
import './App.scss';
import { LoginContext } from './context/LoginContext';

export default function App() {
  const { loggedinUser } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <CheckoutContextProvider>
        <Switch>
          <Route exact path="/">
            {loggedinUser ? <CheckoutContainer /> : <Login />}
          </Route>
          <Route path="/login" component={Login} />
        </Switch>
      </CheckoutContextProvider>
    </BrowserRouter>
  );
}
