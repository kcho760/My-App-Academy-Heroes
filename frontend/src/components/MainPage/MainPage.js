import "./MainPage.css";
import CardLogo from '../Images/CardLogo.png'

function MainPage() {
    return (
      <>
      
        <div className="MainSplashDiv">A Twitter Clone
          <div>
              <div className="gameIntro">
                <div className="introText">
            <img src={CardLogo} className="cardLogo1"></img>
                  Welcome to MyAppAcademy Hero; 
                  where the goal of the game is to waste your time and take 
                  your money.
                </div>
              </div>
            <img src={CardLogo} className="cardLogo2"></img>
          </div>
        </div>
        <footer>
          Copyright &copy; 2023 My App Academy Hero
        </footer>
      </>
    );
  }
  
  export default MainPage;