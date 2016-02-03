var game = new Phaser.Game(920, 800, Phaser.CANVAS, 'gameDIV')

game.state.add( 'boot', bootState)
game.state.add( 'load', loadState)
game.state.add( 'menu', menuState)
game.state.add( 'play', playState)
game.state.add( 'game_over', game_overState)

game.state.start('boot');
