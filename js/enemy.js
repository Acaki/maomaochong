var Enemy = function(game, key , health , weapon) {
  //Call constructor of Phaser.Sprite to initialize this
  Phaser.Sprite.call(this, game, 0, 0, key);

  this.game = game;
  //Set the origin point of the sprite to its center
  this.anchor.set(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  //Record whether sprite is processed by the update() function
  this.exists = false;
  this.maxHealth = health;
  this.weapon = weapon;
}
//Enemy inherited from Phaser.sprite
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * @param x - Coordinates x of starting position that enemy will show.
 * @param y - Coordinates y of starting position that enemy will show.
 * @param angle - The moving angle of the enemy.
 * @param xAccel - The acceleration value in x direction.
 * @param yAccel - The acceleration value in y direction.
 */
Enemy.prototype.launch = function(x, y, angle, speed, xAccel, yAccel, angularV, angularA) {
  //Reset enemy image rotaion
  this.rotation = 0;
  var halfWidth = this.body.halfWidth;
  if (x === undefined || x === null) { x = this.game.rnd.integerInRange(0 + halfWidth, this.game.world.width - halfWidth) }
  if (y === undefined || y === null) { y = 0; }
  if (angle === undefined) { angle = this.game.rnd.integerInRange(75, 105); }
  if (speed === undefined) { speed = game.rnd.between(120,200); }
  if (xAccel === undefined) { xAccel = 0; }
  if (yAccel === undefined) { yAccel = 0; }
  if (angularV === undefined) { angularV = 0; }
  if (angularA === undefined) { angularA = 0; }

  //Reset the Enemy, which moves the Enemy to the given x/y corrdinates,
  //sets the 'exists' property to true, and heal the enemy.
  this.reset(x, y, this.maxHealth);

  //Set Enemy's velocity that is calculated from the given angle and speed
  this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
  //Set x and y acceleration value
  this.body.acceleration.set(xAccel, yAccel);
  this.body.angularVelocity = angularV;
  this.body.angularAcceleration = angularA;
}

/**
 * @param x - Coordinates x of starting position that enemy will show.
 * @param y - Coordinates y of starting position that enemy will show.
 * @param properties - A properties object that has the same format as the one used in Phaser.Tween.to(), see the docs for more information
 * @param duration - The time in miliseconds that this tween should complete executing i.e. enemy moving speed.
 */
Enemy.prototype.launchTween = function(x, y, properties, duration, ease) {
  if (ease === undefined || ease === null) { ease = Phaser.Easing.Default; }
  this.reset(x, y, this.maxHealth);
  var tween = this.game.add.tween(this).to(properties, duration, ease, true);
  tween.interpolation(Phaser.Math.catmullRomInterpolation);
}
