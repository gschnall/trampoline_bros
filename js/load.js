var loadState = {
 preload: function() {
    //Loading Text Here
  var loadingLabel = game.add.text(80, 150, 'loading...',
                                      {font: '30px Courier', fill: '#ffffff'})
 },

 create: function() {
   game.state.start('menu');
 }
};
