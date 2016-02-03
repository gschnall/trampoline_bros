var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var emitter;
var emitterBlue;

function preload() {

    game.load.image('red-square', './imgs/red-square.png');
    game.load.image('blue-square', './imgs/blue-square.png');

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x337799;

    emitter = game.add.emitter(200,100, 100);
    emitterBlue = game.add.emitter(game.world.centerX, 200, 200);

    emitter.makeParticles('red-square');
    emitter.gravity = 400;
    emitterBlue.gravity= 400;

    particleBurst(emitter)
}

function particleBurst(color) {
    color.x = 30;
    color.y = 80;

    color.start(true, 4000, null, 10);

    //  And 2 seconds later we'll destroy the emitter
    game.time.events.add(5000, destroyEmitter(emitterBlue), this);

}
function destroyEmitter(color) {
    color.destroy();
}
