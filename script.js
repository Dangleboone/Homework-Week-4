// Tons of help from working with study group with anthony and travis
// Creating the quiz variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const GAMEOVER = document.getElementById('GAMEOVER-btn');
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// Creation of a question and answer array below

//ideas for questions brainstormed with anthony
const questions = [{
        question: 'Inside which HTML tag do we put the JavaScript?',
        answers: [
            { text: '<javascript>', correct: false },
            { text: '<js>', correct: false },
            { text: '<java>', correct: false },
            { text: '<script>', correct: true },
        ]

    },
    {
        question: 'Where is the correct spot to insert <script> tag?',
        answers: [
            { text: 'the <head> tag', correct: false },
            { text: 'the <body>', correct: false },
            { text: 'either the <head> or <body> tag', correct: true },
            { text: 'the <h1> tag', correct: false },
        ]

    },
    {
        question: 'Which is the way to connect to an external javascript file?',
        answers: [
            { text: '<script id = "script.js">', correct: false },
            { text: "<script src = 'script.js'>", correct: true },
            { text: "<script href = 'script.js'>", correct: false },
            { text: "<script external = 'script.js'>", correct: false },
        ]

    },
    {
        question: 'The external JavaScript file MUST contain a <script> tag.',
        answers: [

            { text: 'True', correct: false },
            { text: 'False', correct: true },
        ]

    },
    {
        question: "How do you write 'Hello World!' in an alert box",
        answers: [
            { text: "msgBox('Hello World!')", correct: false },
            { text: "prompt('Hello World!')", correct: false },
            { text: "msg('Hello World!')", correct: false },
            { text: "alert('Hello World!')", correct: true },
        ]

    }
];

// create undefined variables for new and current queries to be updated.
// More help from anthony here, had a lot of trouble with this code
let shuffledQuestions, currentQuestionsIndex;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    nextQ()
});

//timer function not displaying on page? can not figure out how to get this here
function timerFormat(time) {
    
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;
    //jquery learned later on but could not get timer working for this assignment.
    if (seconds > 10) {
        seconds = $(seconds);

    }
    return $(minutes).$(seconds);
}

function startQuiz() {
   
    startButton.classList.add('hide');
   
    shuffledQuestions = questions.sort(() => Math.random() - .5);
  
    currentQuestionsIndex = 0

    questionContainerElement.classList.remove('hide');
   
    nextQ();
}

function nextQ() {
    resetState()
  
    showQuestion(shuffledQuestions[currentQuestionsIndex]);

}

function showQuestion(question) {
    questionElement.innerText = question.question;

   

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        //make if correct to change check agains the correct databases, and lett the css engage...???
        if (answer.correct) {
            button.dataset.correct = answer.correct

        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);

    })

};

function resetState() {
   
    clearStatusClass(document.body)
  

    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
};

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide')

    } else {
        GAMEOVER.classList.remove('hide');
        GAMEOVER.innerText = 'GAME OVER';
        GAMEOVER.addEventListener('click', ScoreCard)

        questionContainerElement.classList.add('hide');

    } 
};
// look for a way to add high school without asking at end? we could not find this in time
function ScoreCard() {
    let name = prompt("Please Enter your name")
    let score = prompt("Enter your score")
    alert(name + " Your High Score is  " + score)
    GAMEOVER.classList.add("hide")
    startButton.classList.remove('hide');
    startButton.innerText = "Restart"

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};