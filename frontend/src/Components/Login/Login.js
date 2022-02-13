import React, { useState } from 'react';
import './Login.css';

function Login(props) {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  
  const handleClick = () => {
    props.handleLogin(admin, password);
    setAdmin("");
    setPassword("");
  };

  return (
    <div className='login'>
      <h1 className='title'>Welcome Back</h1>
      <p className='sub-title'>For Restaurant Staff only</p>
      <div className='input-container'>
        <input  
          className='admin-input'
          type="email"
          placeholder='Admin Id*'
          value={admin}
          onChange={e => setAdmin(e.target.value)}
        />
        <input 
          className='admin-input'
          type="password"
          placeholder='Password*'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input 
          className='submit'
          type="button"
          value="LOGIN"
          onClick={handleClick}
        />
      </div>
    </div>  
  );
}

export default Login;