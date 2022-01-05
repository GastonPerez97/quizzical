import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./QuestionList.css";
import Question from "../Question/Question";
import getQuestions from "../../services/getQuestions";

const QuestionList = () => {
	const [questionsArray, setQuestionsArray] = useState([]);

	useEffect(() => {
		getQuestions().then(questions => setQuestionsArray(questions));
	}, []);

	const questionsElements = questionsArray.map(question => (
		<Question
			key={nanoid()}
			question={question.question}
			correctAnswer={question.correct_answer}
			incorrectAnswers={question.incorrect_answers}
			difficulty={question.difficulty}
			category={question.category}
		/>
	));

	return (
		<>
			{questionsElements}
		</>
	);
}

export default QuestionList;