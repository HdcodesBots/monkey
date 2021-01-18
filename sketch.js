var gamestate=1 
var play=1
var end=0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground2
var Time = 0 
var score = 0 
var gameoverImg 
var restratImg
var gameOver
var  restart
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  restartImg = loadImage ("restart.png");
  gameoverImg = loadImage ("gameOver.png");
}



function setup() {
createCanvas(400, 400);  
  
 
    FoodGroup = new Group();  
   obstacleGroup= new Group ();
  
    restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 gameOver = createSprite(200,200);
  gameOver.addImage(gameoverImg);
  
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
 monkey=createSprite (80,315,20,20);  
 monkey.addAnimation("running",monkey_running);
 monkey.scale=0.1;
 monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
// monkey.debug = true
  
  
  
 ground2=createSprite(255,350,900,10);
  ground2.velocityX=-(4+score/1 );

Time = 0
  score = 0 
}


function draw() {
background("white");
 
 if (gamestate===play){
   
  gameOver.visible = false;
    restart.visible = false;
   if (ground2.x<0){
 ground2.x=ground2.width/4;  
}  
   
 if (keyDown ( "space") && monkey.y>=314)   {
 monkey.velocityY = -(19);
  
}    
stroke("white");
textSize(20);
fill("white");


textSize(15);
fill("black")
Time=Math.ceil(frameCount/frameRate()+score/1);
text("Time Survived: "+ Time,10,50);

textSize(15);
fill("black")

text("Stamina: "+ score,290,50);


monkey.velocityY= monkey.velocityY+1;  

  
food();
obs();
  

if (monkey.isTouching (FoodGroup)) {
   
   FoodGroup.destroyEach();
   score=score+1
   
 }
   
 monkey.collide(ground2); 
if (monkey.isTouching (obstacleGroup)) {
   
   gamestate=end;
   
 }
  

   
 }                     
 else if (gamestate===end){
   
    gameOver.visible = true;
      
   
    if(mousePressedOver(restart)) {
      reset();
    }
   ground2.velocityX=0;
  monkey.velocity=0;
  obstacleGroup.setVelocityEach(0);
  FoodGroup.setVelocityEach(0);
   
  obstacleGroup.setLifetimeEach(-1); 
    FoodGroup.setLifetimeEach(-1);
   
   
 }                      
                        
  
  
  
  
  
  
  
  

  
drawSprites();  
}

function reset() {
 
  gamestate=1 ;
  
  
  gameOver.visibe=false; 
   restart.visibe=false;
  
  
obstacleGroup.destroyEach();
FoodGroup.destroyEach();
  
score=0;  
time=0;
  
  
  
}











function food(){ 
if (frameCount % 80=== 0){
banana = createSprite (400,200,20,20);
banana.addImage( bananaImage);
banana.y=Math.round(random(120,200))
banana.scale=0.1;
banana.velocityX=-(5+score/5)
banana.lifetime=400;
FoodGroup.add(banana); 
}   
}
function obs(){
if (frameCount % 200=== 0){
obstacle=createSprite (400,316,10,10);
obstacle.addImage( "obs",obstacleImage);
obstacle.scale=0.15;  
obstacle.velocityX=-(4+score/3);
obstacle.lifetime=400;
obstacleGroup.add(obstacle);
obstacle.setCollider("rectangle",0,0,290,250);
//*obstacle.debug = false//*
  
  
  
}  
  
  
  
}


