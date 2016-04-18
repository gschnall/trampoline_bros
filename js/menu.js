var select_sound
var menuState = {
  preload: function(){
    game.load.image('background', './imgs/the_sky2.png');
    game.load.image('intro_image', './imgs/intro_pic2.png');
    game.load.image('end_image', './imgs/dead_player1.png')
    game.load.audio('bouncer', './audio/bounce2.mp3')
    game.load.audio('start', './audio/select.mp3')
    //UNCOMMENT LINES BELOW TO TURN ON SAMPLE SOUND TRACK
    music = game.add.audio('soundtrack',true)
    
    music.play('',0,1,true)
    music.onLoop.add(sounds.playSoundTrack)

  },
  create: function() {
    //Intro sounds
    select_sound = game.add.audio('start')

    var bg = game.add.sprite(1, -320, 'background');
    var intro_pic = game.add.sprite(200, 300, 'intro_image');
    var introStyle2 = { font: "48px Arial",fill:'#ffffff',stroke:'#000000', strokeThickness:12};
    var nameLabel = game.add.text(400,100, 'Klydebert & Squirt: Trampoline Bros!',introStyle2)

    nameLabel.anchor.setTo(0.5,0.5)

    var instructStyle = { font: "22px Arial",fill:'#ffffff',stroke:'#000000', strokeThickness:5, align:'left'};
    var displayInstructions = game.add.text(495, 140,
                                   '|X|X|X|X| Controls |X|X|X|X|',
                                   {font: '32px Arial', fill: '#ffffff',stroke:'#000000', strokeThickness:4 });
    var displayInstructions = game.add.text(495, 160,
                                   '-------------------------------------',
                                   {font: '32px Arial', fill: '#ffffff',stroke:'#000000', strokeThickness:4 });
    var player1Control = game.add.text(500, 190,
                                   'Player 1 (Guy Jumping On Trampoline)',
                                   instructStyle);
    var player1Control2 = game.add.text(530, 240,
                                   '- Left Arrow Key to Flip Forward\n' +
                                   '- Right Arrow Key to Flip Backwards',
                                   instructStyle);
    var player2Control = game.add.text(500, 330,
                                   'Player 2 (Alien Dragging The Trampoline)',
                                   instructStyle);
    var player2Control2 = game.add.text(530, 380,
                                   '- W Key to Jump\n' +
                                   '- A Key to Move Left\n' +
                                   '- D Key to Move Right',
                                   instructStyle);
    var displayTopScore = game.add.text(100, 156,
                                   '- - Top Score: ' + topScore,
                                   {font: '42px Arial', fill: '#ffffff',stroke:'#000000', strokeThickness:4 });
    var introStyle = { font: "52px Arial",fill:'#ffffff',stroke:'#000000', strokeThickness:5, align:'left'};
    var startLabel = game.add.text(80, game.world.height-80,'press the "W" key to start', introStyle)

    var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
    wKey.onDown.addOnce(menuState.start);
  },
  start: function(){
    select_sound.play()
    game.state.start('play');
  }

};
