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

function formHandler(){
  $("form").on("submit", function(event) {
    event.preventDefault();
    submitAnswer();
 });  
}

function startQuiz() {
/* changes from startPage to questionPage */
  $(".startButton").on("click", function() {
    $(".startPage").remove();
    $("header").append(quizSummary());
    $(".mainQuiz").html(questionPage());
    formHandler();
    onChangeEventHandler();
});
}

const onChangeEventHandler = () => {
    $('input[name=answerOption]').change((event) => {
        let isChecked = $('input[name=answerOption]:checked');
        let isNotChecked = $('input[name=answerOption]:not(:checked)');
        
        $(isChecked).closest('label').addClass('onInputChecked');
         $(isNotChecked).closest('label').removeClass('onInputChecked');
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
  onChangeEventHandler();
}

function nextQuestionHandler() {
  $(".nextQuestionButton").on("click", function(event) {
    updateQuestionNumber();
    generateNextQuestion();
  });
}

function resultButtonHandler() {
  $(".resultButton").on("click", function(event) {
    resultPage();
  })
}


function submitAnswer() {
    //finds user input
    let userAnswer = $('input[name="answerOption"]:checked').val();
    let testAnswer = `${STORE[questionNumber].correctAnswer}`;
    if(questionNumber < 9) {
      if(userAnswer === testAnswer) {
      $(".mainQuiz").html(corrAnswerFeedback());
      nextQuestionHandler();
      increaseScore();
    } else {
      $(".mainQuiz").html(wrongAnswerFeedback());
      nextQuestionHandler();
    }
  } else {
    console.log(questionNumber)
      if(userAnswer === testAnswer) {
        $(".mainQuiz").html(lastCorrAnswer());
        resultButtonHandler();
        increaseScore();
      } else {
        $(".mainQuiz").html(lastWrongAnswer());
        resultButtonHandler();
      }
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
  return `<div class="feedback">
            <div class="lastFeedbackCorrect">
              <img class="feedbackImage" src="${STORE[questionNumber].pic}" alt="${STORE[questionNumber].alt}">
              <h3>Yippee-kai-yay! You are right!</h3>
            </div>
          <button class="resultButton" type="button">Result</button>
        </div>`;
}

function lastWrongAnswer() {
/* generates page for last wrongAnswer */
return `<div class="feedback">
          <div class="feedbackFalse">
            <img class="feedbackImage" src="${STORE[questionNumber].pic}" alt="${STORE[questionNumber].alt}">
            <h3>That's wrong. ${STORE[questionNumber].correctAnswer} is correct.</h3>
            </div>
          <button class="resultButton" type="button">Result</button>
        </div>`;
}

function resultPage() {
  $(".quizSummary").remove();

/* generates page for end result  */
  if(score == 10) {
     $(".mainQuiz").html(`<div class="resultPage result1">
          <img class="resultImage" src="images/Score10.jpg" alt="John McClane doing something awesome">
          <p>${score} points! You are tough, you also watched Die Hard 5. RESPECT!</p>
          <button class="restartButton" type="button">Try again</button>
      </div>`);

  } else if(score > 5) {
    $(".mainQuiz").html(`<div class="resultPage result2">
          <img class="resultImage" src="images/Score5.jpg" alt="John McClane doing something awesome">
          <p>${score} points! Okay, not that bad.</p>
          <button class="restartButton" type="button">Try again</button>
      </div>`);

  } else if(score > 3) {
    $(".mainQuiz").html(`<div class="resultPage result3">
          <img class="resultImage" src="images/Score3.jpg" alt="John McClane doing something awesome">
          <p>${score} points! What is wrong with you? Try again!</p>
          <button class="restartButton" type="button">Try again</button>
        </div>`);

  } else if(score === 1) {
    $(".mainQuiz").html(`<div class="resultPage result3">
          <img class="resultImage" src="images/badResult.jpg" alt="John McClane doing something awesome">
          <p>${score} point! Disgrace!</p>
          <button class="restartButton" type="button">Try again</button>
        </div>`);

  } else {
    $(".mainQuiz").html(`<div class="resultPage result4">
          <img class="resultImage" src="images/badResult.jpg" alt="John McClane doing something awesome">
          <p>${score} points! Disgrace!</p>
          <button class="restartButton" type="button">Try again</button>
        </div>`);
  }
  restartButtonHandler();
}


function restartButtonHandler() {
  $(".restartButton").on("click", function(event) {
    restartQuiz();
  });
}


function restartQuiz() {
    location.reload();
}

$(startQuiz());

