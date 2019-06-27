var ScatterBullet = function (game, sprite) {
  this.weapon = game.add.weapon(128, 'laserRed');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 600;
  this.weapon.fireRate = 90;
  //Tell the bullet to track the sprite location
  this.weapon.trackSprite(sprite, 0, -sprite.height - 10);
  this.weapon.multiFire = true;

  this.powerLevel = 1;
  this.weapon.bullets.setAll('damage', 0.25);
  this.weapon.bullets.setAll('alpha', 0.5);

  return this;
}

ScatterBullet.prototype.shoot = function () {
  //Reset the fire angle to up
  this.weapon.fireAngle = -90;
  if (this.powerLevel == 1) {
    this.weapon.fire(null, null, null, -10);
    this.weapon.fire(null, null, null, 10);
  }
  else if (this.powerLevel == 2) {
    this.weapon.fireAngle = -99;
    this.weapon.fire(null, null, null, -15);
    this.weapon.fireAngle = -93;
    this.weapon.fire(null, null, null, -5);
    this.weapon.fireAngle = -87;
    this.weapon.fire(null, null, null, 5);
    this.weapon.fireAngle = -81;
    this.weapon.fire(null, null, null, 15);
  }

  else if (this.powerLevel == 3) {
    this.weapon.fireAngle = -105;
    this.weapon.fire(null, null, null, -25);
    this.weapon.fireAngle = -99;
    this.weapon.fire(null, null, null, -15);
    this.weapon.fireAngle = -93;
    this.weapon.fire(null, null, null, -5);
    this.weapon.fireAngle = -87;
    this.weapon.fire(null, null, null, 5);
    this.weapon.fireAngle = -81;
    this.weapon.fire(null, null, null, 15);
    this.weapon.fireAngle = -75;
    this.weapon.fire(null, null, null, 25);
  }
}

var Beam = function (game, sprite) {
  this.weapon = game.add.weapon(256, 'laserGreen');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 1000;
  this.weapon.fireRate = 0;
  //Tell the bullet to track the sprite location
  this.weapon.trackSprite(sprite, 0, -sprite.height - 10);
  this.weapon.multiFire = true;
  this.powerLevel = 1;

  this.weapon.bullets.setAll('damage', 0.15);
  this.weapon.bullets.setAll('alpha', 0.5);

  return this;
}

Beam.prototype.shoot = function () {
  if (this.powerLevel == 1) {
    this.weapon.fire();
  }

  else if (this.powerLevel == 2) {
    this.weapon.fire(null, null, null, -3);
    this.weapon.fire(null, null, null, 3);
  }

  else if (this.powerLevel == 3) {
    this.weapon.fire(null, null, null, -6);
    this.weapon.fire(null, null, null, 0);
    this.weapon.fire(null, null, null, 6);
  }
}

var SplashBullet = function (game, sprite) {
  this.weapon = game.add.weapon(128, 'laserBlue');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletAngleVariance = 30;
  this.weapon.bulletSpeedVariance = 50;
  this.weapon.bulletSpeed = 600;
  this.weapon.fireRate = 50;
  //Tell the bullet to track the sprite location
  this.weapon.trackSprite(sprite, 0, -sprite.height - 10);
  this.weapon.multiFire = true;
  this.powerLevel = 1;

  this.weapon.bullets.setAll('damage', 0.3);
  this.weapon.bullets.setAll('alpha', 0.5);

  return this;
}

SplashBullet.prototype.shoot = function () {
  if (this.powerLevel == 1) {
    this.weapon.fire();
  }

  else if (this.powerLevel == 2) {
    this.weapon.fire(null, null, null, -5);
    this.weapon.fire(null, null, null, 5);
  }

  else if (this.powerLevel == 3) {
    this.weapon.fire(null, null, null, -10);
    this.weapon.fire(null, null, null, 0);
    this.weapon.fire(null, null, null, 10);
  }
}

//Enemy weapons1
var Missile = function(game){
  this.weapon = game.add.weapon(5, 'spaceMissile');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 250;

  this.weapon.fireRate = 800;
  this.weapon.multiFire = true;

  return this;
}

Missile.prototype.shoot = function(sprite) {
  this.weapon.trackSprite(sprite, 0, sprite.height / 2);
  var playerX = player.body.x;
  var playerY = player.body.y;
  this.weapon.fire(null, playerX , playerY, -15);
  this.weapon.fire(null, playerX , playerY, 15);
}

//Enemy weapons2
var ThreeARow = function(game){
  this.weapon = game.add.weapon(30, 'star');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 200;
  this.weapon.bulletAngleVariance = 5;
  this.weapon.fireRate = 800;
  this.weapon.multiFire = true;

  return this;
}

ThreeARow.prototype.shoot = function(sprite) {
  this.weapon.trackSprite(sprite, 0, sprite.height / 2);
  this.weapon.fireAngle = 100;
  this.weapon.fire();
  this.weapon.fireAngle = 90;
  this.weapon.fire();
  this.weapon.fireAngle = 80;
  this.weapon.fire();
}

//Enemy weapons3
var VariedAngle = function(game){
  this.weapon = game.add.weapon(7, 'laserGreen16');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletAngleVariance = 3;
  this.weapon.bulletSpeed = 300;

  this.weapon.fireRate = 100;

  return this;
}

VariedAngle.prototype.shoot = function(sprite) {
  this.weapon.trackSprite(sprite, 0, sprite.height / 2);
  var playerX = player.body.x;
  var playerY = player.body.y;
  this.weapon.fire(null, playerX, playerY);
  this.weapon.fire(null, playerX, playerY);
}

//Enemy weapons4
var RingScattered = function(game){
  this.weapon = game.add.weapon(200, 'spaceRocketPart');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 150;
  this.weapon.fireRate = 100;
  this.weapon.multiFire = true;
  this.fireAngles = [0, 120, 240];

  return this;
}

RingScattered.prototype.shoot = function(sprite) {
  this.weapon.trackSprite(sprite, 0, sprite.height / 2);
  for (var i = 0; i < 3; i++) {
    if (this.fireAngles[i] >= 360) {
      this.fireAngles[i] = 0;
    }
    this.weapon.fireAngle = this.fireAngles[i];
    this.weapon.fire();
    this.fireAngles[i] += 2;
  }
}

var Circle = function(game){
  this.weapon = game.add.weapon(100, 'laserBlue02');

  this.game = game;
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 200;
  this.weapon.bulletAngleOffset = 90;
  this.weapon.fireRate = 100;
  this.weapon.multiFire = true;
  this.currentTime = 0;

  return this;
}

Circle.prototype.shoot = function(sprite) {
  this.weapon.trackSprite(sprite);
  if (this.game.time.totalElapsedSeconds() - this.currentTime >= 1) {
    for (var j = 0; j < 24; j++) {
      this.weapon.fireAngle = j * 15;
      this.weapon.fire();
    }
    this.currentTime = this.game.time.totalElapsedSeconds();
  }
}

var RandomSplash = function(game){
  this.weapon = game.add.weapon(200, 'laserRed08');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 200;
  this.weapon.fireRate = 50;
  this.weapon.fireAngle = 180;
  this.weapon.bulletAngleVariance = 180;
  this.weapon.multiFire = true;

  return this;
}

RandomSplash.prototype.shoot = function(sprite) {
  this.weapon.trackSprite(sprite);
  this.weapon.fire();
}

var bossSingle = function(game){
  this.weapon = game.add.weapon(100, 'laserRed04');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 250;
  this.weapon.bulletAngleOffset = 90;
  this.weapon.fireRate = 150;
  this.weapon.multiFire = true;
  this.weapon.fireAngle = 90;
  this.enabled = false;

  return this;
}

bossSingle.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }
  this.weapon.trackSprite(sprite);
  this.weapon.fire(null, null, null, -121, 106);
  this.weapon.fire(null, null, null, 121, 106);
}

var bossDouble = function(game){
  this.weapon = game.add.weapon(50, 'star');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 250;
  this.weapon.fireRate = 500;
  this.weapon.multiFire = true;
  this.weapon.fireAngle = 90;
  this.enabled = false;

  return this;
}

bossDouble.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }
  this.weapon.trackSprite(sprite);
  this.weapon.fire(null, null, null, -15, 95);
  this.weapon.fire(null, null, null, 15, 95);
}

var bossCircle = function(game){
  this.weapon = game.add.weapon(100, 'spaceParts_079');

  this.game = game;
  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 300;
  this.weapon.fireRate = 50;
  this.weapon.multiFire = true;
  this.currentTime = 0;
  this.enabled = false;

  return this;
}

bossCircle.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }
  this.weapon.trackSprite(sprite);
  if (this.game.time.totalElapsedSeconds() - this.currentTime >= 1) {
    for (var j = 0; j < 24; j++) {
      this.weapon.fireAngle = j * 15;
      this.weapon.fire();
    }
    this.currentTime = this.game.time.totalElapsedSeconds();
  }
}

var bossMissile = function(game){
  this.weapon = game.add.weapon(50, 'spaceMissiles_009');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 300;
  this.weapon.bulletAngleOffset = 90;
  this.weapon.fireRate = 500;
  this.weapon.multiFire = true;
  this.enabled = false;

  return this;
}

bossMissile.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }
  this.weapon.trackSprite(sprite);
  var playerX = player.body.x;
  var playerY = player.body.y;
  this.weapon.fire(null, playerX , playerY, -132, -45);
  this.weapon.fire(null, playerX , playerY, 132, -45);
}

var bossFan = function(game){
  this.weapon = game.add.weapon(100, 'laserRed08');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 150;
  this.weapon.fireRate = 600;
  this.weapon.multiFire = true;
  this.weapon.fireAngle = 90;
  this.enabled = false;

  return this;
}

bossFan.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }
  this.weapon.trackSprite(sprite);
  for (var i = 0; i < 100; i += 20) {
    this.weapon.fireAngle = 50 + i;
    this.weapon.fire(null, null, null, 0, 95);
  }
}

var bossMissile2 = function(game){
  this.weapon = game.add.weapon(50, 'spaceMissiles_018');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = -250;
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletAngleVariance = 30;
  this.weapon.fireRate = 500;
  this.weapon.multiFire = true;
  this.enabled = false;

  return this;
}

bossMissile2.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }

  this.weapon.trackSprite(sprite);
  this.weapon.bulletGravity.set(30, 10);
  this.weapon.fire(null, null, null, -105, 60);
  this.weapon.bulletGravity.set(-30, 10);
  this.weapon.fire(null, null, null, 105, 60);
}

var bossVary = function(game){
  this.weapon = game.add.weapon(50, 'laserBlue03');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = -350;
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletAngleVariance = 45;
  this.weapon.fireRate = 400;
  this.weapon.multiFire = true;
  this.enabled = false;

  return this;
}

bossVary.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }

  this.weapon.trackSprite(sprite);
  this.weapon.fire(null, null, null, -27, 65);
  this.weapon.fire(null, null, null, 27, 65);
}

var bossRingScattered = function(game){
  this.weapon = game.add.weapon(200, 'spaceBuilding_004');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 300;
  this.weapon.fireRate = 70;
  this.weapon.multiFire = true;
  this.fireAngles = [0, 120, 240];
  this.enabled = false;

  return this;
}

bossRingScattered.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }

  this.weapon.trackSprite(sprite);
  for (var i = 0; i < 3; i++) {
    if (this.fireAngles[i] >= 360) {
      this.fireAngles[i] = 0;
    }
    this.weapon.fireAngle = this.fireAngles[i];
    this.weapon.fire(null, null, null, -34, -38);
    this.fireAngles[i] += 2;
  }

  for (var i = 0; i < 3; i++) {
    if (this.fireAngles[i] >= 360) {
      this.fireAngles[i] = 0;
    }
    this.weapon.fireAngle = this.fireAngles[i];
    this.weapon.fire(null, null, null, 34, -38);
    this.fireAngles[i] += 2;
  }
}

var bossFrontScattered = function(game){
  this.weapon = game.add.weapon(200, 'laserRed02');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = -200;
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletAngleVariance = 45;
  this.weapon.fireRate = 300;
  this.weapon.multiFire = true;
  this.enabled = false;

  return this;
}

bossFrontScattered.prototype.shoot = function(sprite) {
  if (!this.enabled) {
    return;
  }

  this.weapon.trackSprite(sprite);
  this.weapon.fire(null, null, null, -28, 100);
  this.weapon.fire(null, null, null, -6, 100);
  this.weapon.fire(null, null, null, 6, 100);
  this.weapon.fire(null, null, null, 28, 100);
}
