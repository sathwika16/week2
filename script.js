// script.js

document.getElementById('quiz-button').addEventListener('click', function() {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer.style.display === 'none' || quizContainer.style.display === '') {
        quizContainer.style.display = 'block';
        quizContainer.innerHTML = `
            <h3>Quiz Time!</h3>
            <p>1. What is the name of the guide?</p>
            <input type="text" id="question1">
            <p>2. What year was the game released?</p>
            <input type="number" id="question2">
            <button onclick="checkQuiz()">Submit</button>
            <div id="quiz-result"></div>
        `;
    } else {
        quizContainer.style.display = 'none';
    }
});

function checkQuiz() {
    const answer1 = document.getElementById('question1').value;
    const answer2 = document.getElementById('question2').value;
    let result = '';
    
    if (answer1.toLowerCase() === 'paimon' && answer2 == '2017') {
        result = 'Congratulations! You got all answers correct.';
    } else {
        result = 'Some answers are incorrect. Try again!';
    }
    
    document.getElementById('quiz-result').innerText = result;
}
