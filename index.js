let questionNumber = 0;
let score = 0;

function questionPage() {
/* generates page with questions + answer options */
  return `<div class="questionAnswerForm">
        <h2>${STORE[questionNumber].question}</h2>
        <form class="answerOptions">
        <fieldset>
          <label class="answerOptionRadio">${STORE[questionNumber].answers[0]}
            <input type="radio" name="answerOption" value="${STORE[questionNumber].answers[0]}" required>
          </label>
          <label class="answerOptionRadio">${STORE[questionNumber].answers[1]}
            <input type="radio" name="answerOption" value="${STORE[questionNumber].answers[1]}" required>
          </label>
          <label class="answerOptionRadio">${STORE[questionNumber].answers[2]}
            <input type="radio" name="answerOption" value="${STORE[questionNumber].answers[2]}" required>
          </label>
          <label class="answerOptionRadio">${STORE[questionNumber].answers[3]}
            <input type="radio" name="answerOption" value="${STORE[questionNumber].answers[3]}" required>
          </label>
            <button class="answerSubmitButton" type="submit">Check it</button>
          </fieldset>
          </form>
        </div>`;
}

function quizSummary() {
  return `<ul class="quizSummary">
        <li>Question: <span class="questionNumber">1</span> of 10</li>
        <li>Score: <span class="score">0</span> of 10</li>
        </ul>`;
}

function startQuiz() {
/* changes from startPage to questionPage */
  $(".startButton").on("click", function() {
    $(".startPage").remove();
    $("header").append(quizSummary());
    $(".mainQuiz").html(questionPage());
    formHandler();
});
}

function formHandler(){
  $("form").on("submit", function(event) {
    event.preventDefault();
    submitAnswer();
    console.log('Submit works');
 });  
}

function updateQuestionNumber() {
  questionNumber += 1;
  $(".questionNumber").text(questionNumber +1);
}

function increaseScore() {
  score++;
  $(".score").text(score);
}


function generateNextQuestion() {
  $(".mainQuiz").html(questionPage());
    formHandler();
}

function nextQuestionHandler() {
  $(".nextQuestionButton").on("click", function(event) {
    updateQuestionNumber();
    generateNextQuestion();
  });
}

function submitAnswer() {
    //finds user input
    let userAnswer = $('input[name="answerOption"]:checked').val();
    let testAnswer = `${STORE[questionNumber].correctAnswer}`;
    console.log(userAnswer);
    if(userAnswer === testAnswer) {
      $(".mainQuiz").html(corrAnswerFeedback());
      nextQuestionHandler();
    } else {
      $(".mainQuiz").html(wrongAnswerFeedback());
      nextQuestionHandler();
    }
  };



function corrAnswerFeedback() {
/* generates page for corrAnswer */
  return `<div class="feedback">
          <div class="feedbackCorrect">
            <img class="feedbackImage" src="${STORE[questionNumber].pic}" alt="${STORE[questionNumber].alt}">
            <h3>Yippee-kai-yay! You are right!</h3>
            </div>
          <button class="nextQuestionButton" type="button">Next Question</button>
        </div>`;
}

function wrongAnswerFeedback() {
/* generates page for wrongAnswer */
return `<div class="feedback">
          <div class="feedbackFalse">
            <img class="feedbackImage" src="${STORE[questionNumber].pic}" alt="${STORE[questionNumber].alt}">
            <h3>That's wrong. ${STORE[questionNumber].correctAnswer} is correct.</h3>
            </div>
          <button class="nextQuestionButton" type="button">Next Question</button>
        </div>`;
}


function lastCorrAnswer() {
/* generates page for last corrAnswer */
  return
  ` <div class="feedback">
          <div class="lastFeedbackCorrect">
            <img class="feedbackImage" src="${STORE[questionNumber].pic}" alt="${STORE[questionNumber].alt}">
            <h3>Yippee-kai-yay! You are right!</h3>
            </div>
          <button class="resultButton" type="button">Result</button>
        </div>`;
}


function lastWrongAnswer() {
/* generates page for last wrongAnswer */
console.log("lastWrongAnswer works")
return
` <div class="feedback">
          <div class="lastFeedbackFalse">
            <img class="feedbackImage" src="${STORE[questionNumber].pic}" alt="${STORE[questionNumber].alt}">
            <h3>That's wrong. <span>"STORE[questionNumber].correctAnswer"</span> is correct.</h3>
            </div>
          <button class="resultButton" type="button">Result</button>
        </div>`;
}



function nextQuestion() {
  $(".nextQuestionButton").on("click", function() {
    console.log("nextQuestion works");
  });
  /* generates div for next question 
  updates questionNumber */

}

function finalScore() {
  $(".resultButton").on("click", function() {
    console.log("finalScore works");

  });  
}

function resultPage() {
/* generates page for end result  */
  if(score === 10) {
    return
      `<div class="resultPage result1">
          <img class="resultImage One" src="https://media.npr.org/assets/img/2013/02/14/df-07405r_rgb-1c87673232c2f1a1011d2bea5262ca07c95a7349-s800-c85.jpg" alt="John McClane doing something awesome">
          <p>${score} points! You are tough, you also watched Die Hard 5. RESPECT!</p>
          <button class="restartButton" type="button">Try again</button>
        </div>`;

  } else if(score > 5) {
    return 
    `<div class="resultPage result1">
          <img class="resultImage One" src="https://apps-cloud.n-tv.de/img/11002071-1373985628000/16-9/750/36823409.jpg" alt="John McClane doing something awesome">
          <p>${score} points! Okay, not that bad.</p>
          <button class="restartButton" type="button">Try again</button>
        </div>`;

  } else if(score > 3) {
    return 
    `<div class="resultPage result1">
          <img class="resultImage One" src="https://www.washingtonpost.com/resizer/mA_tRYVw4hTwCSpqcAlM1hWO_ow=/760x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/MCTXTKG2FA3X3JDEP2RBFXWKVI.jpg" alt="John McClane doing something awesome">
          <p>${score} points! What is wrong with you? Try again!</p>
          <button class="restartButton" type="button">Try again</button>
        </div>`;
  } else {
      `<div class="resultPage result1">
          <img class="resultImage One" src="https://tel.img.pmdstatic.net/fit/https.3A.2F.2Fphoto.2Eprogramme-tv.2Enet.2Fupload.2Fslideshow.2Fles-films-les-plus-marquants-de-bruce-willis-7763.2F1-die-hard-1-131753.2Ejpg/902x600/quality/65/die-hard-1-piege-de-cristal-1988.jpg" alt="John McClane doing something awesome">
          <p>${score} points! Disgrace!</p>
          <button class="restartButton" type="button">Try again</button>
        </div>`;
  }
}



function restartQuiz() {
/* changes from resultPage to questionPage */
  $(".restartButton").on("click", function(){
    //restarts quiz
  });
}



/*
$(function quiz() {
  /* contains all functions 
}) */

startQuiz();
nextQuestion();
finalScore();
restartQuiz();