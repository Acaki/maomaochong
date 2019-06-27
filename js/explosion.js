var Explosion = function(game) {
  //Call constructor of Phaser.Sprite to initialize this
  Phaser.Group.call(this, game);
  this.createMultiple(30, 'explosion');

  //Set the origin point of each explosion to its center
  this.setAll('anchor', new Phaser.Point(0.5, 0.5));
  this.callAll('animations.add', 'animations', 'explodeAnimation', null, 32);
}

//Explosion inherited from Phaser.sprite
Explosion.prototype = Object.create(Phaser.Group.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.display = function(x, y) {
  var explosion = this.getFirstExists(false);
  //Set the coordinates of explosion
  explosion.reset(x, y);
  explosion.play('explodeAnimation', null, false, true);
}
