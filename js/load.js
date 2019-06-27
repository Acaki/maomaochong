var loadState = {
  preload: function(){
    game.load.image('starfield', 'assets/loadfield.jpg');

  },
  create: function(){
     game.add.tileSprite(0, 0, 600, 800, 'starfield');
     var loading = game.add.text(game.world.centerX + 150, game.world.height - 60, 'Loading ...', { font: '36px Arial', fill: '#ffffff' });
     loading.anchor.setTo(0.5, 0.5);
     var load = game.add.tween(loading).to({alpha: 0}, 500 ).to({alpha: 1}, 500, null ,false , 0 , 1).start();
     load.onComplete.addOnce(this.startplay, this);
  },
  startplay: function(){
    game.state.start('main');
  }

};
