const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,coin,ground;
var coin_con;
var coin_con_2;
var coin_con_3;
var rope3;

var bg_img;
var coin;
var kangaroo;

var button,button2,button3;
var kangaroo;

var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  coinimg = loadImage('coin.png');
  kangarooimg = loadImage('kang.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   //btn3
   button3 = createImg('cut_btn.png');
   button3.position(360,200);
   button3.size(60,60);
   button3.mouseClicked(drop3);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  ground = new Ground(200,canH,600,20);
  

  kangaroo = createSprite(170,canH-120,100,100);
  kangaroo.scale = 0.8;
  kangaroo.addImage("kangaroo",kangarooimg);
  
  
  coin = Bodies.circle(300,300,10);
  Matter.Composite.add(rope.body,coin);

  coin_con = new Link(rope,coin);
  coin_con_2 = new Link(rope2,coin);
  coin_con_3 = new Link(rope3,coin);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(coin!=null){
    image(coinimg,coin.position.x,coin.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(coin,kangaroo)==true)
  {
   
    eating_sound.play();
  }

  if(coin!=null && coin.position.y>=650)
  {
   
    bk_song.stop();
    sad_sound.play();
    coin=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  coin_con.detach();
  coin_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  coin_con_2.detach();
  coin_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  coin_con_3.detach();
  coin_con_3 = null;
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,coin);
               coin = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


