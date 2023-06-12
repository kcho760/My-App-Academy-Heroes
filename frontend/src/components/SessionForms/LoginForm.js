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
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <span className='email-label'>Email</span>
        <input type="text"
        className='email-Login'
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>
        <span className='password-label'>Password</span>
        <input type="password"
          className='password-Login'
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
      <input
        className='login'
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />
    </form>
  );
}

export default LoginForm;