import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./NavBar.css";
import MernLogo from '../../assets/images/MernLogo.png';
import GamePage from '../GamePage/GamePage';
import InstructionModal from '../Instructions';
import TeamPageModal from '../TeamPage';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
      return <Redirect to="/" />
  }

  const {pathname} = useLocation() 

  // console.log(pathname)

  const getLinks = () => {
    
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/profile'} className={`profile-link ${pathname==="/profile" ? "active-link" : ""}`}>Profile</Link>
          <Link to={'/game'} className={`game-link ${pathname==="/game" ? "active-link" : ""}`}>Game</Link>
          {/* <Link to={'/tweets/new'}>Write a Tweet</Link> */}
          <button onClick={logoutUser} className="logout-button">Logout</button>
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
      {<InstructionModal/>}
      {<TeamPageModal/>}
      { getLinks() }
    </div>
    </>
  );
}

export default NavBar;