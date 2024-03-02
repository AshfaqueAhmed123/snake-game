//game constansts and variables
let board = document.querySelector(".board");
let scorebox = document.getElementById("scorebox");
let inputDir = { x: 0, y: 0 };
let speed = 6;
let score = 0;
let highScore = 0;
let lastpaintTime = 0;
let snakearr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };


let foodSound  = new Audio('./material/food2.mp3');
let gameOverSound  = new Audio('./material/gameover.mp3');
// let move = new Audio('./material/move.mp3');


// game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
      // console.log(ctime);
      return;
    }
    lastpaintTime = ctime;
    gameEngine();
  }
  function isCollide(snake) {
    // if snake bumb into it self
    for (let i = 1; i < snakearr.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        if(gameOverSound != null){
          gameOverSound.play();
        }
        return true;
      }
    }
    // if snake bumb into the wall
    if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y >= 18 ||
      snake[0].y <= 0
    ) {
      return true;
      
    }
  }
  
  function gameEngine() {
    // part 1 updating the snake array
    if (isCollide(snakearr)) {
      inputDir = { x: 0, y: 0 };
      if(gameOverSound != null){
        gameOverSound.play();
      }
      alert(
        `game over! with the score:${score}.  press any ArrowKey key to play again.`
      );
      snakearr = [{ x: 13, y: 15 }];

      localStorage.setItem('highScore',highScore);

      score = 0;
      scorebox.innerHTML = "score:0";
    }
    //if you have eaten the food increment the score and regenerate the food
  
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
      if(foodSound != null){
        foodSound.play();
      }
      score += 1;
      if(highScore <= score){
        highScore = score-1;
        highScore+= 1;
      }
      scorebox.innerHTML = "score" + ":" + score;
      highscorebox.innerHTML = "high-score" + ":" + highScore;

      let a = 2;
      let b = 16;
      snakearr.unshift({
        x: snakearr[0].x + inputDir.x,
        y: snakearr[0].y + inputDir.y,
      });
      food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random()),
      };
    }
    // moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
      snakearr[i + 1] = { ...snakearr[i] };
    } 
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;
    
    // part 2 displaying the snake and food
    // display snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
      let snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = e.x;
      snakeElement.style.gridColumnStart = e.y;
      if (index === 0) {
        snakeElement.classList.add("head");
      } else {
        snakeElement.classList.add("snake");
      }
      board.appendChild(snakeElement);
    });
    // display food
    let foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.y;
    foodElement.style.gridRowStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
  }
  
// game main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 }; // start the game
  // switch (e.key) {
  //   case "ArrowUp":
  //     inputDir.x = -1;
  //     inputDir.y = 0;
  //     break;
  //   case "ArrowDown":
  //     inputDir.x = 1;
  //     inputDir.y = 0;
  //     break;
  //   case "ArrowLeft":
  //     inputDir.x = 0;
  //     inputDir.y = -1;
  //     break;
  //   case "ArrowRight":
  //     inputDir.x = 0;
  //     inputDir.y = 1;
  //     break;
  
  //   default:
  //     break;
  // }
  
  // info :- in this block we added snake running limitations while running snake cannot go in the opposite direction 
  
  if(e.key == "ArrowUp" && inputDir.x != 1){
    inputDir.x = -1;
    inputDir.y = 0;
    move.play();
  }
  else if(e.key == "ArrowDown" && inputDir.x != -1){
    inputDir.x = 1;
    inputDir.y = 0;
    move.play();
  }
  else if(e.key == "ArrowLeft" && inputDir.y != 1){
    inputDir.x = 0;
    inputDir.y = -1;
    move.play();
  }
  else if(e.key == "ArrowRight" && inputDir.y != -1){
    inputDir.x = 0;
    inputDir.y = 1;
    move.play();
  }

});


// SPEED BTN FUNCTIONALITIES

// onclick show menu
let speedbtn = document.getElementById("speedbtn");
speedbtn.addEventListener("click", () => {
  let list = document.querySelector(".sp");
  if (list.classList.contains("hidden")) {
    list.classList.remove("hidden");
    let s = document.querySelector('.settings').style.height ='54.5vh'
  } else {
    list.classList.add("hidden");
    let s = document.querySelector('.settings').style.height ='auto'
  }
});
let li = document.querySelectorAll("li");
let nli = Array.from(li).forEach((e) => {
  e.addEventListener("click", (t) => {
    if (e.innerHTML == "very low") {
      speed = 1;
    } else if (e.innerHTML == "low") {
      speed = 3;
    } else if (e.innerHTML == "medium") {
      speed = 6;
    } else if (e.innerHTML == "high") {
      speed = 8;
    } else if (e.innerHTML == "very high") {
      speed = 12;
    } else {
      speed = 6;
    }
  });
});

// after selecting speed closing the menu
let lis = document.querySelectorAll("li");
let newli = Array.from(lis);
for (let i = 0; i < newli.length; i++) {
  newli[i].addEventListener("click", () => {
    let menu = document.querySelector(".sp");
    menu.classList.add("hidden");
    let s = document.querySelector('.settings').style.height ='auto'
  });
}

// high score fucntionality 
window.onload = function (){
  if(localStorage.getItem('highScore') != null){
    highscorebox.innerHTML = "high-score" + ":" + localStorage.getItem("highScore")
    highScore = Number.parseInt(localStorage.getItem("highScore"))
    return
  }
  localStorage.setItem("highScore",0);
}