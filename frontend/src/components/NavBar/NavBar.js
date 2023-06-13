import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./NavBar.css";
import MernLogo from '../../assets/images/MernLogo.png'

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
      return <Redirect to="/" />
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/tweets'}>All Tweets</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/tweets/new'}>Write a Tweet</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/login'} className = "loginButton">LOGIN</Link>
          <Link to={'/signup'} className = "signupButton">SIGNUP</Link>
        </div>
      );
    }
  }

  return (
    <>
    <div className='navHeader'>
      {/* <h1>Chirper </h1> */}
      <a href='/'>
          <img src={MernLogo} className='logo' alt="Logo" />
      </a>
      { getLinks() }
    </div>
    </>
  );
}

export default NavBar;