import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./QuestionList.css";
import Question from "../Question/Question";
import getQuestions from "../../services/getQuestions";

const QuestionList = ({ gameOptions, handleGameStart, handleNoQuestionsError }) => {
	const [questionsArray, setQuestionsArray] = useState([]);
	const [checkAnswerBtn, setCheckAnswerBtn] = useState(false);
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);

	const allQuestionsAnswered = questionsArray.every(question => question.selectedAnswer !== "");

	useEffect(() => {
		getQuestions(gameOptions).then(questions => {
			if (questions.length === 0) {
				handleGameStart();
				handleNoQuestionsError(true);
				return;
			} else {
				handleNoQuestionsError(false);
			}

			return setQuestionsArray(questions.map(question => {
				return {
					...question,
					id: nanoid(),
					selectedAnswer: ""
				}
			}));
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (questionsArray.length !== 0 && allQuestionsAnswered) {
			let correctAnswers = 0;
			
			questionsArray.forEach(question => {
				if (question.correct_answer === question.selectedAnswer)
					correctAnswers++;
			});

			setCorrectAnswersCount(correctAnswers);
			setCheckAnswerBtn(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionsArray]);


	const handleSelectAnswer = (questionId, answer) => {
		if (!isGameOver) {
			setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => (
					question.id === questionId
						? {...question, selectedAnswer: answer }
						: question
				))
			));
		}
	}

	const checkAnswers = () => {
		if (allQuestionsAnswered) {
			setIsGameOver(true);

			setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => ({...question, showAnswer: true }))
			));
		}
	}

	const resetGame = () => {
		setCheckAnswerBtn(false);
		setIsGameOver(false);
		handleGameStart();
	}

	const questionElements = questionsArray.map(question => (
		<Question
			key={question.id}
			id={question.id}
			question={question.question}
			correctAnswer={question.correct_answer}
			incorrectAnswers={question.incorrect_answers}
			difficulty={question.difficulty}
			category={question.category}
			selectedAnswer={question.selectedAnswer}
			showAnswer={question.showAnswer}
			handleSelectAnswer={handleSelectAnswer}
		/>
	));

	return (
		<section className="questionList-container">
			{questionElements}

			<div className="bottom-container">
				{isGameOver &&
					<h3 className="correct-answers-text">
						You scored {correctAnswersCount}/5 correct answers
					</h3>
				}

				<button
					className={`btn-primary ${checkAnswerBtn
												? "btn-check-answers"
												: "btn-check-answers-disabled"}`}
					onClick={isGameOver ? resetGame : checkAnswers}
				>
					{isGameOver ? "Play again" : "Check answers"}
				</button>
			</div>
		</section>
	);
}

export default QuestionList;