import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { login, selectIsLoggedIn } from '../auth/authSlice';
import { getAllCharacters } from '../characters/charactersSlice';

import styles from './Login.module.css';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/characters');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({email, password}))
    .then(() => {
      navigate('/characters');
    });

  }

  const goToRegister = () => {
    navigate('/register');
  }

  return (
    <div className='container'>
      <div className={styles.formContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder='Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className={styles.loginBtn}>Login</button>
        </form>
        <button className={styles.registerBtn} onClick={goToRegister}>Create new account</button>
      </div>
    </div>
  );
}

export default Login;