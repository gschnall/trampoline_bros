var game = new Phaser.Game(1000, 800, Phaser.CANVAS, 'phaser-example', 
  { preload: preload,
    create: create,
    update: update,
    render: render
  });

var trampDude = {
  difficulty: 1,
  negativeAngle: -31,
  positiveAngle: 31,
  flipsNeeded: ["1 Back Flip","1 Front Flip"],
  lives: 3,
  rotationArray: [],
  getRotation: function(){
    return Math.round(player1.body.rotation);
  },
  checkPrevRotation: function(angle){
    return angle !== trampDude.rotationArray[trampDude.rotationArray.length-1]
  },
  score: 0,
  deadString:'Stay Focused!',
  badString:'Poor Landing',
  goodString:'Great Job!',
  perfectString:'Perfect Dude!',
  tweenText: function(myText){
    game.time.events.add(100, function() { game.add.tween(myText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(myText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
  },
  addToFlipsArr: function(){
    // ADDS A NEW RANDOM FLIP TO ARRAY - DELETES FIRST ONE
    var numbOfFlips = Math.round(Math.random()*trampDude.difficulty)+1
    var flipTypes = ['Front Flip', 'Back Flip']
    var typeOfFlip =''
    var randBool = Math.round(Math.random())
    if(numbOfFlips > 1){ typeOfFlip = flipTypes[randBool] +'s' }
    else{ typeOfFlip =  flipTypes[randBool] }
    trampDude.flipsNeeded.push(String(numbOfFlips) + ' ' + typeOfFlip)
    trampDude.flipsNeeded.shift()
    //Change Text according to new Flip List
    flip1Text.text = trampDude.flipsNeeded[0]
    flip2Text.text = trampDude.flipsNeeded[1]
  },
  resetArr:function(){
    trampDude.rotationArray = []
  },
  adjustScore: function(points){
      trampDude.score += points;
      scoreText.text = "Score: " + String(trampDude.score);
    //score += points
    // change score on visual
  },
  displayText: function(text){
      userText ={ font: '58px Arial',fill:'rgb(16, 160, 252)', align:'left'};
      userMessage = game.add.text(600,65, text, userText)
      trampDude.tweenText(userMessage)
  },
  badLanding: function(pr){
    if(((pr < trampDude.positiveAngle) && (pr < trampDude.negativeAngle)) || ((pr > trampDude.positiveAngle) && (pr > trampDude.negativeAngle))){
      trampDude.lives -= 1
      livesText.text = "Lives: " + String(trampDude.lives)
      trampDude.displayText(trampDude.deadString)
      trampDude.resetArr()
      return true;
    }
    else{
      return false;
    }
  },
  checkLanding: function(pr){
    // pr = player rotation
    trampDude.badLanding(pr)
    if(trampDude.badLanding(pr)){ trampDude.resetArr(); return;}
    if(trampDude.checkFlipCompletion() == 'stayed'){trampDude.resetArr(); return;}
    else if(trampDude.checkFlipCompletion() == false){
      trampDude.lives -= 1
      livesText.text = "Lives: " + String(trampDude.lives)
      trampDude.resetArr()
    }
    else{
      trampDude.addToFlipsArr()
      trampDude.resetArr()
      trampDude.adjustScore(100);
      if(pr <= 10 && pr >= -10){
        //insert acceleration
        trampDude.displayText(trampDude.perfectString)
      }
      else if(pr <= 20 && pr >= -20){
        //insert acceleration
        trampDude.displayText(trampDude.goodString)
      }
      else{
        trampDude.displayText(trampDude.badString)
      }
    }
  },
  createRotationList: function(){
    // CREATE ROTATION LIST
      currentAngle = trampDude.getRotation();
      if(currentAngle <= 100 && currentAngle >80 && trampDude.checkPrevRotation(90)){
        trampDude.rotationArray.push(90)
      }
      if(currentAngle <= 190 && currentAngle > 170 && trampDude.checkPrevRotation(180)){
        trampDude.rotationArray.push(180)
      }
      if(currentAngle >= -100 && currentAngle < -80 && trampDude.checkPrevRotation(-90)){
        trampDude.rotationArray.push(-90)
      }
  },
  checkFlipCompletion: function(){
    var flipsNeeded = Number(trampDude.flipsNeeded[0][0])
    var flipType = trampDude.flipsNeeded[0].split(' ')[1]
    var forwardArr = '-90,180,90'
    var forwardArr2 = '-90,180,90,-90,180,90'
    var forwardArr3 = '-90,180,90,-90,180,90,-90,180,90,'
    var backwardsArr = '90,180,-90'
    var backwardsArr2 = '90,180,-90,90,180,-90'
    var backwardsArr3 = '90,180,-90,90,180,-90,,90,180,-90'
    var arr = trampDude.rotationArray
    if(arr.length < 3){return 'stayed'}
    else if(flipsNeeded == 1){
      if(flipType == 'Front'){
        return forwardArr == String(arr)
      }
      else{
        return backwardsArr == String(arr);
      }
    }
    else if(flipsNeeded == 2){
      if(flipType == 'Front'){
        return forwardArr2 == String(arr)
        console.log('register')
      }
      else{
        return backwardsArr2 == String(arr)
      }
    }
    else if(flipsNeeded == 3){
      if(flipType == 'Front'){
        return forwardArr3 == String(arr)
      }
      else{
        return backwardsArr3 == String(arr)
      }
    }
  },
// End trampDude Object

}


function preload() {
    game.load.image('paddle', './imgs/trampoline.png');
    game.load.image('background', './imgs/the_sky2.png');
    game.load.spritesheet('dudeFlip', './imgs/trampDude/dudeFlip.png', 54, 68)
    game.load.spritesheet('alien', './imgs/oldsprite.png', 15.83, 24);
    // random rain from clouds
    //game.load.spritesheet('bullets', './imgs/rain.png', 14, 13);
}


// Global Variables
var player1;
var player2;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var balls;
var shield;
// Text to Display
var scoreText;
var livesText;
var flipText;
var flip1Text;
var flip2Text;
var userMessage;
var currentAngle;

// Create all our Stuff
function create() {
    //Background Spirit - Has No Gravity
    bg = game.add.sprite(0, 0, 'background');
    // Text to Create
    var style = { font: "32px Arial",fill:'#ffffff',stroke:'#000000', strokeThickness:5, align:'left'};
    var highlighted = { font: '32px Arial',fill:'#ffff00',stroke:'#000000', strokeThickness:5, align:'left'}
    var green = { font: "32px Arial",fill:'rgb(91, 230, 84)',stroke:'#000000', strokeThickness:4, align:'left'};
    var orange = { font: "32px Arial",fill:'rgb(240, 98, 46)',stroke:'#000000', strokeThickness:4, align:'left'};
    var purple = { font: "32px Arial",fill:'rgb(222, 222, 222)', stroke:'#000000', strokeThickness:6, align:'left'};

    scoreText = game.add.text(4,15, "Score: " + String(trampDude.score), green)
    livesText = game.add.text(4,55, "Lives: " + String(trampDude.lives), orange)

    shield = game.add.sprite(360, 720, 'paddle');
    player2 = game.add.sprite(450, 720, 'alien')

    flipText = game.add.text(4,95, "Next Flips:",purple)
    flip1Text = game.add.text(4,135, String(trampDude.flipsNeeded[0]) ,highlighted)
    flip2Text = game.add.text(4,180, String(trampDude.flipsNeeded[1]) , style)

    //userMessage = game.add.text(600,65, 'Start', userText)

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    game.physics.arcade.gravity.y = 270;

    // Shield Parameters
    player1 = game.add.sprite(400, 640, 'dudeFlip');
    //game.time.events.loop(150, fire, this);

    game.physics.enable(player1, Phaser.Physics.ARCADE);
    game.physics.enable(shield, Phaser.Physics.ARCADE);
    game.physics.enable(player2, Phaser.Physics.ARCADE)

    //player1 collision
    player1.body.bounce.y = 0.2;
    player1.body.collideWorldBounds = true;
    shield.body.collideWorldBounds = true;
    player2.body.collideWorldBounds = true;
    player1.body.setSize(18, 40, 4, 1);
    //shield collision

    // PLAYER ONE ANIMATIONS
    player1.animations.add('left', [0], true)
    player1.animations.add('idle', [1], true)
    player1.animations.add('right', [0], true)

    // PLAYER TWO ANIMATIONS
    player2.animations.add('left', [1, 2, 3, 4], 10, true);
    player2.animations.add('idle', [5], true);
    player2.animations.add('right', [6, 7, 8, 9, 10], 10, true);

    // player11 Key Events
    cursors = game.input.keyboard.createCursorKeys();
    //Trampoline player1 Key Events
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    tiltLeftButton = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    tiltRightButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
    tiltStraightButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    wButton = game.input.keyboard.addKey(Phaser.Keyboard.W)
    aButton = game.input.keyboard.addKey(Phaser.Keyboard.A)
    dButton = game.input.keyboard.addKey(Phaser.Keyboard.D)
    //pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.P)
    // Physics Enabled
    game.physics.arcade.enable(game.world, true);

    //shield.body.allowGravity = 0;
    shield.body.immovable = true
    player2.body.immovable = true

    //Parameters for Player 1 Rotation
    player1.body.maxAngular = 400;
    player1.body.angularDrag = 50;
    player1.anchor.setTo(0.5,0.5)

    // No Gravity for the bg Image
    bg.body.allowGravity = false;
}

//Core Game Logic Gets Looped Here

function update() {
    // GENERATE ROTATION ARRAY
    currentAngle = trampDude.getRotation();
    if(currentAngle > 60 || currentAngle < -60){
      trampDude.createRotationList()
    }
    //Reset acceleration
    player1.body.angularAcceleration = 0;
    //Player 1 bounce off walls
    player1.body.collideWorldBounds = true;
    player1.body.bounce.set(0.5)

    //Bounce Collision Logic Start
    game.physics.arcade.collide(shield, player1, null, reflect, this);
    shield.body.velocity.x = 0
    player2.body.velocity.x = 0;

    // Logic to Rotate the shield on button click

    // Shield speed and player1s speed!!!!!!!!!!!!!

    //Logic for player1 - Our Main Dude!::
    if(cursors.left.isDown){
        player1.animations.play('left');
        player1.body.angularAcceleration -= 200
    }
    else if(cursors.right.isDown){
        player1.animations.play('right');
        player1.body.angularAcceleration += 200
    }
    else{
        player1.animations.play('idle');
    }


    //Logic for trampoline player 2
    if (aButton.isDown){
        shield.body.velocity.x = -170;
        player2.body.velocity.x = -170;
        player2.animations.play('left')
        if (facing != 'left'){
            facing = 'left';
        }
    }
    else if (dButton.isDown) {
        //player1.body.velocity.x = 50;
        shield.body.velocity.x = 170;
        player2.body.velocity.x = 170;
        player2.animations.play('right')
        if (facing != 'right') {
            facing = 'right';
        }
    }
    else{ player2.animations.play('idle')}
    //Keybindings to Adjust the angle of the shield
    if(tiltRightButton.isDown){
      shield.angle = 10;
      //tiltRight = true;
      //tiltLeft = false;
      //tiltStraight = false;
    }
    else if(tiltLeftButton.isDown){
      shield.angle = -10
      //tiltRight = true;
      //tiltLeft = false;
      //tiltStraight = false;
    }
    else if(tiltStraightButton.isDown){
      shield.angle = 0
      //tiltRight = false;
      //tiltLeft = false;
      //tiltStraight = true;
    }
    //Check to see if character is on ground before jumping again!
    if ((jumpButton.isDown || wButton.isDown)&& shield.body.onFloor() && game.time.now > jumpTimer){
        shield.body.velocity.y = -150;
        jumpTimer = game.time.now + 750;
        player2.body.velocity.y = -150
        player2.animations.play('idle')
    }
    // Check if player1 Is Dead
    checkBounds(player1)
}

// Function to fire particles
// FOR RAIN ADDITION
/*
function fire(){
  //var ball = balls.getFirstExists(false);

  if(ball){
    ball.frame = game.rnd.integerInRange(0,6);
    ball.exists = true;
    ball.reset(game.world.randomX, 0);
    ball.body.bounce = 0.8
  }
}
*/


// Function to reflect trampDude!****
function reflect(a, player1){
    if(player1.y > (shield.y +15)){
      return true;
    }
    else{
      player1.body.velocity.y = -540 || player1.body.velocity.y
      player1.body.velocity.x = 0;
      trampDude.checkLanding(trampDude.getRotation())
      //player1.body.velocity.y = -180;
      // ADD EXTRA VELOCITY HERE IF PLAYER LANDS WELL
      // Check list and all that stuff here
      player1.body.velocity.x = shield.body.velocity.x * 1.5 ;
      return false;
    }
}


// function to kill the player1 if they hit the ground
function checkBounds(player1){

  if(player1.body.y > 759){
    player1.kill();
  }
}



// Render debuggin info
function render () {

    // DEBUGGING INFORMATION
    // game.debug.spriteInfo(player1, 32, 32);
    // game.debug.text('angularVelocity: ' + player1.body.angularVelocity, 32, 200);
    // game.debug.text('angularAcceleration: ' + player1.body.angularAcceleration, 32, 232);
    // game.debug.text('angularDrag: ' + player1.body.angularDrag, 32, 264);
    // game.debug.text('deltaZ: ' + player1.body.deltaZ(), 32, 296);
}
