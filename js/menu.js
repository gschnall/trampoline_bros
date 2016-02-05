var menuState = {
  preload: function(){
    game.load.image('background', './imgs/the_sky2.png');
    game.load.image('intro_image', './imgs/intro_pic2.png');
    game.load.image('end_image', './imgs/dead_player1.png')
  },
  create: function() {
    var bg = game.add.sprite(0, -320, 'background');
    var intro_pic = game.add.sprite(200, 300, 'intro_image');
    var introStyle2 = { font: "48px Arial",fill:'#ffffff',stroke:'#000000', strokeThickness:12};
    var nameLabel = game.add.text(100,130, 'Klydebert & Squirt: Trampoline Bros!',introStyle2)
    var displayTopScore = game.add.text(100, 246,
                                   '- - Top Score: ' + topScore,
                                   {font: '42px Arial', fill: '#ffffff',stroke:'#000000', strokeThickness:4 });
    var introStyle = { font: "52px Arial",fill:'#ffffff',stroke:'#000000', strokeThickness:5, align:'left'};
    var startLabel = game.add.text(80, game.world.height-80,'press the "W" key to start', introStyle)


    var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)

    wKey.onDown.addOnce(menuState.start);
  },
  start: function(){
    game.state.start('play');
  }

};
