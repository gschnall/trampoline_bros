var loadState = {
 preload: function() {
    var bouncer_sound = game.add.audio('bouncer')
    //Loading Text Here
    game.load.image('paddle', './imgs/trampoline.png');
    // LOAD CHARACTER SPRITES:::
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
  var loadingLabel = game.add.text(80, 150, 'loading...',
                                      {font: '30px Courier', fill: '#ffffff'})
  bouncer_sound.play()
 },

 create: function() {
  game.state.start('menu');
 }
};
