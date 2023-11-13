import React from "react";
import "./TeamPage.css";
import "../NavBar/NavBar.css";

import { ReactComponent as LinkedInIcon } from "../../assets/images/linkedin_icon.svg";
import { ReactComponent as GitHubIcon } from "../../assets/images/github_icon.svg";
import { ReactComponent as WellFoundIcon } from "../../assets/images/wellfound_icon.svg";

function TeamPage() {
  return (
    <div className="team-modal-container">
      <div className="team-tabs-wrapper">
        <div className="team-tabs">
          <div className="pos-info">
            <h2>Team Lead</h2>
            <h2>Kevin Cho</h2>
          </div>
          <img
            src="https://media.licdn.com/dms/image/D4E03AQG0aVcOclSSfw/profile-displayphoto-shrink_800_800/0/1690827138168?e=1696464000&v=beta&t=qVOXMyZXqRYcAI9m2eUBKiBK74gYC79D8S3dCslZzsg"
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
            <h2>Flex Lead</h2>
            <h2>Jiamin Zou</h2>
          </div>
          <img
            src="https://media.licdn.com/dms/image/C5603AQFquSA1WwtuwQ/profile-displayphoto-shrink_200_200/0/1622231453344?e=1692835200&v=beta&t=slhpoyvo6u1h4zXm5dEgQY14pnRHlPF0z25a6uIhDis"
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
            <h2>Backend Lead</h2>
            <h2>Hong Chen</h2>
          </div>
          <img
            src="https://media.licdn.com/dms/image/D4E03AQELXDBSjifD5A/profile-displayphoto-shrink_200_200/0/1687233362344?e=1692835200&v=beta&t=7OxRu_nSrpiNkeNKQz_I5P5K5NC2t9v4dqu3-IEepOk"
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
            <h2>Frontend Lead</h2>
            <h2>Henry Lin</h2>
          </div>
          <img
            src="https://media.licdn.com/dms/image/D4E03AQGUqDjUtMVwHQ/profile-displayphoto-shrink_200_200/0/1687049792940?e=1692835200&v=beta&t=Xz5Edx5-7PEM8fNBFr0StOsPwgMelBTwQZ7xy_fV2Fg"
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
