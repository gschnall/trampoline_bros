/*
var game = new Phaser.Game(950, 800, Phaser.CANVAS, 'phaser-example',
  { preload: preload,
    create: create,
    update: update,
    render: render
  });
*/
//---- Global Variables
var batDead = false;
var batLeft = true;
var batRight = false;
var ratDead = false;
var ratLeft = false;
var ratRight = false;
var facing = 'left';
var jumpTimer = 0;
var topScore = 0;
var batGroup, bat, rat, player1, player2,
cursors,jumpButton,bg,
balls, shield, scoreText,
livesText, flipText, flip2Text,
userMesssage, currentAngle,
intro_pic,
// Audio Element Variables
poor_landing_sound, bat_sound,
bounce_sound, good_landing_sound,
perfect_landing_sound, pickup_bat_sound,
rat_sound,stun_bat_sound, wrong_flip_sound,
player2_jump_sound, music,
die_sound, die_landing_sound,
eat_player2_sound, flapping_sound
//---------------------

// Audio Object
sounds = {
  generateFlapping: function(){
    sounds.flapping()
    flapping_sound.onLoop.add(sounds.flapping)
  },
  playSoundTrack: function(){
    music.play('',0,1,true)
  },
  bounce: function(){bounce_sound.play('bounce')},
  jump: function(){player2_jump_sound.play('jump')},
  poorLanding: function(){poor_landing_sound.play('poor_landing')},
  bat: function(){bat_sound.play('bat_sound')},
  goodLanding: function(){good_landing_sound.play('good_landing')},
  perfectLanding: function(){perfect_landing_sound.play('perfect_landing')},
  pickupBat: function(){pickup_bat_sound.play('pickup_bat')},
  rat: function(){rat_sound.play('rat_sound')},
  stunBat: function(){stun_bat_sound.play('stun_bat')},
  wrongFlip: function(){wrong_flip_sound.play('wrong_flip')},
  die: function(){die_sound.play('die_sound')},
  dieLanding: function(){die_landing_sound.play('die_landing')},
  eatPlayer2: function(){eat_player2_sound.play('eat_player2')},
  flapping: function(){flapping_sound.play('flapping_sound')},
}

//Player1 object
var trampDude = {
  difficulty: 1,
  negativeAngle: -31,
  positiveAngle: 31,
  flipsNeeded: ["1 Back Flip","1 Front Flip"],
  lives: 3,
  rotationArray: [],
  velocityY: 0,
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
  fadeText: function(myText){
    game.time.events.add(100, function() { game.add.tween(myText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
  },
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
      //DISPLAY SCORE
      userText = { font: '39px Arial',fill:'#ffff00',stroke:'#000000', strokeThickness:5, align:'left'}
      userMessage = game.add.text(400,205, "+" + points, userText)
      trampDude.tweenText(userMessage)
  },
  displayText: function(text, color){
    color = color || 'rgb(16, 160, 252)'
    userText ={ font: '58px Arial',fill:color,stroke:'rgb(49, 60, 156)', strokeThickness:5, align:'left'};
    userMessage = game.add.text(500,95, text, userText)
    trampDude.tweenText(userMessage)
  },
  insertAnyText: function(text, x, y, color, action, strokeColor){
    color = color || '#ffff00'
    action = action || 'tweenText'
    strokeColor = strokeColor || '#000000'
    userText = { font: '39px Arial',fill:color,stroke:strokeColor, strokeThickness:5, align:'left'}
    userMessage = game.add.text(x,y, text, userText)
    trampDude[action](userMessage)
  },
  restartPlayer1: function(){
    player1.alive = true;
    player1.exists = true;
    player1.visible = true;
    player1.body.rotation = 0;
    player1.body.velocity.x = 0;
    player1.body.x = shield.body.x
    player1.body.y = 500;
  },
  killPlayer1: function(){
    sounds.dieLanding()
    sounds.poorLanding()
    trampDude.lives -= 1
    livesText.text = "Lives: " + String(trampDude.lives)
    trampDude.displayText(trampDude.deadString)
    trampDude.insertAnyText('-1 Life!', 550, 400, 'rgb(230, 25, 25)')
  },
  badLanding: function(pr){
    if(((pr < trampDude.positiveAngle) && (pr < trampDude.negativeAngle)) || ((pr > trampDude.positiveAngle) && (pr > trampDude.negativeAngle))){
      sounds.dieLanding()
      sounds.poorLanding()
      trampDude.resetArr()
      trampDude.killPlayer1();
      return true;
    }
    else{
      return false;
    }
  },
  checkLanding: function(pr){
    // pr = player rotation
    //trampDude.badLanding(pr)
    if(trampDude.badLanding(pr)){ trampDude.resetArr(); return;}
    if(trampDude.checkFlipCompletion() == 'stayed'){trampDude.resetArr(); return;}
    else if(trampDude.checkFlipCompletion() == false){
      sounds.poorLanding()
      //trampDude.lives -= 1
      // Take awawy life only in single player option
      //livesText.text = "Lives: " + String(trampDude.lives)
      trampDude.resetArr()
      sounds.wrongFlip()
      trampDude.insertAnyText('Wrong Flip Dude!', 480, 500, 'rgb(252, 181, 21)')
    }
    else{
      trampDude.addToFlipsArr()
      trampDude.resetArr()
      if(pr <= 10 && pr >= -10){
        //insert acceleration
        trampDude.adjustScore(100);
        sounds.perfectLanding()
        trampDude.displayText(trampDude.perfectString, 'rgb(21, 232, 29)')
        player1.body.velocity.y -= 135
      }
      else if(pr <= 20 && pr >= -20){
        //insert acceleration
        trampDude.adjustScore(50);
        sounds.goodLanding()
        trampDude.displayText(trampDude.goodString)
        player1.body.velocity.y -= 100
      }
      else{
        trampDude.adjustScore(20);
        trampDude.displayText(trampDude.badString, 'rgb(255, 225, 24)')
        player1.body.velocity.y -= 30
        sounds.poorLanding()
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

var enemies = {
  generateBats: function(){
    for(var i=0; i < 12;i++){
      batGroup.create(360 + Math.random() * 200, 120 * Math.random * 200, 'batties')
    }
  },
  generateBat: function(){
    if(Math.floor(Math.random()*2) && bat.alive !== true){
      sounds.bat()
      bat.alive = true;
      bat.exists = true;
      bat.visible = true;
      bat.body.allowGravity = false;
      bat.body.velocity.y = 0;
      var yArray = [300,320,350, 380, 400, 420, 480, 500, 550, 580]
      var leftSpeeds = [40, 50, 60, 70, 80, 90, 100, 120, 130]
      var rightSpeeds = [-40, -50, -60, -70, -80, -90, -100, -120, -130]
      //var batSpeed = speeds[Math.floor(Math.random()* speeds.length)]
      var selectedY = yArray[Math.floor(Math.random() * yArray.length)]
      bat.body.collideWorldBounds = false;
      var directions = ['left', 'right']
      var direction = directions[Math.floor(Math.random() *2)]
      if(direction == 'left'){
        bat.body.velocity.x = rightSpeeds[Math.floor(Math.random()* rightSpeeds.length)]
        bat.body.y = selectedY
        bat.body.x = 870;
        batRight = false;
        batLeft = true;
      }
      else{
        bat.body.velocity.x = leftSpeeds[Math.floor(Math.random()* leftSpeeds.length)]
        bat.body.y = selectedY;
        bat.body.x = -10;
        batLeft = false;
        batRight = true;
      }
    }
  },
  generateRat: function(){
    if(Math.floor(Math.random()*2) && rat.alive !== true){
        //sounds.rat()
        trampDude.insertAnyText('RAT!!!', player1.body.x, player1.body.y, 'rgb(237, 32, 26)', 'fadeText' )
        rat.alive = true;
        rat.exists = true;
        rat.visible = true;
        var leftSpeeds = [190, 210, 230, 260, 280, 300, 325, 400, 500, 540, 580, 600, 640, 700, 725, 745, 800, 825]
        var rightSpeeds = [-190, -210, -230, -260, -280, -300, -325, -400, -500, -540, -580, -600, -640, -700, -725]
        //var batSpeed = speeds[Math.floor(Math.random()* speeds.length)]
        rat.body.collideWorldBounds = false;
        var directions = ['left', 'right']
        var direction = directions[Math.round(Math.random())]
        // Rats from the left are TOO DIFFICULT!
        direction = "right"
        if(direction == 'left'){
          rat.body.velocity.x = 40
          rat.body.x = 860;
          ratRight = false;
          ratLeft = true;
        }
        else{
          rat.body.velocity.x = rightSpeeds[Math.floor(Math.random()* rightSpeeds.length)]
          rat.body.x = -19;
          ratLeft = false;
          ratRight = true;
        }
    }
  },
  collectBat: function(a,b){
    sounds.pickupBat()
    player2.body.velocity.y = -10
    b.kill()
    batDead = false;
    trampDude.score += 50;
    scoreText.text = "Score: " + String(trampDude.score);
    trampDude.insertAnyText('+50', player2.body.x, player2.body.y, 'rgb(249, 207, 61)')
    enemies.generateRat()
  }
}

var preload = function(){
    game.load.image('paddle', './imgs/trampoline.png');
    game.load.image('background', './imgs/the_sky2.png');
    game.load.spritesheet('dudeFlip', './imgs/trampDude/dudeFlip.png', 54, 68)
    game.load.spritesheet('alien', './imgs/oldsprite.png', 15.83, 24);
    game.load.spritesheet('bats', './imgs/bats.png', 32, 36);
    game.load.spritesheet('rats', './imgs/rats.png', 32, 22);
    //---- Sound Track
    game.load.audio('soundtrack', './audio/sound_track.mp3')
    //---- Audio Sprites
    game.load.audio('poor_landing', './audio/badLanding.mp3')
    game.load.audio('bat_sound', './audio/bat.mp3')
    game.load.audio('bounce', './audio/bounce2.mp3')
    game.load.audio('jump', './audio/Jump3.mp3')
    game.load.audio('good_landing', './audio/goodLanding.mp3')
    game.load.audio('perfect_landing', './audio/perfect.mp3')
    game.load.audio('pickup_bat', './audio/pickup.mp3')
    game.load.audio('rat_sound', './audio/rat.mp3')
    game.load.audio('stun_bat', './audio/stun.mp3')
    game.load.audio('wrong_flip', './audio/wrongFlip.mp3')
    game.load.audio('die', './audio/die.mp3')
    game.load.audio('dieLanding', './audio/dieLanding.mp3')
    game.load.audio('eat_player2', './audio/eat_player2.mp3')
    game.load.audio('flapping', './audio/flapping.mp3')
    //__________________
}

// Create all our Stuff
var create = function() {
    //Background Spirit - Has No Gravity
    bg = game.add.sprite(1, 0, 'background');
    //---- Sound Track
    music = game.add.audio('soundtrack',true)
    music.play('',0,1,true)
    music.onLoop.add(sounds.playSoundTrack)
    // Setup Audio Sprites ---
    poor_landing_sound = game.add.audio('poor_landing')
    bat_sound = game.add.audio('bat_sound')
    bounce_sound = game.add.audio('bounce')
    player2_jump_sound = game.add.audio('jump')
    good_landing_sound = game.add.audio('good_landing')
    perfect_landing_sound = game.add.audio('perfect_landing')
    pickup_bat_sound = game.add.audio('pickup_bat')
    rat_sound = game.add.audio('rat_sound')
    stun_bat_sound = game.add.audio('stun_bat')
    wrong_flip_sound = game.add.audio('wrong_flip')
    die_sound = game.add.audio('die')
    die_landing_sound = game.add.audio('dieLanding')
    eat_player2_sound = game.add.audio('eat_player2')
    flapping_sound = game.add.audio('flapping')
    // ----------------------
    poor_landing_sound.addMarker('poor_landing','0','1.5')
    bat_sound.addMarker('bat_sound',0,2)
    bounce_sound.addMarker('bounce',0,2)
    player2_jump_sound.addMarker('jump',0,2)
    good_landing_sound.addMarker('good_landing',0,2)
    perfect_landing_sound.addMarker('perfect_landing',0,2)
    pickup_bat_sound.addMarker('pickup_bat',0,2)
    rat_sound.addMarker('rat_sound', 0,2)
    stun_bat_sound.addMarker('stun_bat',0,2)
    wrong_flip_sound.addMarker('wrong_flip',0,2)
    die_sound.addMarker('die_sound',0,2)
    die_landing_sound.addMarker('die_landing',0,2)
    eat_player2_sound.addMarker('eat_player2',0,2)
    flapping_sound.addMarker('flapping_sound',0,2)
    // ______________________
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
    batGroup = game.add.group()
    for(var i=0; i < 50;i++){
      batGroup.create(game.world.randomX,game.world.randomY, 'bats',0)
    }

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    game.physics.arcade.gravity.y = 270;

    // Shield Parameters
    player1 = game.add.sprite(400, 640, 'dudeFlip');
    //BAT STARTS HIDDEN
    bat = game.add.sprite(-35,400,'bats');
    //RAT STARTS HIDDEN
    rat = game.add.sprite(-35, 780, 'rats');
    //game.time.events.loop(150, fire, this);

    game.physics.enable(player1, Phaser.Physics.ARCADE);
    game.physics.enable(shield, Phaser.Physics.ARCADE);
    game.physics.enable(player2, Phaser.Physics.ARCADE)
    game.physics.enable(bat, Phaser.Physics.ARCADE)
    game.physics.enable(rat, Phaser.Physics.ARCADE)

    //player1 collision
    player1.body.bounce.y = 0.4;
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

    // Bat Enemy Animations
    bat.animations.add('right', [1,2,3],10, true);
    bat.animations.add('left', [6,5,4],10, true);
    bat.animations.add('dead', [2], true);


    // Bat Group
    //var frameNames = Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4);
    batGroup.callAll('animations.add', 'animations', 'right',[1,2,3],10, true)
    batGroup.callAll('animations.add', 'animations', 'left',[6,5,4],10, true)
    batGroup.callAll('animations.add', 'animations', 'dead',[2], true)
    //batGroup.setAll('body.velocity.x', 40)

     // Rat Enemy Animations
     rat.animations.add('right', [0,1,2,3,4], 10, true)
     rat.animations.add('left', [5,6,7,8,9], 10, true)

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
    //shield.body.immovable = true
    //player2.body.immovable = true

    //Parameters for Player 1 Rotation
    player1.body.maxAngular = 400;
    player1.body.angularDrag = 50;
    player1.anchor.setTo(0.5,0.5)

    // No Gravity for the bg Image
    bg.body.allowGravity = false;
    bat.body.allowGravity = false;
    rat.body.allowGravity = false;
    batGroup.forEach(function(bat){bat.body.allowGravity = false})

}

//Core Game Logic Gets Looped Here

var update = function() {
    // Check to see if player has lost game
    gameOver()
    // GENERATE ROTATION ARRAY
    currentAngle = trampDude.getRotation();
    if(currentAngle > 60 || currentAngle < -60){
      trampDude.createRotationList()
    }
    //Reset acceleration
    player1.body.angularAcceleration = 0;
    //Player 1 bounce off walls
    player1.body.collideWorldBounds = true;
    player1.body.bounce.set(0.43)
    //Except the top boundry
    if(player1.body.y > 760){
      player1.body.collideWorldBounds = false;
    }

    // - - -Collision Logic Start
    game.physics.arcade.collide(shield, player1, null, reflect, this);
    game.physics.arcade.collide(player1, bat, null, stun, this)
    game.physics.arcade.collide(shield, bat, null, enemies.collectBat, this)
    game.physics.arcade.collide(rat, player2, grab)
    batGroup.forEach(function(bat){
      game.physics.arcade.collide(bat, player1, stun)
    })
    batGroup.forEach(function(bat){
      game.physics.arcade.collide(shield, bat, enemies.collectBat)
    })
    // - - -Collision Logic End
    shield.body.velocity.x = 0
    player2.body.velocity.x = 0;
    // DELETE THIS!

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
    //Check to see if character is on ground before jumping again!
    if ((jumpButton.isDown || wButton.isDown)&& shield.body.onFloor() && game.time.now > jumpTimer){
        sounds.jump()
        shield.body.velocity.y = -150;
        jumpTimer = game.time.now + 750;
        player2.body.velocity.y = -150
        player2.animations.play('idle')
    }
    // Check if player1 Is Dead
    checkBounds(player1)
    //BAT MOVEMENT HERE
    if(batDead){
      batGroup.callAll('play','dead')
      bat.animations.play('dead')
      flapping_sound.stop()
    }
    else if(batLeft){
      batGroup.forEach(function(bat){
          bat.body.velocity.x = -40
      })
      batGroup.forEach(function(bat){
          bat.animations.play('left')
      })
      bat.animations.play('left')
      //bat.body.velocity.x = -40;
      sounds.generateFlapping()
    }
    else if(batRight){
      batGroup.callAll('play','right')
      bat.animations.play('right')
      //bat.body.velocity.x = 40;
      sounds.generateFlapping()
    }

    //RAT MOVEMENT HERE
    if(ratLeft){
      rat.animations.play('right')
      rat.body.velocity.x = -60;
    }
    else if(ratRight){
      rat.animations.play('left')
      rat.body.velocity.x = 60;
    }

    //Check if Bat is out of Bounds
    if(bat.body.x > 900 || bat.body.x < -10){
      bat.kill()
      flapping_sound.stop()
    }
    //Check if Rat is out of Bounds
    if(rat.body.x > 900 || rat.body.x < -20){
      rat.kill()
    }
}

// Function to reflect trampDude!****
function reflect(a, player1){
    if(player1.y > (shield.y +15)){
      return true;
    }
    else{
      sounds.bounce()
      player1.body.velocity.y = -500 || player1.body.velocity.y
      player1.body.velocity.x = 0;
      trampDude.checkLanding(trampDude.getRotation())
      player1.body.velocity.x = shield.body.velocity.x * 1.5 ;
      //enemies.generateBat()
      return false;
    }
}
function stun(a, bat){
  batDead = true;
  sounds.stunBat()
  a.body.allowGravity = true;
  player1.body.velocity.y += 1
  a.animations.play('dead')
  a.body.velocity.x += 10;
  a.body.velocity.y -= 10;
  a.body.rotation +=4
  a.body.collideWorldBounds = true;
  game.time.events.add(400, function(){ a.body.velocity.x = 0})
  if(bat.body.x > 870){a.body.y = 0}
  //game.physics.arcade.collide(player1, bat, null, reflect, this)
}

//Rat Grabs Player2
function grab(){
  sounds.eatPlayer2()
  player2.kill()
  //add player2 dead sprite to rat x location.
  game.time.events.add(2000, function(){
    trampDude.lives = 0
  })
}

// function to kill the player1 if they hit the ground
function checkBounds(player1){
  if(player1.body.y > 759){
    trampDude.killPlayer1()
    trampDude.insertAnyText('OOOPS!', player2.body.x -50 , player2.body.y - 50, 'rgb(20, 230, 198)', 'fadeText')
    player1.kill();
    trampDude.restartPlayer1()
  }
}

//Game_Over Function
function gameOver(){
  if(trampDude.lives == 0){
    intro_pic = game.add.sprite(200, 300, 'end_image.png');
    flapping_sound.stop()
    sounds.die()
    game.state.start('game_over');
    bat.kill()
    rat.kill()
    trampDude.lives = 3;
    music.stop()
    // FLIPS SET HERE FOR DEMO PURPOSES
    trampDude.flipsNeeded = ["1 Front Flip","1 Back Flip"]
    if(trampDude.score > topScore){
      topScore = trampDude.score
    }
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

var playState = {
  preload: preload,
  create: create,
  update: update,
  render: render,
}
