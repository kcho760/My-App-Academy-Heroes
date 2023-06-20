import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login, clearSessionErrors } from "../../store/session";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logingIn, setLogingIn] = useState(false);
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
  const demoLogin = async (e) => {
    setLogingIn(true);
    e.preventDefault();
    try {
      dispatch(login({ email: "demo@gmail.com", password: "password" }));
    } finally {
      setLogingIn(false);
    }
  };

  const handleSubmit = async (e) => {
    setLogingIn(true);
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
    } finally {
      setLogingIn(false);
    }
  };

  return (
    <div className="session-page">
      <div className="session-form-container">
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
          <button
            className={`session-btn ${logingIn ? "processing-signup" : ""}`}
            disabled={!email || !password || logingIn}
          >
            {logingIn ? "Processing" : "Log In"}
          </button>
        </form>
        <button
          className={`session-btn ${logingIn ? "processing-signup" : ""}`}
          onClick={demoLogin}
          disabled={logingIn}
        >
          {logingIn ? "Processing" : "Demo Log In"}
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
