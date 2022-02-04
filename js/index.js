window.addEventListener('DOMContentLoaded', () => {

  const startContainer = document.querySelector('#startContainer');
  const btnStart = document.querySelector('#btnStart');
  const btnSubmit = document.querySelector('#btnSubmit');
  const btnReset = document.querySelector('#btnReset');
  const score = document.querySelector('#score');
  const timer = document.querySelector('#time');
  const timerStatus = document.querySelector('#timerStatus');
  const quizWrap = document.querySelector('#quizWrap');

  // SetInterval reference so it can be cleared at anytime.
  let quizTimer;

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1,
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia?',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the capital of South Korea?',
      o: ['Sydney', 'Seoul', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the capital of New Zealand?',
      o: ['Sydney', 'Wellington', 'Melbourne', 'Perth'],
      a: 1,
    }
  ];

  // button to start the quiz and start countdown from 10 seconds
  btnStart.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    startContainer.style.display = 'none';
    countdownTimer(10);
  });

  // button to submit the quiz, display the score and stop the countdown timer if needed
  btnSubmit.addEventListener('click', () => {
    const result = calculateScore()
    displayScore(result)
    clearInterval(quizTimer)
    console.log('timer stopped')
    timerStatus.innerHTML = 'Form submitted. Timer has stopped.';
  });

  // button to reload the page
  btnReset.addEventListener('click', () => {
    window.location.reload();
  })

  // function to display the quiz questions and answers from the object
  const displayQuiz = () => {
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q${index + 1} - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // function to display the score to the user
  const displayScore = (result) => {
    score.innerHTML = `Your Score is ${result} / ${quizArray.length}`
  }

  // function to calculate the user's score and return it
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        const liElement = document.querySelector('#' + li);
        const radioElement = document.querySelector('#' + r);
        // highlight the li element if it is the correct answer
        if (quizItem.a === i) {
          liElement.style.backgroundColor = "green"
        }
        // increment the score if the loop index is the same as quiz answer and the radio button is checked
        if (radioElement.checked && quizItem.a === i) {
          score++
        }
      }
    });
    return score;
  };

  // function to countdown from 'time' and end the quiz and display the score when no time remains
  // 'time' is a variable to allow for the countdown time to be adjusted if required
  // Inspired by this answer https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
  const countdownTimer = (time) => {
    quizTimer = setInterval(() => {
      console.log('time remaining', time)
      if (time-- === 0) {
        clearInterval(quizTimer)
        const result = calculateScore()
        displayScore(result)
      } else {
        timer.innerHTML = `${time} seconds`
      }
    }, 1000);
  }

  // run the displayQuiz function
  displayQuiz();
});
