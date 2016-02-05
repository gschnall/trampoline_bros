var game_overState = {
  preload: function(){
    game.load.image('outImage', './imgs/dead_player1.png');
  },
  create: function() {
    var bg = game.add.sprite(0, -320, 'background');
    var outro_pic = game.add.sprite(200, 400, 'outImage');
    var gameOver = game.add.text(200, 100,
                                   'GAME OVER',
                                   {font: '85px Arial', fill: '#ffffff' });
    var pastScore = game.add.text(200, 246,
                                   'Score: ' + trampDude.score,
                                   {font: '85px Arial', fill: '#ffffff',stroke:'#000000', strokeThickness:4 });
    var startLabel = game.add.text(10, game.world.height-80,
                                   'press the "SpaceBar" to restart',
                                   {font: '55px Arial', fill: '#ffffff',stroke:'#000000', strokeThickness:9});

    var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spaceBar.onDown.addOnce(game_overState.restart);
  },
  restart: function() {
    console.log('ending menu')
    trampDude.score = 0;
    game.state.start('menu');
  }
}
