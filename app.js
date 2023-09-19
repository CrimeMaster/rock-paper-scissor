// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
},0);


// DOM
const container = document.querySelector(".container");
// const btnHurray = document.querySelector(".play__again__hurray")
const btnHurray = document.querySelector(".hurray")
const btnRules = document.querySelector(".rules-btn");
const btnNext = document.querySelector(".next-btn")
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");


const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
const compScoreNumber = document.querySelector(".compScore__number");
let score = 0;
let compscore = 0;

scoreNumber.innerText =  getlocalStoragePlayerScore();
compScoreNumber.innerText = getlocalStorageCompScore();

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 0);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      btnNext.classList.toggle("hidden");
      keepScore(1);
      
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
    
      keepScoreComp(1);
    } else {
      resultText.innerText = "draw";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  });
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  scoreNumber.innerText =  localStoragePlayer(point);
  
}
function keepScoreComp(point) {
  compScoreNumber.innerText  = localStorageComputer(point);
}

function localStoragePlayer(point)
{
  var localPlayer = Number(localStorage.getItem("playerScore")) + point;
  localStorage.setItem("playerScore", localPlayer);
  console.log("playerScore: " + localStorage.getItem("playerScore"));
  return localStorage.getItem("playerScore");
}
function localStorageComputer(point)
{
  
  var localPlayer = Number(localStorage.getItem("computerScore")) + point;
  localStorage.setItem("computerScore", localPlayer);
  console.log("compScore: " + localStorage.getItem("computerScore"));
  return localStorage.getItem("computerScore");
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  
  location.reload();
  
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
  
});


// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnNext.addEventListener("click", () => {
  btnNext.classList.toggle("hidden");
  localStorage.clear();
  scoreNumber.innerText =  0;
  compScoreNumber.innerHTML = 0;
 
  container.classList.toggle("hidden");
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  btnHurray.classList.toggle("hidden")
  
});
btnHurray.addEventListener("click", () => {
  
  location.reload();
  
});

//local Storage rules

function getlocalStoragePlayerScore()
{
  
  if(localStorage.getItem("playerScore") == null)
    return 0;
  else
    return localStorage.getItem("playerScore");
}
function getlocalStorageCompScore()
{
 
  if(localStorage.getItem("computerScore") == null)
    return 0;
  else
    return localStorage.getItem("computerScore");
}
