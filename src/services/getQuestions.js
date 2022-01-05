const getQuestions = () => {
	let apiUrl = "https://opentdb.com/api.php?amount=5";

	return fetch(apiUrl)
		.then(res => res.json())
		.then(data => data.results);
}

export default getQuestions;