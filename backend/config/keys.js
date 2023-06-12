module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
  quizApiKey: process.env.QUIZ_API_KEY,
  isProduction: process.env.NODE_ENV === 'production'
};
