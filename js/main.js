var game;

game = new Phaser.Game(950, 800, Phaser.AUTO, '');

game.state.add('Menu', Menu)

game.state.add('Game', Game);

game.state.start('Menu');
