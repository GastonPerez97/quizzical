import { useState } from "react";
import "./App.css";
import QuestionList from "./components/QuestionList/QuestionList";
import shapeTop from "./assets/images/shape-1.png";
import shapeBottom from "./assets/images/shape-2.png";


const App = () => {
	const [gameStarted, setGameStarted] = useState(false);

	const handleGameStart = () => {
		setGameStarted(prevState => !prevState);
	}

	return (
		<main>
			<img className="shape-top" src={shapeTop} alt="Shape Top" />
			<img className="shape-bottom" src={shapeBottom} alt="Shape Bottom" />
			
			{
				gameStarted
				?
					<section className="game-container">
						<QuestionList />
					</section>
				:
					<section className="game-intro">
						<h1 className="game-title">Quizzical</h1>
						<p>Answer the questions and test your knowledge!</p>
						<button className="btn-primary" onClick={handleGameStart}>Start Quiz</button>
					</section>
			}
		</main>
	);
}

export default App;
