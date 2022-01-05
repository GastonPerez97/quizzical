import "./Question.css";
import { nanoid } from "nanoid";
import { decode } from 'html-entities';

const Question = props => {
	const incorrectAnswersElements = props.incorrectAnswers.map(answer => (
		<button key={nanoid()} className="question-btn">{ decode(answer) }</button>
	));

	const correctAnswerElement =
		<button key={nanoid()} className="question-btn">CORRECTA: { decode(props.correctAnswer) }</button>
	
	incorrectAnswersElements.push(correctAnswerElement);

	let answersElements = incorrectAnswersElements.sort(() => Math.random() - 0.5);

	return (
		<article className="question-container">
			<h3 className="question-text">{ decode(props.question) }</h3>
			{ answersElements }
		</article>
	);
}

export default Question;