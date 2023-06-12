import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../store/session";
import WebcamCapture from "../Webcam";
import "./SignupForm.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      image,
    };

    dispatch(signup(user));
  };

  return (
    <>
      {image ? (
        <div>
          <img src={image} alt="Captured selfie" />
          <button onClick={() => setImage(null)}>Retake</button>
        </div>
      ) : (
        <WebcamCapture onCapture={setImage} />
      )}
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Sign Up Form</h2>

        <div className="errors">{errors?.email}</div>
        <label>
          <span className="email-label-su">Email</span>
          <input
            type="text"
            className="email-SU"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
        </label>
        <div className="errors">{errors?.username}</div>
        <label>
          <span className="username-label">Username</span>
          <input
            className="username-SU"
            type="text"
            value={username}
            onChange={update("username")}
            placeholder="Username"
          />
        </label>
        <div className="errors">{errors?.password}</div>
        <label>
          <span className="password-label-su">Password</span>
          <input
            type="password"
            className="password-SU"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
        </label>
        <div className="errors">
          {password !== password2 && "Confirm Password field must match"}
        </div>
        <label>
          <span className="confirmPW">Confirm Password</span>
          <input
            type="password"
            className="confirmPW-SU"
            value={password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
          />
        </label>
        <input
          className="signup"
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
        />
      </form>
    </>
  );
}

export default SignupForm;
