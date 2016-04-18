var bootState = {
  preload: function(){
    game.load.spritesheet('alien', './imgs/oldsprite.png', 15.83, 24);
  },
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start('load');
  }
};
