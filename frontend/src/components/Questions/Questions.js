import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../store/questions";

const Questions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => Object.values(state.questions));

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  return <div>Questions</div>;
};

export default Questions;
