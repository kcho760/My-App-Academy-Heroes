import "./MainPage.css";
import CardLogo from '../../assets/images/CardLogo.png'

function MainPage() {
    return (
      <>
      
        <div className="MainSplashDiv">
          <div className="logoHolder">
              <div className="gameIntro">
                <div className="introText">
                  Welcome to MyAppAcademy Hero; 
                  where Trading Card Games (TCG) meets coding.
                </div>
              </div>
            <img src={CardLogo} className="cardLogo1" alt="none"></img>
            <img src={CardLogo} className="cardLogo2" alt="none"></img>
          </div>
        </div>
        <footer>
          Copyright &copy; 2023 My App Academy Hero
        </footer>
      </>
    );
  }
  
  export default MainPage;