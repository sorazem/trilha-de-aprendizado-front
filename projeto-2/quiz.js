//Audios
const theme = document.getElementById('theme');
const fail = document.getElementById('fail');
const ls4 = document.getElementById('lightsaber4');

var timerContainer = document.getElementById('time');
var scoreContainer = document.getElementById('score');
var progressContainer = document.getElementById('progress');
var quizContainer = document.getElementById('quiz');

var score = 0;
var timeInterval;
var timeHolder;
var questionIndex = 0;

function populate(){
    quizContainer.innerHTML = "";

    if(questionIndex == questions.length){
        progressContainer.innerHTML = "";
        timerContainer.innerHTML = "";
        let result = [];
        result.push(`<h3>Obrigada por jogar!</h3><p>Sua pontuação foi... ${score}!</p>`);

        if(score < 6){
            result.push(`<p>Você ainda tem muito o que aprender, padawan.</p>`);
            quizContainer.innerHTML = result.join('');
            fail.play();
        }
        if(score < 9 && score > 5){
            result.push(`<p>O caminho adiante ainda lhe trará novos ensinamentos.</p>`);
            quizContainer.innerHTML = result.join('');
        }
        if(score > 8){
            result.push(`<p>A força é forte em você. Está destinado a grandes feitos.</p>`);
            quizContainer.innerHTML = result.join('');
        }
    }
    else{
        startTimer();
        showQuestionAndOptions();
        showProgress();
    }
    
}

function showProgress(){
    progressContainer.innerHTML = "Pergunta " + (questionIndex+1) + " de " + questions.length;
}

function showQuestionAndOptions(){
    let output = [];
    let answers = [];
    for(letter in questions[questionIndex].answers){
        answers.push(
            `<button id="${letter}" value="${letter}>
                <span id="choice${letter}">${questions[questionIndex].answers[letter]}</span>
            </button>`
        );
    }

    output.push(
        `<div class="question"> ${questions[questionIndex].question} </div>
        <div class="answers"> ${answers.join('')} </div>`
    );

    quizContainer.innerHTML = output.join('');

    for(letter in questions[questionIndex].answers){
        guess(letter);
    }
}

function startTimer(){
    timeInterval = 16;
    timeHolder = setInterval(countdown, 1000);
}

function countdown(){  
    timeInterval--;
    timerContainer.innerHTML = "Tempo: " + timeInterval;
    if(timeInterval == 0){
        clearTimeout(timeHolder);
        questionIndex++;
        populate();
    }
}

function guess(id){
    let button = document.getElementById(id);
    button.onclick = function(){
        ls4.play();
        if(id == questions[questionIndex].correctAnswer){
            console.log('yay');
            clearTimeout(timeHolder);
            score++;
            questionIndex++;
            populate();
        }
        else{
            clearTimeout(timeHolder);
            questionIndex++;
            populate();
        }
    }
}

function startQuiz(){
    theme.play();
    populate();
}