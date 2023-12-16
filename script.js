
// ==========***********===================*********=============================

let a=0;
let b=0;

const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let editedPlayer = 0; 
  let activePlayer = 0;
  let currentRound = 1;  


const player = [
    {
      name: "",
      symbol: "X",
    },
    {
      name: "",
      symbol: "O",
    },
  ];

//   const gameImputData = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//   ];

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");
const startNewGameBtnElement = document.getElementById("start-game-btn");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");

const gameAreaElement = document.getElementById("active-game");
const gameFieldElements = document.querySelectorAll("#game-board li");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener("click", selectGameField);
  }
  


editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameBtnElement.addEventListener("click", startNewGame);


// ============================================================================

function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid; //+'1'=> 1
    playerConfigOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
  }

  function closePlayerConfig() {
    playerConfigOverlayElement.style.display = "none";
    backdropElement.style.display = "none";
    errorsOutputElement.textContent = "";
    formElement.firstElementChild.lastElementChild.value="";
  }

  function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enterPlayerName = formData.get("username").trim();
  
    if (!enterPlayerName) {
      errorsOutputElement.textContent = "Please enter valid name";
      return;
    }
    const updatedPlayerDataElement = document.getElementById(
      "player-" + editedPlayer + "-data"
    );
    updatedPlayerDataElement.children[1].textContent = enterPlayerName;
    console.dir(updatedPlayerDataElement);
  
    player[editedPlayer-1].name=enterPlayerName;
  
    closePlayerConfig();
    
  }

  function startNewGame() {
    if (player[0].name === "" || player[1].name === "") {
      alert("Please set custom player names for both player");
      return;
    }
    gameAreaElement.style.display = "block";
    activePlayerNameElement.textContent = player[activePlayer].name;
    startNewGameBtnElement.style.display ="none";
  }



//   ===============*******=====================*******=================

//   ====================reStartdata=====================remove============

function Reset() {  
    var dropDown1 = document.getElementById("cars1");  
      dropDown1.classList.remove("disabled1","disabled2");
      dropDown1.textContent= " ";
    var dropDown2 = document.getElementById("cars2");  
    dropDown2.classList.remove("disabled1","disabled2");
    dropDown2.textContent= " ";
    var dropDown3 = document.getElementById("cars3");  
    dropDown3.classList.remove("disabled1","disabled2");
    dropDown3.textContent= " ";
    var dropDown4 = document.getElementById("cars4");  
    dropDown4.classList.remove("disabled1","disabled2");
    dropDown4.textContent= " ";
    var dropDown5 = document.getElementById("cars5");  
     dropDown5.classList.remove("disabled1","disabled2");
     dropDown5.textContent= " ";
    var dropDown6 = document.getElementById("cars6");  
    dropDown6.classList.remove("disabled1","disabled2");
    dropDown6.textContent= " ";
    var dropDown7 = document.getElementById("cars7");  
    dropDown7.classList.remove("disabled1","disabled2");
    dropDown7.textContent= " ";
    var dropDown8 = document.getElementById("cars8");  
    dropDown8.classList.remove("disabled1","disabled2");
    dropDown8.textContent= " ";
    var dropDown9 = document.getElementById("cars9");  
    dropDown9.classList.remove("disabled1","disabled2");
    dropDown9.textContent= " ";


  }

//   ====================reStartdata=====================remove============


function switchPlayer() {
    if (activePlayer === 0) { 
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }
    activePlayerNameElement.textContent = player[activePlayer].name;
  }
  
  function selectGameField(event) {
    const selectedColumn = event.target.dataset.col - 1;
    const selectedRow = event.target.dataset.row - 1;
  
    if (gameData[selectedRow][selectedColumn] > 0) {
      alert("Please select empty field");
      return;
    }

    event.target.textContent = player[activePlayer].symbol;
    event.target.classList.add("disabled1");
  
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    // console.log(gameData);

     winnerId = checkForGameOver();
    if (winnerId !== 0) {
      endGame(winnerId);
    }
    currentRound++;

    if (activePlayer === 0) {
    
    
        activePlayer = 1;
        event.target.classList.add("disabled1");
      } else {
        activePlayer = 0;
        event.target.classList.add("disabled2");
      }
      activePlayerNameElement.textContent = player[activePlayer].name;

    // switchPlayer();
  }

//   logic

function checkForGameOver() {
    //Rows
    if (
      gameData[0][0] > 0 &&
      gameData[0][0] === gameData[0][1] &&
      gameData[0][1] === gameData[0][2]
    ) {
      return gameData[0][0];
    }
  
    if (
      gameData[1][0] > 0 &&
      gameData[1][0] === gameData[1][1] &&
      gameData[1][1] === gameData[1][2]
    ) {
      return gameData[1][0];
    }
    if (
      gameData[2][0] > 0 &&
      gameData[2][0] === gameData[2][1] &&
      gameData[2][1] === gameData[2][2]
    ) {
      return gameData[2][0];
    }
    //For Columns
    if (
      gameData[0][0] > 0 &&
      gameData[0][0] === gameData[1][0] &&
      gameData[1][0] === gameData[2][0]
    ) {
      return gameData[0][0];
    }
  
    if (
      gameData[0][1] > 0 &&
      gameData[0][1] === gameData[1][1] &&
      gameData[1][1] === gameData[2][1]
    ) {
      return gameData[0][1];
    }
    if (
      gameData[0][2] > 0 &&
      gameData[0][2] === gameData[1][2] &&
      gameData[1][2] === gameData[2][2]
    ) {
      return gameData[0][2];
    }
    //for diagonals
  
    if (
      gameData[0][0] > 0 &&
      gameData[0][0] === gameData[1][1] &&
      gameData[1][1] === gameData[2][2]
    ) {
      return gameData[0][0];
    }
    if (
      gameData[2][0] > 0 &&
      gameData[2][0] === gameData[1][1] &&
      gameData[1][1] === gameData[0][2]
    ) {
      return gameData[2][0];
    }
  
    if (currentRound === 9) {
      return -1;
    }
    return 0;
  }


  
  const reStartGame = document.getElementById("restart");

function endGame(winnerId) {
  gameOverElement.style.display = "block";
  backdropElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = player[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw";
  }
  reStartGame.style.display = "block";
}

// ==================restart=================



function reStartGamefn() {
  gameOverElement.style.display = "none";
  backdropElement.style.display = "none";

  const winnerName = player[winnerId - 1].name;
  activePlayerNameElement.textContent = winnerName;


  currentRound = 1;
  
  if (winnerId === 1) {
    a++;
    const updateElement1 = document.getElementById("point-update-1");
    updateElement1.textContent = a;
  }

  if (winnerId === 2) {
    b++;
    const updateElement1 = document.getElementById("point-update-2");
    updateElement1.textContent = b;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
    }
  }

  winnerId = 0;
  Reset();
  startNewGame();
  switchPlayer();
}

reStartGame.addEventListener("click", reStartGamefn);
console.log(reStartGame);
