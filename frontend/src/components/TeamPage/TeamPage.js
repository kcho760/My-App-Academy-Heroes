import React, { useState } from "react";
import './TeamPage.css';
import '../NavBar/NavBar.css'

function TeamPage() {

  const [activeTab, setActiveTab] = useState("KevinTab");

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  };

  return (
    <div className="team-modal-container">
      <div className="team-tabs">
        
        <button className={`tab ${activeTab === "KevinTab" && "active"}`}
          onClick={() => handleTabClick("KevinTab")}>
            GroupLead
        </button>

        <button className={`tab ${activeTab === "JiaminTab" && "active"}`}
          onClick={() => handleTabClick("JiaminTab")}>
            FlexLead
        </button>

        <button className={`tab ${activeTab === "HongTab" && "active"}`}
          onClick={() => handleTabClick("HongTab")}>
            BackendLead/CheerLead
        </button>

        <button className={`tab ${activeTab === "HenryTab" && "active"}`}
          onClick={() => handleTabClick("HenryTab")}>
            FrontendLead/ChairLead
        </button>

      </div>
      <div className="tab-contents">
        {activeTab === "KevinTab" && (
          <div className="team-tab">
              <p className="photo">Photo here</p>
                <div className="teamDescription"> 
                    <p className="li-space">Eat your broccoli.</p>
                    <p className="li-space">Was voted into TeamLead for being the most mature and being the oldest.</p>
                </div>              
          </div>
        )}
        {activeTab === "JiaminTab" && (
          <div className="team-tab">
              <p className="photo">Photo here</p>              
              <div className="teamDescription">               
              <p className="li-space">Study your CSS. </p>
              <p>Wanted to be FlexLead to do the least amount of work but ended up breaking</p>
              <p>his back carrying; at least carrying me.</p>              
              
              </div>
          </div>
        )}
        {activeTab === "HongTab" && (
          <div className="team-tab">
              <p className="photo">Photo here</p>
              <div className="teamDescription">
              <p className="li-space"> Are you sure? </p>
              <p className="li-space"> The OG Cheerleader </p>         
              </div>
          </div>
        )}
        {activeTab === "HenryTab" && (
          <div className="team-tab">
              <p className="photo">Photo here</p>  
              <div className="teamDescription"> 
              <p className="li-space">I'm just here for decoration.</p>
              <p> You read correctly; I was in charge of keeping the seat warm and occasional </p>
              <p>spellcheck.</p>
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamPage;