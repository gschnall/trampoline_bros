var game_overState = {
  create: function() {
    var looseLabel = game.add.text(80,80, 'GAME OVER',
                                  {font:'50px Arial', fill: '#ffffffff' });

    var startLabel = game.add.text(80, game.world.height-80,
                                   'press the "SpaceBar" to restart',
                                   {font: '25px Arial', fill: '#ffffff' });

    var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    spaceBar.onDown.addOnce(this.restart, this);
  },

  //function to restart game
  restart: function() {
    game.state.start('menu');
  },
}
