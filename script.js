const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
console.log('Started')
startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0 
startButton.innerText = 'Restart'
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)    
    })
   
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
} 

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
} else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {question: 'What is the HTML tag under which one can write the JavaScript code?',
    answers: [
        { text: '<script>', correct: true },
        { text: '<javascript>', correct: false },
        { text: '<scripted>', correct: false },
        { text: '<js>', correct: false}
    ]
},
{
    question: 'What is the correct syntax for referring to an external script called “geek.js”?',
    answers: [
        { text: '<script name=”geek.js”>', correct: false },
        { text: '<script href=”geek.js">', correct: false },
        { text: '<script ref=”geek.js">', correct: false },
        { text: '<script src=”geek.js">', correct: true}
    ]
},
{
    question: 'Which of the following is not a reserved word in JavaScript?',
    answers: [
        { text: 'interface', correct: false },
        { text: 'throws', correct: false },
        { text: 'program', correct: true },
        { text: 'short', correct: false}
    ]
},
{
    question: 'Did you like my Quiz?',
    answers: [
        { text: 'yes', correct: true },
        { text: 'no', correct: false },
        { text: 'may be?', correct: false },
        { text: 'not bad', correct: false}
    ]
}
]
