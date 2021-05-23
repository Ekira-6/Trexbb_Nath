var trex, trex_running;
var edges;
// piso real = piso/pisoimg
var piso,pisoimg;
//piso falso = fakefloor
var fakefloor;
var cloudimg;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var cactusclub;
var gamestate;
var cloudclub;
var restart, restartimg;
var gameover, gameoverimg;
var dedtrex
var dies, jumps;
var trexabajo;
var pterodactilo;
var terobbclub;
var score;
var chekpoints;

function preload(){
  //t-rex corriendo = 9-10
  trex_running =        loadAnimation("trex1.png","trex3.png","trex4.png");
  pisoimg = loadImage ("ground2.png");
  cloudimg = loadImage ("cloud.png");
  cactus1 = loadImage ("obstacle1.png");
  cactus2 = loadImage ("obstacle2.png");
  cactus3 = loadImage ("obstacle3.png");
  cactus4 = loadImage ("obstacle4.png");
  cactus5 = loadImage ("obstacle5.png");
  cactus6 = loadImage ("obstacle6.png");
  restartimg = loadImage ("restart.png");
  gameoverimg = loadImage ("gameOver.png");
  dedtrex = loadAnimation ("trex_collided.png");
  dies = loadSound ("die.mp3");
  jumps = loadSound ("jump.mp3");
  trexabajo = loadAnimation ("trex_down1.png","trex_down2.png");
  pterodactilo = loadAnimation ("tero1.png", "tero2.png");
  chekpoints = loadSound ("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  cactusclub = new Group ();
  cloudclub = new Group ();
  terobbclub = new Group ();
  
  //create a trex sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("dead",dedtrex);
  trex.addAnimation("trexabajo",trexabajo);
  // algo.debug = true; = hitbox visible
  trex.debug = false;
  trex.setCollider ("circle",0,0,30);
  //adding scale and position to trex
  //crear T-rex apariencia 22-23
  trex.scale = 0.5;
  trex.x = 50
  //crear los 2 pisos 25-29
  piso = createSprite (200,180,400,20);
  piso.addImage (pisoimg);
  fakefloor = createSprite (200,190,400,10);
  fakefloor.visible = false;
  //edges
  edges=createEdgeSprites();
  gamestate = "start";
  gameover = createSprite (300,70,20,20);
  restart = createSprite (300,100,20,20);
  gameover.addImage (gameoverimg);
  restart.addImage (restartimg);
  gameover.scale = 0.5;
  restart.scale = 0.40;
  gameover.visible = false;
  restart.visible = false;
  score = 0;
}

function draw() {
  background("gray");
  //score abajo
  fill (0,0,0);
  textSize (20);
  text ("score" +score,490,25);
  //console.log (frameCount)
if (piso.x <0){
  piso.x = piso.width / 2
}
 

  //jumping the trex on space key press
  if (gamestate === "start" && (keyDown("space"))){
  gamestate = "play";
  }
  //
  if (gamestate === "play"){
    
    if (frameCount%2 === 0){
      score = score+1
    }
    if (score%100 === 0 && score>0){
      chekpoints.play ();
    }
    piso.velocityX = -3-score/150;
    cactuses ();
    clouds ();
    if (trex.isTouching (cactusclub)) {
    gamestate = "end"
    dies.play ();
  }
    
  if(keyDown("space") &&trex.y > 120) {
    trex.velocityY = -10;
    jumps.play ();
  }
  
  if (keyDown("UP_ARROW") &&trex.y > 120) {
    trex.velocityY = -10;
    jumps.play ();
  }
  if (keyWentDown ("DOWN_ARROW")){
   trex.changeAnimation ("trexabajo", trexabajo);
    trex.scale = 0.35
  }
  if (keyWentUp ("DOWN_ARROW")){
  trex.changeAnimation ("running", trex_running);
  trex.scale = 0.5
  }
  // el t-rex callendo
  trex.velocityY = trex.velocityY + 0.8
  pterodactilos ();
  if (trex.isTouching (terobbclub)){
  gamestate = "end"
  dies.play ();
  }
  }
  
  
  if (gamestate === "end"){
  piso.velocityX = 0;
  cactusclub.setVelocityXEach (0);
  cloudclub.setVelocityXEach (0);
  terobbclub.setVelocityXEach (0);
  cactusclub.setLifetimeEach (-1);
  cloudclub.setLifetimeEach (-1);
  terobbclub.setLifetimeEach (-1);
  gameover.visible = true;
  restart.visible = true;
    trex.changeAnimation ("dead",dedtrex);
    trex.scale = 0.5;
    trex.velocityY = 0;
    if (mousePressedOver(restart)){
    reinicio ();
    }
    
  }
  
  // comenzar el juego = if / 45-46
  // &&trex.y > 110 = no salta demasiado alto/ ya no sale volando
  
 //stop trex from falling down 
 trex.collide(fakefloor);
  drawSprites();
}
function clouds (){
  if (frameCount %100 === 0 ){
  var r = random (0,100);
  var cloud = createSprite (600,r,20,20);
  cloud.velocityX = -2-score/200;
  cloud.addImage(cloudimg);
  //console.log ("trex"+trex.depth)
  //console.log ("cloud"+cloud.depth)
  //DEPTH = PROFUNDIDAD
  // 0 = atras    = +1 adelante
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloud.lifetime = 310
    cloudclub.add (cloud);
  }
}
function cactuses () {
  if (frameCount %120 === 0){
  var cactus = createSprite (600,175,20,20);
    cactus.shapeColor = "green";
    cactus.velocityX = -3-score/200;
  var z = Math.round (random (1,6));
    console.log (z)
    switch (z) {
      case 1:
      cactus.addImage (cactus1);
      break;
      case 2:
      cactus.addImage (cactus2);
      break; 
      case 3:
      cactus.addImage (cactus3);
      break;
      case 4:
      cactus.addImage (cactus4);
      break;
      case 5:
      cactus.addImage (cactus5);
      break;
      case 6:
      cactus.addImage (cactus6);
      break;
    }
    cactus.scale = 0.54
    cactus.lifetime = 210
    cactusclub.add (cactus);
  }
}
function reinicio () {
  gamestate = "start";
  restart.visible = false;
  gameover.visible = false;
  cactusclub.destroyEach();
  cloudclub.destroyEach();
  terobbclub.destroyEach ();
  trex.changeAnimation ("running", trex_running);
  trex.y = 180;
  score = 0;
}

function pterodactilos () {
  if (frameCount %200 === 0){
  var terobebe = createSprite (550,140,20,20);
  terobebe.addAnimation ("pterodactilo", pterodactilo);
  terobebe.velocityX = -5;
  terobebe.scale = 1.2
  terobbclub.add (terobebe);
  terobebe.debug = false
  }
  
}
