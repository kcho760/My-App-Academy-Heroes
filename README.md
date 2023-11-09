[My App Academy Heroes](https://my-app-academy-heroes-zer2.onrender.com)


![pic 1](/frontend/src/assets/images/1.png)
![pic 2](/frontend/src/assets/images/2.png)
![pic 3](/frontend/src/assets/images/3.png)

# My App Academy Heroes

My App Academy Heroes is a Mern stack web based game where the player can fight enemies by answering questions, earn gold by defeating enemies, and obtain different cards to build their decks for powering up. 

## User Auth
- User is able to sign up, log in, and log out
- Contents locked if user is not logged in
- Demo user

## User Profile
- Able to see player avatar, golds and card collection
- Able to select from collected cards

## Cards
- Users are able to obtain new cards by spending gold
- Able to see their collection of Cards
- Able to be selected in user profile as part of their deck for use in game
- Able to use card in game, effect will last for the round the player is in

## Answer Questions
- Pulls questions from QuizAPI in the backend and sends to frontend
- User is able to answer question
    - Upon correct answer: obtain golds, damage enemy
    - Upon Incorrect answer: user will take damage
- When player HP reaches 0, the selected card in player deck will be deleted
- Every 5th round is a boss stage, upon defeating boss, deck card useability will be reset

## Generate Profile Avatar
- User can takes picture using webcam which gets sent to the backend and then to AILabTools and then to Amazon to be stored and linked to user
- Default picture will be provided if user doesn’t want to use webcam

## Technologies, Libraries
- React
- MongoDB
- ExpressJs
- NodeJs
- AWS S3
- AILabTools API
- QuizAPI
- HTML
- CSS

## Team:
- Team Leader: Kevin Cho
- Front-end Lead: Henry Lin
- Back-end Lead: Hong Chen
- Flex Lead: Jiamin Zou

