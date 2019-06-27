// Initialize Phaser
var game = new Phaser.Game(600, 800, Phaser.AUTO, '');

// Define states
game.state.add('menu', menuState);
game.state.add('load',loadState);
game.state.add('main', MainState);
game.state.add('gameover',OverState)

// Start the "menu" state
game.state.start('menu');
