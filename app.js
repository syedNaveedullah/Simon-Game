let gameSeq = [];
let userSeq = [];

let btns = ["orange", "red", "green", "purple"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#startBtn");

// ===========================================================
// sounds

let gameOver = document.getElementById("gameOver");
let gameClick = document.getElementById("gameClick");
let userClick = document.getElementById("userClick");
// let startSound = document.getElementById("startSound");
let startSound = new Audio("sounds/StartBtn.mp3");  // aaisa bhi add karsakte sound
let highScoreSound = new Audio("sounds/highScoreSound.mp3");

// =========================================================

startBtn.addEventListener("click", function () {
  restart();
  if (started == false) {
    started = true;
    console.log("game started");
    startSound.play();
    levelUp();
  }
});

// document.addEventListener("keypress", function () {
//   if (started == false) {
//     started = true;
//     console.log("game started");

//     levelUp();
//   }
// });
// ======================================================================
function gameFlash(btn) {
  btn.classList.add("flash");

  gameClick.play();

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 150);
}
// ====================================================
function userFlash(btn) {
  btn.classList.add("userFlash");

  userClick.play();

  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 150);
}

// =======================================================
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4); //it will generate b/t 0 to 4 but not 4 means 0,1,2,3.only
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);

    gameFlash(randBtn);
}

// ===========================================================

function btnPress() {
  // console.log(this)
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  // console.log(userSeq);

  checkAns(userSeq.length - 1);
}

// =====================================================

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// =====================================================

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    h2.innerHTML = `Game Over!! <b>Your Score is ${level}</b> <br> Click on Start Button for New Game`;
    console.log("Game Over!");
    document.querySelector(".headings").style.backgroundColor = "red";
    gameOver.play(); //==============================================
    setTimeout(function () {
      document.querySelector(".headings").style.backgroundColor = "rgb(30, 29, 29)";
      document.querySelector("body").style.backgroundImage = "url(background.jpg)";
    }, 4000);

    Highest();
    restart();
  }
}

function restart() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

let highScore = document.querySelector("#highScore")
let h3 = document.querySelector("#Highest");

function Highest(){
  let highestScore = parseInt(highScore.innerText);
  if(level > highestScore){
    highScore.innerText = level;

      document.querySelector("body").style.backgroundImage = "url(highScoreImg.jpg)";
      highScoreSound.play();
   }else{
    highScore.innerText = highestScore;
   }
}



let howBtn = document.querySelector(".howBtn");
let how = document.querySelector(".how");

howBtn.addEventListener("click", ()=>{
  if(how.style.display != 'none'){
    how.style.display = 'none';
  }else{
    how.style.display = 'block';
  }
})