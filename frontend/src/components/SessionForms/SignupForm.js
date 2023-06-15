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
  const [isLoading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      image,
    };

    setLoading(true);
    try {
      await dispatch(signup(user));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="session-page">
      {image ? (
        <div className="retake">
          <div>
            <img src={image} alt="Captured selfie" />
          </div>
          <button className="capture-button" onClick={() => setImage(null)}>
            Retake
          </button>
        </div>
      ) : (
        <WebcamCapture onCapture={setImage} />
      )}
      <div className="session-form-container">
        <h2 className="session-header">Sign Up Form</h2>
        <form className="session-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label>
              <span className="email-label-su">Email</span>
              <input
                type="text"
                className="input-SU"
                value={email}
                onChange={update("email")}
                placeholder="Email"
              />
            </label>
            <div className="errors">{errors?.email}</div>
          </div>

          <div className="input-field">
            <label>
              <span className="username-label">Username</span>
              <input
                className="input-SU"
                type="text"
                value={username}
                onChange={update("username")}
                placeholder="Username"
              />
            </label>
            <div className="errors">{errors?.username}</div>
          </div>

          <div className="input-field">
            <label>
              <span className="password-label-su">Password</span>
              <input
                type="password"
                className="input-SU"
                value={password}
                onChange={update("password")}
                placeholder="Password"
              />
            </label>
            <div className="errors">{errors?.password}</div>
          </div>

          <div className="input-field">
            <label>
              <span className="confirmPW">Confirm Password</span>
              <input
                type="password"
                className="input-SU"
                value={password2}
                onChange={update("password2")}
                placeholder="Confirm Password"
              />
            </label>
            {password !== password2 && (
              <div className="errors">Confirm Password field must match</div>
            )}
          </div>
          <button
            className={`session-btn ${isLoading ? "processing-signup" : ""}`}
            type="submit"
            disabled={
              !email ||
              !username ||
              !password ||
              password !== password2 ||
              isLoading
            }
          >
            {isLoading ? "Processing..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
