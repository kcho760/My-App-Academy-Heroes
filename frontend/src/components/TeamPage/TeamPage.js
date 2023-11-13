import React from "react";
import "./TeamPage.css";
import "../NavBar/NavBar.css";

import { ReactComponent as LinkedInIcon } from "../../assets/images/linkedin_icon.svg";
import { ReactComponent as GitHubIcon } from "../../assets/images/github_icon.svg";
import { ReactComponent as WellFoundIcon } from "../../assets/images/wellfound_icon.svg";

import KevinPP from "../../assets/images/pp_kevin.jpg";
import JiaminPP from "../../assets/images/pp_jiamin.jpg";
import HongPP from "../../assets/images/pp_hong.jpg";
import HenryPP from "../../assets/images/pp_henry.jpg";

function TeamPage() {
  return (
    <div className="team-modal-container">
      <div className="team-tabs-wrapper">
        <div className="team-tabs">
          <div className="pos-info">
            <h2 className="team-pos">Team Lead</h2>
            <h2>Kevin Cho</h2>
          </div>
          <img
            src={KevinPP}
            className="teamPhoto"
            alt="none"
          />
          <div className="link-section">
            <a
              href="https://www.linkedin.com/in/kevin-cho-441a34b1/"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/kcho760"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://wellfound.com/u/kevin-cho-43"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <WellFoundIcon />
            </a>
          </div>
        </div>

        <div className="team-tabs">
          <div className="pos-info">
            <h2 className="team-pos">Flex Lead</h2>
            <h2>Jiamin Zou</h2>
          </div>
          <img
            src={JiaminPP}
            className="teamPhoto"
            alt="none"
          />
          <div className="link-section">
            <a
              href="https://www.linkedin.com/in/jiaminzou95/"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/Jiamin-Zou"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://wellfound.com/u/jiamin-zou-1"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <WellFoundIcon />
            </a>
          </div>
        </div>

        <div className="team-tabs">
          <div className="pos-info">
            <h2 className="team-pos">Backend Lead</h2>
            <h2>Hong Chen</h2>
          </div>
          <img
            src={HongPP}
            className="teamPhoto"
            alt="none"
          />
          <div className="link-section">
            <a
              href="https://www.linkedin.com/in/hong-chen-5779311a5/ "
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/ssomy3800"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://wellfound.com/u/hong-chen-20"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <WellFoundIcon />
            </a>
          </div>
        </div>
        <div className="team-tabs">
          <div className="pos-info">
            <h2 className="team-pos">Frontend Lead</h2>
            <h2>Henry Lin</h2>
          </div>
          <img
            src={HenryPP}
            className="teamPhoto"
            alt="none"
          />
          <div className="link-section">
            <a
              href="https://www.linkedin.com/in/henry-lin-40b590177/"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/herilynn"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://wellfound.com/u/henry-lin-21"
              target="_blank"
              rel="noreferrer"
              className="team-social-icon"
            >
              <WellFoundIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
