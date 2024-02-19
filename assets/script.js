// Get references to HTML elements
var startButton = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question-text");
var answerButtons = document.getElementById("answers-container");
var timerElement = document.getElementById("timer");
var scoreMessage = document.getElementById("score-message");
var initialsInput = document.getElementById("initials-input");
var initialsForm = document.getElementById("initials-form");

// Hide initials form initially
initialsForm.style.display = "none";

// Initialize variables
var currentQuestionIndex = 0;
var timer;
var timeLeft = 60; // Initial time for the timer
var score = 0;

// Array of questions and answers
var questions = [
  {
    question:
      "Which CSS property is used to change the background color of an element?",
    answers: [
      "a.) color",
      "b.) background-color",
      "c.) text-color",
      "d.) font-color",
    ],
    correctAnswer: "b.) background-color",
  },
  {
    question: "What does the typeof operator return in JavaScript?",
    answers: [
      "a.) The type of a variable or expression",
      "b.) The value of a variable or expression",
      "c.) The length of a string",
      "d.) The position of an element in an array",
    ],
    correctAnswer: "a.) The type of a variable or expression",
  },
  {
    question: "What does the command git pull do?",
    answers: [
      "a.) Pushes changes to a remote repository",
      "b.) Fetches changes from a remote repository and merges them into the local branch",
      "c.) Commits changes to the local repository",
      "d.) Reverts changes in the local repository to a previous commit",
    ],
    correctAnswer:
      "b.) Fetches changes from a remote repository and merges them into the local branch",
  },
  {
    question:
      "Which of the following is a commonly used debugging tool in JavaScript?",
    answers: ["a.) Console", "b.) Cursor", "c.) Calculator", "d.) Compiler"],
    correctAnswer: "a.) Console",
  },
  // Add more questions here
];

// Event listener for the start button
startButton.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  // Hide start button
  startButton.style.display = "none";

  // Show question container
  questionContainer.classList.remove("hide");

  // Display first question and start timer
  showQuestion();
  startTimer();
}

// Function to start the timer
function startTimer() {
  timer = setInterval(function () {
    // Update timer element every second
    timeLeft--;
    timerElement.textContent = "Time: " + timeLeft;

    // End the quiz if time runs out
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000); // Run every 1 second
}

// Function to display a question
function showQuestion() {
  // Get current question from array
  var currentQuestion = questions[currentQuestionIndex];

  // Display question text
  questionElement.textContent = currentQuestion.question;
  answerButtons.innerHTML = ""; // Clear previous answer buttons

  // Create answer buttons for each possible answer
  currentQuestion.answers.forEach(function (answer) {
    var button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn"); // Add class for styling
    button.addEventListener("click", selectAnswer); // Add click event listener
    answerButtons.appendChild(button); // Append button to answer container
  });
}

// Function to handle user's answer selection
function selectAnswer(e) {
  var selectedButton = e.target; // Get the button that was clicked
  var currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    // Check if there's no more questions left
    endQuiz();
    return;
  }

  var correctAnswer = currentQuestion.correctAnswer;

  if (selectedButton.textContent === correctAnswer) {
    // If user selects correct answer
    score++;
    scoreMessage.textContent = "Correct!";
  } else {
    // If user selects incorrect answer
    timeLeft -= 10; // Subtract time penalty
    scoreMessage.textContent = "Wrong!";
  }

  // Proceed to next question or end quiz after displaying message
  setTimeout(function () {
    scoreMessage.textContent = ""; // Clear message
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(); // Show next question
    } else {
      endQuiz(); // End quiz if all questions answered
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timer); // Stop the timer
  questionContainer.style.display = "none"; // Hide the question container
  scoreMessage.textContent = "Your final score is " + calculateGrade(score);
  initialsForm.style.display = "block"; // Show the initials form
}

// Function to calculate the user's grade
function calculateGrade(score) {
  var totalQuestions = questions.length;
  var grade = (score / totalQuestions) * 100;
  return grade.toFixed(2) + "%";
}
