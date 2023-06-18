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
        
        <button className={`tab ${activeTab === "KevinTab" && "activeTab"}`}
          onClick={() => handleTabClick("KevinTab")}>
            GroupLead
        </button>

        <button className={`tab ${activeTab === "JiaminTab" && "activeTab"}`}
          onClick={() => handleTabClick("JiaminTab")}>
            FlexLead
        </button>

        <button className={`tab ${activeTab === "HongTab" && "activeTab"}`}
          onClick={() => handleTabClick("HongTab")}>
            BackendLead/CheerLead
        </button>

        <button className={`tab ${activeTab === "HenryTab" && "activeTab"}`}
          onClick={() => handleTabClick("HenryTab")}>
            FrontendLead/ChairLead
        </button>

      </div>
      <div className="tab-contents">
        {activeTab === "KevinTab" && (
          <div className="team-tab">
              <p className="photo">Kevin Li</p>
              <img src="https://myappacademyheroes.s3.amazonaws.com/648b38a7f3bf866b98b62d5c.jpg" width={450} height={250} className="teamPhoto"/>
                <div className="teamDescription"> 
                    <p className="li-space">Eat your broccoli.</p>
                    <p className="li-space">Was voted into TeamLead for being the most mature and being the oldest.</p>
                    
                    <a href="https://www.linkedin.com/?original_referer=" target="_blank">
                      <img src="data:image/png;base64,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" className = "linkedin-button"/>
                    </a>

                    <a href="https://github.com/kcho760" target="_blank">
                      <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" className = "git-button"/>
                    </a>

                </div>              
          </div>
        )}
        {activeTab === "JiaminTab" && (
          <div className="team-tab">
              <p className="photo">Jiamin Zou</p> 
              <img src="https://myappacademyheroes.s3.amazonaws.com/648b55a17c3c986f005b1c1d.jpg" width={450} height={250} className="teamPhoto"/>                           
              <div className="teamDescription">               
              <p className="li-space">Study your CSS. </p>
              <p>Wanted to be FlexLead to do the least amount of work but ended up breaking his back carrying; at least carrying me. </p>             
              
              <a href="https://www.linkedin.com/?original_referer=" target="_blank">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEUCdLP///8AbK+30uXF2+oAcrI2hrzq9Pk/jcAAbbAAaa4Ab7GZv9t7q8/b6/MAcLEAZ630+vzO4e5moMoAd7XH3OuNuNevzeJtpMzn8fdTlsSgw91BjcAmgbocfbjv9/t0qc+FstRQlMScwdxPsNUdAAAGMklEQVR4nO3dW3uiMBAGYBKJSlAigiCiWNr//x8X7cFDgRmsbiY8813tDZZ3gSTkhCduUqx917Mubkne5Z9xvkvlGJLu8rhFGNehNN44YmRYx/fC3AuU7RN7YlTgTW6Fbyvb5/T06OW1cCdtn88LIncX4XaMwIa4/RaW2va5vCi6/BQW4ZjKmOuocHYWJqHtM3lZwuQkLMZ6j56iZ40wC2yfxgsTZI1wOpaWTFvMXHjxaMuZU1QYe9E468LvyMjbjFy48fyRC31vMnLhhIWuh4Xuh4Xuh4Xuh4Xuh4XuZ7BQhaGUQWiceWseJjRSTrdZmZfZdqodGcYZIgxlMrkMWh3zdyeMeKFZLWe3I48iSlb0b1a0UM4j8TvrinxnMlao6xbfKQn17mSkcFV2AIWoiVc2OGEPUIiM9lVECWXWAxRiS3pUACM0771AIQ6Uaw2EUMn7WuI+EeX7FCEMFgBQiDfCdQYsVCYGhQXh8hQWhjUIbGpFuk8iLFy1tWXus6H7JIJCVSGAQiiyDVRQaLYo4c5dYdDXnLkkI1uagkLpo4Q52dIUFOo1Skh3mBUWYorS5kWRbGH6LCHd6gJ+DjcoId0uSViYo4Ql2TcouD6sUcKtu7WF2aOEB3drfE8fEUDCb4iwUGIaNYSnNyLeD6cIYfqfTveBIN7xNdxuo9tmw/XTHFy+hKi+Ngl11FDupkH2l/a3vid0C1IP2+cd9vUnRpJsXXgKTmiqbmJEtwPjHOTIjPK6blSf+oo37Oia6ujNID4s4w0YIVV6//syTg6EK8KvDBjHN3p/U/fH+VQTv0NPGTQXw2gvKTfFMT5G/mIX0i5DvzNwPo0ygdSBkVoGxIvQnzw0J8oR22d41pf7YaH7YaH7YaH7ISps2hRNm+kpzSZywnO7MFRpOq3SVIVayz/OuCYlVE2Dt0oWfnT8msITH4v1ZJEcGvPD01lQwgBIe1cbcNCvUzZSJXl7b0m8zubywTnXGGFVLnrzkbX97UP/UR+724NCvc97J1/Nyrl8ZF09pkcY7NY/tvyCmQMHLa6vvJEJYqw5euu4XV4unP1RqPQON5YuZls99F6lIAxT3IyWc6LpwILRvlBp3Kyrnwzs3rMuVBo3UeAqm0FdtLaFKkU+gdcp0gFEy0JTYcbQf//BCl/e2BWqx4DNVcT3hlkVKg+aI9+ZCN0ZbVOoAtyswNbk2BLVojAYXopeBztHyaJQJ38Bihh5m9oTZgG8yqE3yPvUnrD++BtQIPcosyd8sJ64Cm5Oqz3hEzLHXESnhaipWE4LUetY3BYuEbep20LMCgG3haKCb1PHhTV8mzou9OHb1HGhGL9wDj6ItIRxk2FHwA8iFWHsZ7tDFZrQq/a1j2cipv+SEK63Rp8G0dQppvn3r41iugIv9KAgLHb6bshFhUH/RhU/icEuKQLCsm3YTGloq4qvgEWNfeGyY5+iELOSBbETgHVh3fkgBah+HHCJtW3hpOfDIXoCHw+/I1oWHvtnISB+AWy3WRb2d3pils2B1YVdIXB6iBVXYkZbCL2jYzYDIP0cxlA/C2bnGGjdnFUhuCQMs7qzoiyEB1cCuN94CtwHVoXQfz/qQXwHnmWbQsTuUoj6AtoZx6YQsyxwCQsJX8MFvMTdwG1TqOltU7iFuwIRhSn0KzaFe4QQbtVQFiI6rJVxWogYOVIh2CkFLZW3KER9Zwqu8pd0hUfMbiHgvpuUhQXmu6BuCzETDZwWonbtYSELWchCFrKQhSxkIQtZyEIWspCFLGQhC1nIQhaykIUsZCELWchCFrKQhSxkIQtZyEIWspCFLGQhC1nIQhaysCWtO5aDX9nFzdX/HytKvHQK5aGjcJ8QBv82tHoK9eUABeWJRw3+lSfsbeJ4WOh+WOh+WOh+WOh+WOh+WOh+WOh+GqE/cqHvbUYu3HjRyIWRB+4L53SUij3xPmrhu/BEOebbVJaNMB70pTa3ooK4EYoasxeOmwlqcRLGts/jhYnPwt7dfJ3OeSvi82a93TsyOx193vf8czvitzES9Zu4CEXWsXG4u1Grr53rv7eU9lM5KqOsNuJW2FxG9eCHoenFaHX59MD1tuB5ksoxJE2ut3O/2/i8WPuuZ13ckv4BMoOTvjvVjU0AAAAASUVORK5CYII=" className = "linkedin-button"/>
              </a>

              <a href="https://github.com/Jiamin-Zou" target="_blank">
                <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" className = "git-button"/>
              </a>

              </div>
          </div>
        )}
        {activeTab === "HongTab" && (
          <div className="team-tab">
              <p className="photo">Hong Chen</p>
              <img src="https://myappacademyheroes.s3.amazonaws.com/648b371815d853337ca15e6b.jpg" width={450} height={250} className="teamPhoto"/>
              <div className="teamDescription">
              <p className="li-space"> Are you sure? </p>
              <p className="li-space"> The OG Cheerleader </p>         
              
              <a href="https://www.linkedin.com/?original_referer=" target="_blank">
                <img src="data:image/png;base64,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" className = "linkedin-button"/>
              </a>

              <a href="https://github.com/ssomy3800" target="_blank">
                <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" className = "git-button"/>
              </a>

              </div>
          </div>
        )}
        {activeTab === "HenryTab" && (
          <div className="team-tab">
              <p className="photo">Henry Lin</p>  
              <img src="https://media.licdn.com/dms/image/D4E03AQGUqDjUtMVwHQ/profile-displayphoto-shrink_200_200/0/1687049792940?e=1692835200&v=beta&t=Xz5Edx5-7PEM8fNBFr0StOsPwgMelBTwQZ7xy_fV2Fg" width={450} height={250} className="teamPhoto"/>
              <div className="teamDescription"> 
                <p className="li-space">I'm just here for decoration.</p>
                <p> You read correctly; I was in charge of keeping the seat warm and occasional spellcheck.</p>
                
                <a href="https://www.linkedin.com/in/henry-lin-40b590177/" target="_blank">
                  <img src="data:image/png;base64,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" className = "linkedin-button"/>
                </a>

                <a href="https://github.com/herilynn" target="_blank">
                  <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" className = "git-button"/>
                </a>

              </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamPage;