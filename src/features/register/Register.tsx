import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { logout, register } from '../auth/authSlice';

import styles from './Register.module.css';
import { Error } from '../../app/models/error.interface';

const Register = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({email, password}))
    .then(() => {
      navigate('/');
    })
    .catch((error: Error) => alert(error) )
  }

  return (
    <div className='container'>
      <div className={styles.formContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder='Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className={styles.loginBtn}>Register</button>
        </form>
        <div className={styles.backToLogin}>Already have an account? Go to <Link to="/">Login</Link></div>
      </div>
    </div>
  );
}

export default Register;