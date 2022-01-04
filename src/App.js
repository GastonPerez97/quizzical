import "./App.css";
import shapeTop from "./assets/images/shape-1.png";
import shapeBottom from "./assets/images/shape-2.png";

function App() {
	return (
		<main>
			<img className="shape-top" src={shapeTop} alt="Shape Top" />
			<img className="shape-bottom" src={shapeBottom} alt="Shape Bottom" />

			<section className="game-intro">
				<h1 className="game-title">Quizzical</h1>
				<p>Answer the questions and test your knowledge!</p>
				<button className="btn-primary">Start Quiz</button>
			</section>
		</main>
	);
}

export default App;
