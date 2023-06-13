import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login, clearSessionErrors } from "../../store/session";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const demoLogin = (e) => {
    e.preventDefault();
    setEmail("demo@gmail.com");
    setPassword("password");
    handleSubmit(e);
  };

  return (
    <div className="session-page">
      <h2 className="session-header">Log In Form</h2>
      <form className="session-form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label>
            <span className="email-label">Email</span>
            <input
              type="text"
              className="input-Login"
              value={email}
              onChange={update("email")}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.email}</div>
        </div>

        <div className="input-field">
          <label>
            <span className="password-label">Password</span>
            <input
              type="password"
              className="input-Login"
              value={password}
              onChange={update("password")}
              placeholder="Password"
            />
          </label>
          <div className="errors">{errors?.password}</div>
        </div>
        <input
          className="session-btn"
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
        <input
          className="session-btn"
          type="submit"
          value="Demo Login"
          onClick={demoLogin}
        />
      </form>
    </div>
  );
}

export default LoginForm;
