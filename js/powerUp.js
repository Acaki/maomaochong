var PowerUp = function(game, key, weaponType) {
  //Call constructor of Phaser.Sprite to initialize this
  Phaser.Sprite.call(this, game, 0, 0, key);

  this.anchor.set(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.weaponType = weaponType;
  this.exists = false;
}

//PowerUp inherited from Phaser.sprite
PowerUp.prototype = Object.create(Phaser.Sprite.prototype);
PowerUp.prototype.constructor = PowerUp;

PowerUp.prototype.drop = function() {

  var halfWidth = this.body.halfWidth;
  //Power ups only appear at the center area of the game
  var x = this.game.rnd.integerInRange(150 + halfWidth, this.game.world.width - halfWidth - 150);
  var angle = this.game.rnd.integerInRange(75, 105);
  var speed = game.rnd.between(120,200);
  //Reset the PowerUp, which moves the PowerUp to the given x/y corrdinates and
  //sets 'exists' to true.
  this.reset(x, 0);

  //Set PowerUp's velocity that is calculated from the given angle and speed
  game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
}

var PowerUpGroup = function(game) {
  Phaser.Group.call(this, game, game.world, 'Power Up Group', false, true, Phaser.Physics.ARCADE);

  this.add(new PowerUp(game, 'powerupRed_star', 0), true);
  this.add(new PowerUp(game, 'powerupRed_star', 0), true);
  this.add(new PowerUp(game, 'powerupGreen_star', 1), true);
  this.add(new PowerUp(game, 'powerupGreen_star', 1), true);
  this.add(new PowerUp(game, 'powerupBlue_star', 2), true);
  this.add(new PowerUp(game, 'powerupBlue_star', 2), true);

  return this;
}

PowerUpGroup.prototype = Object.create(Phaser.Group.prototype);
PowerUpGroup.prototype.constructor = PowerUpGroup;

PowerUpGroup.prototype.drop = function() {
  var powerUpInstance;
  do {
    powerUpInstance = this.getRandom();
  }
  while(powerUpInstance.exists)
  powerUpInstance.drop();
}
