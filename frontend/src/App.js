import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import GamePage from "./components/GamePage/GamePage";
import Profile from "./components/Profile/Profile";

import { getCurrentUser } from "./store/session";
import GameOver from "./components/GamePage/GameOver";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <div className="app">
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <ProtectedRoute exact path="/game" component={GamePage} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          {/* for testing purpose, delete after!!! */}
          <ProtectedRoute exact path="/gameover" component={GameOver} />
        </Switch>
      </div>
    )
  );
}

export default App;
