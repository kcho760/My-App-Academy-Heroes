const RECEIVE_QUESTIONS = "questions/RECEIVE_QUESTIONS";

const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const fetchQuestions = () => async (dispatch) => {
  try {
    const res = await fetch("/api/questions");
    const questions = await res.json();
    const formattedQuestions = questions.reduce((acc, question) => {
      acc[question.id] = question;
      return acc;
    }, {});

    dispatch(receiveQuestions(formattedQuestions));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return (console.log(err));
    }
  }
};

const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...action.questions };
    default:
      return state;
  }
};

export default questionsReducer;
