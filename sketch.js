var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloud,cloudImage, cactus;
var o1,o2,o3,o4,o5,o6
var score
var gamestate="alive"
var cactusGroup,cloudsGroup
var trexDead
var gameover,restart
var gameoverImage,restartImage
var dieSound, jumpSound, checkpointSound;



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  gameoverImage = loadImage("gameOver.png")
  
  restartImage = loadImage("restart.png")
  
  
 cloudImage = loadImage("cloud.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
    //for the sounds  
  dieSound = loadSound("die.mp3")
  jumpSound = loadSound("jump.mp3")
  checkpointSound = loadSound("checkPoint.mp3")
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("dead",trex_collided)
  trex.scale = 0.5;
  //trex.debug=true
  trex.setCollider("circle",0,0,40)
  
  
  
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //createing gameover and reset icons
  gameover=createSprite(300,100)
  gameover.addImage(gameoverImage)
  gameover.scale=1.5
  restart=createSprite(300,140)
  restart.addImage(restartImage)
  restart.scale=0.5
  
  
  
  
 //var bob =Math.round( random (1,200))
 //console.log (bob)
  score = 0
  //creating the groups
  cactusGroup = new Group()
  cloudsGroup = new Group()
  
}

function draw() {
  //set background color
  background("steelBlue");
  
  if (gamestate=="alive"){
    //making icon invisable
    restart.visible=false
    gameover.visible=false
   //moving the ground
    ground.velocityX = -4;
    //increasing the score
    score = score+Math.round(getFrameRate()/60)
      // jump when the space key is pressed
  if(keyDown("up")&& trex.collide(invisibleGround)) {
    trex.velocityY = -10;
    jumpSound.play()
  }
        if(score%500==0&&score>0){
          checkpointSound.play()
        }
      //the ground is infinite
  if (ground.x < 0){
    ground.x = ground.width/2;
  
  }
   //spawning stuff
   spawnClouds();
  
   spawnCactus();
    
  //adding gravity to the trex 
    trex.velocityY = trex.velocityY + 0.4  
    //checking trex toutch cactus
    if (trex.isTouching(cactusGroup)){
      gamestate = "dead"
      dieSound.play()
      //jumpSound.play()
      //trex.velocityY=-10
    }

    
  }
 else if (gamestate=="dead"){
   //making icon visable
    restart.visible=true
    gameover.visible=true
   //fix flying dinosaur :)
   trex.velocityY=0
    //stopping the ground
    ground.velocityX = 0;
   //freezing the cloud and the cactus
   cloudsGroup.setVelocityXEach(0)
   cactusGroup.setVelocityXEach(0)
   cloudsGroup.setLifetimeEach(-1)
   cactusGroup.setLifetimeEach(-1)
   trex.changeAnimation("dead",trex_collided)
   if (mousePressedOver(restart)){
     reset()
   }
  }
  
  fill("white")
  textSize(16);
  //displaying the score
  text ("score: "+score,470,20)
 

  


  
  //stop trex from falling down
  trex.collide(invisibleGround);

  
  drawSprites();
  
  
}
function spawnClouds (){
  if (frameCount%50==0){
  cloud = createSprite(600,100,40,10)
  cloud.velocityX = -6
  cloud.y=Math.round(random(10,120))
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
trex.depth=cloud.depth+1
//memory leak for cloud 
cloud.lifetime = 155
    cloudsGroup.add(cloud)
    
  }


}

function spawnCactus (){
 if (frameCount%60==0){
   cactus = createSprite(600,160,20,40);

  cactusGroup.add(cactus)
  
 cactus.velocityX = -6-score/100
   var randomNumbers = Math.round(random(1,6))
   switch(randomNumbers){
case 1:cactus.addImage(o1)
 break;
case 2:cactus.addImage(o2)
break;
case 3:cactus.addImage(o3)
break;
case 4:cactus.addImage(o4)
break;
case 5:cactus.addImage(o5)
break;
case 6:cactus.addImage(o6)
break;
default:break;       

   }
   cactus.scale = 0.5
   cactus.lifetime = 155
 }
}
  function reset() {
    gamestate = "alive"
    cactusGroup.destroyEach()
    cloudsGroup.destroyEach()
    trex.changeAnimation("running",trex_running)
    score=0
    
  }
  
