import React from 'react';
import PropType from 'prop-types';

const Login = (props) => (
  <nav className="login">
    <h2>Inventory login</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button className="twitter" onClick={() => props.authenticate('Twitter')}>Log in with Twitter</button>
    <button className="google" onClick={() => props.authenticate('Google')}>Log in with Google</button>
  </nav>
)

Login.propTypes = {
  authenticate: PropType.func
}

export default Login;