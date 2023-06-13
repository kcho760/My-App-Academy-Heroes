import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login, clearSessionErrors } from '../../store/session';
import "./LoginForm.css";

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  return (
    <>
      <h2 className='login-header'>Log In Form</h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        <span className='email-label'>Email</span>
        <input type="text"
        className='input-Login'
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      <div className="errors">{errors?.email}</div>
      </label>
      <label>
        <span className='password-label'>Password</span>
        <input type="password"
          className='input-Login'
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      <div className="errors">{errors?.password}</div>
      </label>
      <input
        className='login'
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />
    </form>
  </>
  );
}

export default LoginForm;