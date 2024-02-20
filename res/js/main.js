import { SnakeBody } from "./body/body.js";
import { Fruit } from "./fruit/fruit.js";
const fruit = new Fruit();

//Za score skiny?
//Main Screen ??
//víc rychlostí - víc score??
//start gameOver
//style
//víc song

//ukoncit window.onload somehow asi button onclick bude good

const body = new SnakeBody();

const score = document.getElementById("score");
const gameOver = document.getElementById("gameOver");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const eatSFX = new Audio("./res/audio/sfx/chramst.mp3");
const bgSong1 = new Audio("./res/audio/music/bgSong1.mp3");
const dyingSound = new Audio("./res/audio/sfx/dyingSound.mp3");



const CANVAS_SIZE = 700;

let scoreNumber = -2;
let bgAudioState = true;

let deltaX;
let deltaY;
let turnPosX = 0;
let turnPosY= 0;

let bodyLenght = [];
let turnLocationsX = [];
let turnLocationsY = [];
let turnVelocityX = [];
let turnVelocityY = [];

const gameLoop = () => {

    resizeCanvas();

    update();
  
    render();
  
    window.requestAnimationFrame(gameLoop);
    
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
    || bodyLenght.length < 3
  ) {

    audioPlay(eatSFX, 1);

    fruit.randomPosition();
    fruitLocationCheck();

    console.log("body+++");
    bodyLenght.push(new SnakeBody());

    // FIX POZICE SOMEHOWWWW
    //nějakej if asi píčo já netušim 😭😭😭
    //poziceqweh fix nejak  pllsslslsl bere to kryplavou pozici debile 
    bodyLenght[bodyLenght.length-1].position.x = bodyLenght[bodyLenght.length-2].position.x - body.size.width * Math.sign(bodyLenght[bodyLenght.length-2].velocity.x);
    bodyLenght[bodyLenght.length-1].position.y = bodyLenght[bodyLenght.length-2].position.y - body.size.height * Math.sign(bodyLenght[bodyLenght.length-2].velocity.y);
    bodyLenght[bodyLenght.length-1].velocity.x = bodyLenght[bodyLenght.length-2].velocity.x;
    bodyLenght[bodyLenght.length-1].velocity.y = bodyLenght[bodyLenght.length-2].velocity.y;

    scoreNumber++;
    score.innerHTML = `Score: ${scoreNumber}`;
  }
};

const fruitLocationCheck = () => {
  for (let n = 1; n < bodyLenght.length-1; n++) {
    while(
    bodyLenght[n].position.x + body.size.width >= fruit.position.x &&
    bodyLenght[n].position.x <= fruit.position.x + fruit.size.width &&
    bodyLenght[n].position.y + body.size.height >= fruit.position.y &&
    bodyLenght[n].position.y <= fruit.position.y + fruit.size.height) {
      fruit.randomPosition();
    }
  }
  
};

const bodyUpdate = () => {
  //píčo co to kurva dělá what the hheeelll
  //kurva
  //console.log(k);
  for (let n2 = 0; n2 <= turnVelocityX.length; n2++){
    for (let n = 1; n < bodyLenght.length; n++) {
      if (bodyLenght[n].position.x === turnLocationsX[0+n2] && bodyLenght[n].position.y === turnLocationsY[0+n2])
        {
        bodyLenght[n].velocity.x = turnVelocityX[0+n2];
        bodyLenght[n].velocity.y = turnVelocityY[0+n2];
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
    }
  }
};



const detectSnakeCollision = () => {
  for (let n = 1; n < bodyLenght.length; n++) {
    if (
      bodyLenght[0].position.x + body.size.width - 20 >=
        bodyLenght[n].position.x &&
      bodyLenght[0].position.x + 20 <=
        bodyLenght[n].position.x + body.size.width &&
      bodyLenght[0].position.y + body.size.height - 20 >=
        bodyLenght[n].position.y &&
      bodyLenght[0].position.y + 20 <=
        bodyLenght[n].position.y + body.size.height
    ) {

      console.log("jauuuuu");
      audioPlay(dyingSound, 1);

      //asi odstranit pokud nejak zmenim ten onload
      bgAudioState = false;

      canvas.style.width = 0;
      canvas.style.height = 0;
      canvas.style.border = 0;
      gameOver.innerHTML = "Game Over";
      gameOver.style.color = "white";
      gameOver.style.opacity = 1;
    }
  }
};

const audioPlay = (sound, soundVolume) =>{
  if(sound === eatSFX){
    sound.load();
  }
  sound.play();
  sound.volume = soundVolume;
};

const bgAudioLoop = (song) =>{
  if(bgAudioState){
    song.play();
    song.volume = 0.07;
  }
  else{
    song.pause();
  }
};

const changeDirectionTurnValues = (velX , velY) =>{
  turnLocationsX.push(bodyLenght[0].position.x);
  turnLocationsY.push(bodyLenght[0].position.y);
  bodyLenght[0].velocity.x = velX;
  bodyLenght[0].velocity.y = velY;
  turnVelocityX.push(bodyLenght[0].velocity.x);
  turnVelocityY.push(bodyLenght[0].velocity.y);
  turnPosX = bodyLenght[0].position.x ;
  turnPosY = bodyLenght[0].position.y ;
  return;
}

//udělat pro víc rychlostí somehow
//podmíncky do if aby byly větší než výška a šířka asi nig
//nedává smysl dopíčí co prostě kurva je tohle bro proč to prostě nemuze fungovat dobře kurva 😭😭😭😭😭😭😭
document.addEventListener("keydown", changeDirection);

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
        changeDirectionTurnValues(-5,0);
        return;
      }
    
      if (keyPressed === UP_KEY && bodyLenght[0].velocity.y != 5 && bodyLenght[0].velocity.y != -5 && deltaX > body.size.width) {
        console.log("up");
        changeDirectionTurnValues(0,-5);
        return;
      }
    
      if (keyPressed === RIGHT_KEY && bodyLenght[0].velocity.x != -5 && bodyLenght[0].velocity.x != 5 && deltaY > body.size.height) {
        console.log("right");
        changeDirectionTurnValues(5,0);
        return;
      }
    
      if (keyPressed === DOWN_KEY && bodyLenght[0].velocity.y != -5 && bodyLenght[0].velocity.y != 5 && deltaX > body.size.width) {
        console.log("down");
        changeDirectionTurnValues(0,5);
        return;
      }
  }

  //kolize obracceny jakoze naopak ????????????? já vidim démony 
  /*
    && (bodyLenght[0].position.x + body.size.width <= turnLocationsX[turnLocationsX.length - 1] - body.size.width 
    && bodyLenght[0].position.x >= turnLocationsX[turnLocationsX.length - 1] + body.size.width
    && bodyLenght[0].position.y + body.size.height <= turnLocationsY[turnLocationsX.length - 1] - body.size.height 
    && bodyLenght[0].position.y >= turnLocationsY[turnLocationsX.length - 1] + body.size.height)
  */


  /* bodyLenght[0].position.x + body.size.width >= turnLocationsX[n] - body.size.width
  &&
      bodyLenght[0].position.x + 20 <=
        bodyLenght[n].position.x + body.size.width &&
      bodyLenght[0].position.y + body.size.height - 20 >=
        bodyLenght[n].position.y &&
      bodyLenght[0].position.y + 20 <=
        bodyLenght[n].position.y + body.size.height
  */
  
  /*
  && (bodyLenght[0].position.x + body.size.width > turnLocationsX[0] + body.size.width || bodyLenght[0].position.x < turnLocationsX[0] - body.size.width)
  else{
    
    if (keyPressed === LEFT_KEY && bodyLenght[0].velocity.x != 5 && bodyLenght[0].velocity.x != -5 && ((bodyLenght[0].position.y > turnLocationsY[0] + 2* body.size.height || bodyLenght[0].position.y < turnLocationsY[0] - body.size.height || bodyLenght[0].position.y === turnLocationsY[0]) && (bodyLenght[0].position.x < turnLocationsX[0] - body.size.width || bodyLenght[0].position.x > turnLocationsX[0] + 2* body.size.width || bodyLenght[0].position.x === turnLocationsX[0])))
      {
      console.log("left");    
      changeDirectionTurnValues(-5,0);
      return;
    }
  
    if (keyPressed === UP_KEY && bodyLenght[0].velocity.y != 5 && bodyLenght[0].velocity.y != -5  && ((bodyLenght[0].position.y > turnLocationsY[0] + 2* body.size.height || bodyLenght[0].position.y < turnLocationsY[0] - body.size.height || bodyLenght[0].position.y === turnLocationsY[0]) && (bodyLenght[0].position.x < turnLocationsX[0] - body.size.width || bodyLenght[0].position.x > turnLocationsX[0] + 2* body.size.width || bodyLenght[0].position.x === turnLocationsX[0])))
        {
      console.log("up");
      changeDirectionTurnValues(0,-5);
      return;
    }
  
    if (keyPressed === RIGHT_KEY && bodyLenght[0].velocity.x != -5 && bodyLenght[0].velocity.x != 5 && ((bodyLenght[0].position.y > turnLocationsY[0] + 2 * body.size.height || bodyLenght[0].position.y < turnLocationsY[0] - body.size.height || bodyLenght[0].position.y === turnLocationsY[0]) && (bodyLenght[0].position.x < turnLocationsX[0] - body.size.width || bodyLenght[0].position.x > turnLocationsX[0] + 2* body.size.width || bodyLenght[0].position.x === turnLocationsX[0])))
      {
      console.log("right");
      changeDirectionTurnValues(5,0);
      return;
    }
  
    if (keyPressed === DOWN_KEY && bodyLenght[0].velocity.y != -5 && bodyLenght[0].velocity.y != 5 && ((bodyLenght[0].position.y > turnLocationsY[0] + 2* body.size.height || bodyLenght[0].position.y < turnLocationsY[0] - body.size.height || bodyLenght[0].position.y === turnLocationsY[0]) && (bodyLenght[0].position.x < turnLocationsX[0] - body.size.width || bodyLenght[0].position.x > turnLocationsX[0] + 2* body.size.width || bodyLenght[0].position.x === turnLocationsX[0])))
    {
      console.log("down");  
      changeDirectionTurnValues(0,5);
      return;
    }

    /*
    && ((bodyLenght[0].position.x < turnLocationsX[recentPress] - bodyLenght[0].size.width 
        && bodyLenght[0].position.x > turnLocationsX[recentPress] + 2 * bodyLenght[0].size.width) 
        || bodyLenght[0].position.x === turnLocationsX[recentPress]) 
        
      && ((bodyLenght[0].position.y > turnLocationsY[recentPress] + 2 * bodyLenght[0].size.height 
          && bodyLenght[0].position.y < turnLocationsY[recentPress] - bodyLenght[0].size.height) 
          || bodyLenght[0].position.y === turnLocationsY[recentPress])
      */

     /*
     && (((bodyLenght[0].position.x < turnLocationsX[recentPress] - bodyLenght[0].size.width 
        && bodyLenght[0].position.x > turnLocationsX[recentPress] + 2 * bodyLenght[0].size.width) 
        &&((bodyLenght[0].position.y > turnLocationsY[recentPress] + 2 * bodyLenght[0].size.height 
        && bodyLenght[0].position.y < turnLocationsY[recentPress] - bodyLenght[0].size.height))
        || (bodyLenght[0].position.x === turnLocationsX[recentPress] || bodyLenght[0].position.y === turnLocationsY[recentPress])))
    */
   /*
   && (bodyLenght[0].position.y >turnLocationsY[recentPress] + 2 * body.size.height || bodyLenght[0].position.y < turnLocationsY[recentPress] - body.size.height || bodyLenght[0].position.y === turnLocationsY[recentPress]) &&(bodyLenght[0].position.x < turnLocationsX[recentPress] - body.size.width || bodyLenght[0].position.x > turnLocationsX[recentPress] + 2 * body.size.width || bodyLenght[0].position.x === turnLocationsX[recentPress])
   
  }
*/

window.onload = () => {
    window.requestAnimationFrame(gameLoop);
    bodyLenght[0] = new SnakeBody();
};

