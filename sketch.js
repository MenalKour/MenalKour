var shinchan,shinchanImg;
var bgImg,bg
var ground
var coinImg,obstacleImg
var obstacleGroup,coinGroup
var gameState=1
var sound
var score=0
var distance=0
var gameOver,gameOverImg
var restart,restartImg
var bird1img,bird2img,bird3img,bird4img,bird5img,bird6img
var birdsGroup
var shincryingimg
function preload(){
    shinchanImg=loadImage("shinchan.png")
    bgImg=loadImage("bgi.jpg")
    coinImg=loadImage("coin.png")
    obstacleImg=loadImage("stone.png")
    sound=loadSound("sound1.mp3")
gameOverImg=loadImage("gameover.png")
restartImg=loadImage("download (1).png")
bird1img=loadImage("bird5img.png")
bird2img=loadImage("bird2img.png")
bird3img=loadImage("bird3img.png")
bird4img=loadImage("bird4img.png")
bird5img=loadImage("bird6img.png")
bird6img=loadImage("bird7img.png")
shincryingimg=loadImage("shincrying1.png")
}
function setup(){
    createCanvas(600,400)
    
       // sound.setVolume(1)
    bg=createSprite(0,0,800,10)
    bg.width=2000
    bg.addImage(bgImg)
   // bg.scale=3
    bg.x=bg.width/2
    bg.velocityX=-4
  

    ground=createSprite(400,350,800,10)
    ground.width=2000
  //  ground.addImage(groundImg)
     ground.velocityX=-(5+3*score/10)
    ground.x=ground.width/2
    ground.visible=false;
   

    shinchan=createSprite(50,250,20,20)
    shinchan.addImage(shinchanImg)
     shinchan.scale=1

     gameOver=createSprite(200,200,10,10)
gameOver.addImage(gameOverImg)
restart=createSprite(200,270,10,10)
restart.addImage(restartImg)
restart.scale=0.5
 // shinchan.velocityX=3
obstacleGroup=new Group()
coinGroup=new Group()
birdsGroup=new Group()
   }
function draw(){
    background(255)
    if(gameState===1){
        sound.loop()
        gameOver.visible=false
        restart.visible=false
        distance=distance+Math.round(getFrameRate()/60)
    if(bg.x<0){
        bg.x=bg.width/2
    }
    if(ground.x<0){
        ground.x=ground.width/2
    }
  if(keyDown("space")&&shinchan.y>=170){
      shinchan.velocityY=-10
  }
  shinchan.velocityY+=0.8
  
  if(obstacleGroup.isTouching(shinchan)){
    gameState=0
}
if(coinGroup.isTouching(shinchan)){
    coinGroup.destroyEach()
    score=score+1
}
if(birdsGroup.isTouching(shinchan)){
    birdsGroup.destroyEach()
    gameState=0
}
  spawnObstacles()
  spawnCoins()
  spawnBirds()
}
shinchan.collide(ground)

if(gameState===0){
    sound.loop()
    bg.visible=false
    bg.velocityX=0
    shinchan.visible=false
birdsGroup.destroyEach()
obstacleGroup.destroyEach()
coinGroup.destroyEach()
gameOver.visible=true
restart.visible=true
if(mousePressedOver(restart)){
    reset()
}
}

    drawSprites()
    textSize(13)
    strokeWeight(2)
    stroke("black")
    fill("black")
    text("COINS COLLECTED: "+score,20,50)
    text("DISTANCE COVERED: "+distance+" M",420,50)
}
function spawnObstacles(){
    if(frameCount%140===0){
var obstacle=createSprite(600,100,10,10)
obstacle.addImage(obstacleImg)
obstacle.scale=0.15
obstacle.y=Math.round(random(250,300))
obstacle.velocityX=-(3+score/10)
obstacle.lifetime=200
obstacleGroup.add(obstacle)

    }
    
}
function spawnCoins(){
    if (frameCount%200===0){
        var coin=createSprite(600,70,10,10)
        coin.addImage(coinImg)
        coin.scale=0.35
        coin.velocityX=-3
       coin.y=Math.round(random(170,200))
     coinGroup.add(coin)
    }
}
function reset(){
    gameState=1
    score=0
    distance=0
    gameOver.visible=false
    restart.visible=false
    shinchan.visible=true
    bg.visible=true
    bg.velocityX=-4
}
function spawnBirds(){
    if(frameCount%100===0){
        var bird=createSprite(600,60,10,10)
        bird.scale=0.23
        bird.velocityX=-3
        bird.lifetime=200
        bird.y=Math.round(random(20,50))
        var rand=Math.round(random(1,6))
        console.log(rand)
        switch (rand){
       
       case 1:bird.addImage(bird2img)
       break;
       case 2:bird.addImage(bird3img)
       break;
       case 3:bird.addImage(bird4img)
       break;
       case 4:bird.addImage(bird1img)
       break;
       case 5:bird.addImage(bird5img)
       break;
       case 6:bird.addImage(bird6img)
       break;
       default:break;
        }
        birdsGroup.add(bird)
    }

}