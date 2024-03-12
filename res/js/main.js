import { SnakeBody } from "./body/body.js";
import { Fruit } from "./fruit/fruit.js";
const fruit = new Fruit();
let body;

//asi neudělím nic nebaví
//víc song???
//sfx slider??
//backgroundy??
//víc skinů??
//fixnout ten kod aby nebyl jak od dementa napsanej

const skinShop = document.getElementById("skinShop");
const mainBody = document.getElementById("mainBody");

const gameButton = document.getElementById("gameButton");
const score = document.getElementById("score");
const tempScore = document.getElementById("tempScore");
const gameOver = document.getElementById("gameOver");
const mainScreenText = document.getElementById("mainScreenText");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const skinMainButton = document.getElementById("skinMainButton");
const mainScreenButton = document.getElementById("mainScreenButton");
const mainScreenButtonShop = document.getElementById("mainScreenButtonShop");

const skin1button = document.getElementById("skin1button");
const skin2button = document.getElementById("skin2button");

const eatSFX = new Audio("./res/audio/sfx/chramst.mp3");
const bgSong1 = new Audio("./res/audio/music/bgSong1.mp3");
const dyingSound = new Audio("./res/audio/sfx/dyingSound.mp3");

const CANVAS_SIZE = 700;

let scoreNumber = 0;
let scoreCoins = 0;
let gameLoopBool = false;
let bgAudioState = true;

let deltaX;
let deltaY;
let turnPosX = 0;
let turnPosY= 0;

let currentSkin = "skin1";

let bodyLenght = [];
let turnLocationsX = [];
let turnLocationsY = [];
let turnVelocityX = [];
let turnVelocityY = [];
let turnRotation = [];

const gameLoop = () => {
    if(gameLoopBool){

    resizeCanvas();

    update();
  
    render();
  
    window.requestAnimationFrame(gameLoop);

  }
};



const resizeCanvas = () => {
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
};

const update = () => {
  detectFruitCollision();
  detectSnakeCollision();
  bgAudioLoop(bgSong1);
};
const render = () => {
  bodyLenght.map((a) => {
    a.draw(ctx);
    a.move();
    bodyUpdate();
  });
  fruit.draw(ctx);
};

const detectFruitCollision = () => {
  if (
    (bodyLenght[0].position.x + body.size.width >= fruit.position.x &&
    bodyLenght[0].position.x <= fruit.position.x + fruit.size.width &&
    bodyLenght[0].position.y + body.size.height >= fruit.position.y &&
    bodyLenght[0].position.y <= fruit.position.y + fruit.size.height)
  ) {

    if(bodyLenght.length > 2){
      audioPlay(eatSFX, 1);
    }

    fruit.randomPosition();
    fruitLocationCheck();

    console.log("body+++");


    bodyLenght.pop();
    bodyLenght.push(new SnakeBody(currentSkin, "body"));
    positionMath();
    bodyLenght.push(new SnakeBody(currentSkin, "tail"));
    positionMath();

    scoreNumber++;
    tempScore.innerHTML = `Score: ${scoreNumber}`;
  }
};

const positionMath = () =>{
  bodyLenght[bodyLenght.length-1].position.x = bodyLenght[bodyLenght.length-2].position.x - body.size.width * Math.sign(bodyLenght[bodyLenght.length-2].velocity.x);
  bodyLenght[bodyLenght.length-1].position.y = bodyLenght[bodyLenght.length-2].position.y - body.size.height * Math.sign(bodyLenght[bodyLenght.length-2].velocity.y);
  bodyLenght[bodyLenght.length-1].velocity.x = bodyLenght[bodyLenght.length-2].velocity.x;
  bodyLenght[bodyLenght.length-1].velocity.y = bodyLenght[bodyLenght.length-2].velocity.y;
  bodyLenght[bodyLenght.length-1].rotationAngle = bodyLenght[bodyLenght.length-2].rotationAngle;
}

const fruitLocationCheck = () => {
  for (let n = 1; n < bodyLenght.length-1; n++) {
    if(
    bodyLenght[n].position.x + body.size.width >= fruit.position.x &&
    bodyLenght[n].position.x <= fruit.position.x + fruit.size.width &&
    bodyLenght[n].position.y + body.size.height >= fruit.position.y &&
    bodyLenght[n].position.y <= fruit.position.y + fruit.size.height) {
      fruit.randomPosition();
    }
  }
  
};

const bodyUpdate = () => {
  for (let n2 = 0; n2 <= turnVelocityX.length; n2++){
    for (let n = 1; n < bodyLenght.length; n++) {
      if (bodyLenght[n].position.x === turnLocationsX[0+n2] && bodyLenght[n].position.y === turnLocationsY[0+n2])
        {
        bodyLenght[n].velocity.x = turnVelocityX[0+n2];
        bodyLenght[n].velocity.y = turnVelocityY[0+n2];
        bodyLenght[n].rotationAngle = turnRotation[0+n2];
      }
    }

    if (
      bodyLenght[bodyLenght.length - 1].position.x === turnLocationsX[0] &&
      bodyLenght[bodyLenght.length - 1].position.y === turnLocationsY[0]
    ) {
      turnLocationsX.shift();
      turnLocationsY.shift();
      turnVelocityX.shift();
      turnVelocityY.shift();
      turnRotation.shift();
    }
  }
};



const detectSnakeCollision = () => {
  for (let n = 1; n < bodyLenght.length; n++) {
    if (
      bodyLenght[0].position.x + body.size.width - 20 >= bodyLenght[n].position.x 
      && bodyLenght[0].position.x + 20 <=bodyLenght[n].position.x + body.size.width 
      && bodyLenght[0].position.y + body.size.height - 20 >= bodyLenght[n].position.y 
      && bodyLenght[0].position.y + 20 <= bodyLenght[n].position.y + body.size.height
    ) {

      console.log("jauuuuu");
      audioPlay(dyingSound, 1);
      bgAudioState = false;
      scoreCoins+=scoreNumber;
      gameLoopBool = false;
      deathScreen();
    }
  }
};

const audioPlay = (sound, soundVolume) =>{
  if(sound == eatSFX){
    sound.load();
  }
  sound.play();
  sound.volume = soundVolume;
};

const bgAudioLoop = (song) =>{
  if(bgAudioState){
    song.play();
    song.volume = 0.05;
  }
  else{
    song.pause();
    song.currentTime = 0;
  }
};

const deathScreen = () =>{
  if(!gameLoopBool){
      canvas.width = 0;
      canvas.height = 0;
      canvas.style.border = 0;
      gameOver.innerHTML = "Game Over";
      gameOver.style.opacity = 1;

      tempScore.innerHTML = "Score this round: " + scoreNumber;
      score.innerHTML = "Score : " + scoreCoins;

      gameButton.style.width = "40%";
      gameButton.style.height= "10%";
      gameButton.style.padding = "0.5em 0 0.5em 0";
      gameButton.style.margin = "auto";
      gameButton.style.marginTop = "2em";
      gameButton.innerHTML = "Play Again? ";

      mainScreenButton.style.width = "40%";
      mainScreenButton.style.height= "10%";
      mainScreenButton.style.padding = "0.5em 0 0.5em 0";
      mainScreenButton.style.margin = "auto";
      mainScreenButton.style.marginTop = "2em";
      mainScreenButton.innerHTML = "Main Screen";
  }
};


skinMainButton.onclick = () =>{
  skinMenu();
}

mainScreenButton.onclick = () => {
  backMainMenu();
}
mainScreenButtonShop.onclick = () =>{
  backMainMenu();
}

skin1button.onclick =()=>{
  currentSkin = "skin1";
}
skin2button.onclick =()=>{
  buySkin("skin2",skin2button);
}

const skinMenu = () =>{
  mainBody.style.display = "none";
  skinShop.style.display = "block";
}


let buyBool = true; //array pokuid víc skinů
const buySkin = (skin,button) =>{
  if(scoreCoins >= 20 && buyBool){
    scoreCoins -=20;
    buyBool = false;
    button.innerHTML = "Equip";
    currentSkin = skin;
    return;
  }
  currentSkin = skin;
}

const backMainMenu = () =>{
  mainBody.style.display = "flex";
  skinShop.style.display = "none";

  mainScreenButton.innerHTML = "";
  mainScreenButton.style.width = 0;
  mainScreenButton.style.height= 0;
  mainScreenButton.style.padding = 0;
  mainScreenButton.style.margin = 0;

  gameButton.innerHTML = "PLAY";
  gameButton.style.width = "40%";
  gameButton.style.height= "10%";
  gameButton.style.padding = "0.5em 0 0.5em 0";
  gameButton.style.margin = "auto";
  gameButton.style.marginTop = "2em";
  
  skinMainButton.innerHTML = "SKINS";
  skinMainButton.style.width = "40%";
  skinMainButton.style.height= "10%";
  skinMainButton.style.padding = "0.5em 0 0.5em 0";
  skinMainButton.style.margin = "auto";
  skinMainButton.style.marginTop = "2em";
  
  mainScreenText.innerHTML = "EPIC SNAKE";
  mainScreenText.style.opacity = 1;

  gameOver.innerHTML = "";
  gameOver.style.opacity = 0;
}

const resetValues = () =>{ 
  gameOver.innerHTML = "";
  gameOver.style.opacity = 0;

  mainScreenText.innerHTML = "";
  mainScreenText.style.opacity = 0;

  tempScore.innerHTML = "Score: 0";
  score.innerHTML = "";
  
  gameButton.innerHTML = "";
  gameButton.style.width = 0;
  gameButton.style.height= 0;
  gameButton.style.padding = 0;
  gameButton.style.margin = 0;

  skinMainButton.innerHTML = "";
  skinMainButton.style.width = 0;
  skinMainButton.style.height= 0;
  skinMainButton.style.padding = 0;
  skinMainButton.style.margin = 0;

  mainScreenButton.innerHTML = "";
  mainScreenButton.style.width = 0;
  mainScreenButton.style.height= 0;
  mainScreenButton.style.padding = 0;
  mainScreenButton.style.margin = 0;
  
  canvas.style.border = "1px solid white";

  scoreNumber = 0;
  bgAudioState = true;
  deltaX;
  deltaY;

  turnPosX = 0;
  turnPosY= 0;

  bodyLenght = [];
  turnLocationsX = [];
  turnLocationsY = [];
  turnVelocityX = [];
  turnVelocityY = [];
  turnRotation = [];
};



const changeDirectionTurnValues = (velX , velY, rotationDegrees) =>{
  turnLocationsX.push(bodyLenght[0].position.x);
  turnLocationsY.push(bodyLenght[0].position.y);
  bodyLenght[0].velocity.x = velX;
  bodyLenght[0].velocity.y = velY;
  bodyLenght[0].rotationAngle = rotationDegrees;
  turnVelocityX.push(bodyLenght[0].velocity.x);
  turnVelocityY.push(bodyLenght[0].velocity.y);
  turnRotation.push(bodyLenght[0].rotationAngle);
  turnPosX = bodyLenght[0].position.x;
  turnPosY = bodyLenght[0].position.y;

  return;
}


document.addEventListener("keydown", changeDirection);

//asi by se hodilo nějak obstarat width a height v deltach
//asi by se hodilo nějak obstarat width a height v deltach
//asi by se hodilo nějak obstarat width a height v deltach
function changeDirection(event) {
  const LEFT_KEY = 37;
  const UP_KEY = 38;
  const RIGHT_KEY = 39;
  const DOWN_KEY = 40;
  const keyPressed = event.keyCode;

    deltaX = Math.abs(bodyLenght[0].position.x - turnPosX);
    deltaY = Math.abs(bodyLenght[0].position.y - turnPosY);

      if (keyPressed === LEFT_KEY && bodyLenght[0].velocity.x != 5 && bodyLenght[0].velocity.x != -5 && deltaY > body.size.height) {
        console.log("left");
        changeDirectionTurnValues(-5,0,270);
        //270
        return;
      }
    
      if (keyPressed === UP_KEY && bodyLenght[0].velocity.y != 5 && bodyLenght[0].velocity.y != -5 && deltaX > body.size.width) {
        console.log("up");
        changeDirectionTurnValues(0,-5,0);
        //0
        return;
      }
    
      if (keyPressed === RIGHT_KEY && bodyLenght[0].velocity.x != -5 && bodyLenght[0].velocity.x != 5 && deltaY > body.size.height) {
        console.log("right");
        changeDirectionTurnValues(5,0,90);
        //90
        return;
      }
    
      if (keyPressed === DOWN_KEY && bodyLenght[0].velocity.y != -5 && bodyLenght[0].velocity.y != 5 && deltaX > body.size.width) {
        console.log("down");
        changeDirectionTurnValues(0,5,180);
        //180
        return;
      }
  }



//headSpawn asi 
gameButton.onclick = () => {
    gameLoopBool = true;
    resetValues();
    window.requestAnimationFrame(gameLoop);
    bodyLenght.push(new SnakeBody(currentSkin, "head"));
    bodyLenght.push(new SnakeBody(currentSkin, "body"));
    positionMath();
    bodyLenght.push(new SnakeBody(currentSkin, "tail"));
    positionMath();
};

const loadData = async () =>{
    const file = await fetch("./res/data/skins.json");
    const data = await file.json();
    SnakeBody.skinsData = data;
    body = new SnakeBody();
};
window.onload = async() =>{
  await loadData();
}
