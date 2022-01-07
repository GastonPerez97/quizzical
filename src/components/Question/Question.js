import "./Question.css";
import { nanoid } from "nanoid";
import { decode } from 'html-entities';
import { useState, useEffect } from "react"

const Question = props => {
	const [sortAnswersArray, setSortAnswersArray] = useState(true);

	useEffect(() => setSortAnswersArray(false), []);

	const incorrectAnswersElements = props.incorrectAnswers.map(answer => {
		const incorrectAnswerClassName = `
			${props.selectedAnswer === answer ? "question-btn-selected" : "question-btn"}
			${(props.showAnswer && props.selectedAnswer === answer) && "question-btn-incorrect"}
		`;

		return <button
			key={nanoid()}
			className={incorrectAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, answer)}
		>
			{ decode(answer) }
		</button>
	});

	const correctAnswerClassName = `
		${props.selectedAnswer === props.correctAnswer ? "question-btn-selected" : "question-btn"}
		${props.showAnswer && "question-btn-correct"}
	`;

	const correctAnswerElement =
		<button
			key={nanoid()}
			className={correctAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
		>
			{ decode(props.correctAnswer) }
		</button>
	
	incorrectAnswersElements.push(correctAnswerElement);

	const answersElements = sortAnswersArray
		? incorrectAnswersElements.sort(() => Math.random() - 0.5)
		: incorrectAnswersElements;

	return (
		<article className="question-container">
			<h3 className="question-text">{ decode(props.question) }</h3>
			{ answersElements }
		</article>
	);
}

export default Question;