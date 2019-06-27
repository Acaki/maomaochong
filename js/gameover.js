var OverState = {

  create: function(){
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
    background.autoScroll(0, -30);

    gameOverMusic = game.add.audio('gameover');
    gameOverMusic.volume = 0.5;
    gameOverMusic.play();

    var tween = game.add.tween(background).to( { alpha: 0.5 }, 1000, "Linear", true, 1000);
    var gameOverText;

    if (isWon) {
      gameOverText = game.add.text(game.world.centerX - 115, game.world.centerY - 110, 'You Won!!!', { font: '45px Arial', fill: '#00ff00' });
    }
    else {
      gameOverText = game.add.text(game.world.centerX - 110, game.world.centerY - 110, 'Game Over', { font: '45px Arial', fill: '#ff0000' });
    }
    gameOverText.alpha = 0;

    var showOver = game.add.tween(gameOverText).to({alpha: 1}, 2000, null ,false , 2000 , 1).start();

    var retryText = game.add.text(120, game.world.centerY, 'Press R to restart or Q to quit', { font: '28px Arial', fill: '#ffffff' });
    retryText.alpha = 0;
    var showRetry = game.add.tween(retryText).to({alpha: 1}, 1500, null ,false , 2500 , 10).start();
    var restartKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    restartKey.onDown.addOnce(this.restart, this);
    var quitKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    quitKey.onDown.addOnce(this.quit, this);

  },
  restart: function(){
    gameOverMusic.stop();
    game.state.start('main');
  },
  quit: function(){
    gameOverMusic.stop();
    game.state.start('menu');
  }

};
