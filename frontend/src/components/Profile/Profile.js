import './Profile.css';
import {useSelector} from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.session.user);

// const Profile = () => {
  return (
    <div className='profile-container'>
      <div className='profile-div'>
        Profile
        <div className='profile-pic'>
          Your face header
        </div>
          <div className='profile-details'>
            <p>username: {user.username} </p>
            <p>email: {user.email} </p>
            <p>gold: {user.gold} </p>
            <p>cards: {user.ownedCards.length}</p>
          </div>
        <div className='gach'>
        Your money here
        </div>
      </div>



      <div className="card-collection">
        Collection
      </div>
    </div>
  )
};

export default Profile;
