var menuState = {

  create: function() {

    var nameLabel = game.add.text(80,80, 'Klydebert & Squirt: Trampoline Bros!',
                                  {font: '50px Arial', fill: '#ffffff' })

    var startLabel = game.add.text(80, game.world.height-80, 
                                    'press the "W" key to start',
                                    {font: '25px Arial', fill: '#ffffff' })

    var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)

    wKey.onDown.addOnce(menuState.start);
  },
  start: function(){
    game.state.start('play');
  }

};
