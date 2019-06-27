// MainState
var background;
var fightMusic;
var playerShoot;
var enemyDie;

var player;
var cursors;
var weapons = [];
var currentWeapon = 0;
var enemyGroups = {};
var enemyBulletGroups = [];
var boss;
var bossIsLaunched = false;
var isWon = false;
var explosions;
var powerUp;

var invincible = false;
var lifeCount = 50;
var lifeText;

var MainState = function(game){};
MainState.prototype = {

  preload: function() {
    game.load.image('player', 'assets/player.png');
    game.load.image('playerLeft', 'assets/playerLeft.png');
    game.load.image('playerRight', 'assets/playerRight.png');

    game.load.image('background', 'assets/backgrounds/purple.png');
    game.load.image('darkBackground', 'assets/backgrounds/darkPurple.png');
    game.load.image('blackBackground', 'assets/backgrounds/black.png');

    //Player bullet and power up images
    game.load.image('laserRed', 'assets/bullets/laserRed02.png');
    game.load.image('powerupRed_star', 'assets/power-ups/powerupRed_star.png');
    game.load.image('laserGreen', 'assets/bullets/laserGreen10.png');
    game.load.image('powerupGreen_star', 'assets/power-ups/powerupGreen_star.png');
    game.load.image('laserBlue', 'assets/bullets/laserBlue13.png');
    game.load.image('powerupBlue_star', 'assets/power-ups/powerupBlue_star.png');
    game.load.image('spaceRocketPart', 'assets/bullets/spaceRocketParts_015.png');
    game.load.image('tinyBullet', 'assets/bullets/bullet5.png');
    game.load.image('spaceParts_079', 'assets/bullets/spaceParts_079.png');
    game.load.image('spaceMissiles_018', 'assets/bullets/spaceMissiles_018.png');

    //Enemy object images
    game.load.image('enemyShip', 'assets/enemies/enemyShip.png');
    game.load.image('enemyUFO', 'assets/enemies/enemyUFO.png');
    game.load.image('meteorBig', 'assets/enemies/meteorBig.png');
    game.load.image('meteorSmall', 'assets/enemies/meteorSmall.png');
    game.load.image('enemyBlue','assets/enemies/enemyBlue2.png');
    game.load.image('enemyGreen', 'assets/enemies/enemyGreen5.png');
    game.load.image('enemyBlack', 'assets/enemies/enemyBlack1.png');
    game.load.image('enemyRed', 'assets/enemies/enemyRed4.png');
    game.load.image('spaceBuilding', 'assets/enemies/spaceBuilding_014.png');
    game.load.image('spaceStation', 'assets/enemies/spaceStation_021.png');
    game.load.image('boss', 'assets/enemies/boss.png');
    game.load.image('boss1', 'assets/enemies/boss1.png');
    game.load.image('boss2', 'assets/enemies/boss2.png');
    game.load.image('boss3', 'assets/enemies/boss3.png');

    //Enemy bullet images
    game.load.image('spaceMissile', 'assets/bullets/spaceMissiles_004.png');
    game.load.image('star','assets/bullets/star3.png');
    game.load.image('laserGreen16','assets/bullets/laserGreen16.png');
    game.load.image('laserBlue02', 'assets/bullets/laserBlue02.png');
    game.load.image('laserBlue03', 'assets/bullets/laserBlue03.png');
    game.load.image('spaceBuilding_004', 'assets/bullets/spaceBuilding_004.png');
    game.load.image('laserRed08', 'assets/bullets/laserRed08.png');
    game.load.image('laserRed04', 'assets/bullets/laserRed04.png');
    game.load.image('laserRed02', 'assets/bullets/laserRed02.png');
    game.load.image('spaceMissiles_009', 'assets/bullets/spaceMissiles_009.png');

    game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);

    //game.load.audio('enemyDie' , 'alien_death1.wav');
  },

  create: function() {
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
    //Make the background slowly scroll up
    background.autoScroll(0, -30);
    //Audio create
    //battle BGM
    fightMusic = game.add.audio('fight');
    fightMusic.loop = true;
    fightMusic.volume = 0.5;
    fightMusic.play();
    //player shooting
    playerShoot = game.add.audio('playershoot');
    playerShoot.volume = 0.02;

    enemyDie = game.add.audio('boom');
    enemyDie.volume = 0.2;
    // score board
    lifeText = game.add.text(16, 16, 'life: ' + lifeCount, { fontSize: '32px', fill: '#fff' });

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Add the player plane on the middle bottom of the screen
    player = game.add.sprite(game.world.width / 2, game.world.height, 'player');
    //Reduce the size of the player plane;
    player.scale.set(0.5);
    player.anchor.set(0.5, 1.0);
    game.physics.arcade.enable(player);
    player.body.setCircle(6, player.width - 10, player.height - 10);
    player.body.collideWorldBounds = true;

    //Player weapons list
    weapons.push(new ScatterBullet(game, player));
    weapons.push(new Beam(game, player));
    weapons.push(new SplashBullet(game, player));

    //Enemy group creation
    enemyGroups.trash = game.add.group(game.world, 'Trash Enemy', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 10; i++) {
      var enemyWeapon = new Missile(game);
      enemyGroups.trash.add(new Enemy(game, 'enemyUFO', 1.5, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    enemyGroups.medium = game.add.group(game.world, 'Trash Enemy2', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 20; i++) {
      var enemyWeapon = new ThreeARow(game);
      enemyGroups.medium.add(new Enemy(game, 'enemyBlue', 10, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    enemyGroups.meteorSmall = game.add.group(game.world, 'Small Meteor', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 10; i++) {
      enemyGroups.meteorSmall.add(new Enemy(game, 'meteorSmall', 2), true);
    }

    enemyGroups.meteorBig = game.add.group(game.world, 'Big Meteor', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 10; i++) {
      enemyGroups.meteorBig.add(new Enemy(game, 'meteorBig', 5), true);
    }

    enemyGroups.green = game.add.group(game.world, 'Green Enemy', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 10; i++) {
      var enemyWeapon = new VariedAngle(game);
      enemyGroups.green.add(new Enemy(game, 'enemyGreen', 12, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    enemyGroups.spaceBuilding = game.add.group(game.world, 'Space Building', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 30; i++) {
      enemyGroups.spaceBuilding.add(new Enemy(game, 'spaceBuilding', 0.5), true);
    }

    enemyGroups.spaceStation = game.add.group(game.world, 'Space Station', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 2; i ++) {
      var enemyWeapon = [];
      enemyWeapon.push(new RingScattered(game));
      enemyWeapon.push(new VariedAngle(game));
      for (var j = 0; j < 2; j++) {
        enemyBulletGroups.push(enemyWeapon[j].weapon.bullets);
      }
      enemyGroups.spaceStation.add(new Enemy(game, 'spaceStation', 120, enemyWeapon), true);
    }

    enemyGroups.black = game.add.group(game.world, 'Black Enemy', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 4; i++) {
      var enemyWeapon = new Circle(game);
      enemyGroups.black.add(new Enemy(game, 'enemyBlack', 22, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    enemyGroups.red = game.add.group(game.world, 'Red Enemy', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 5; i++) {
      var enemyWeapon = new RandomSplash(game);
      enemyGroups.red.add(new Enemy(game, 'enemyRed', 15, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    boss = game.add.sprite(0, 0, 'boss');
    game.physics.arcade.enable(boss);
    boss.anchor.set(0.5);
    boss.checkWorldBounds = true;
    boss.collideWorldBounds = true;
    boss.exists = false;
    boss.maxHealth = 800;
    boss.damageCondition = 0;
    boss.weapons = [];
    boss.weapons.push(new bossSingle(game));
    boss.weapons.push(new bossDouble(game));
    boss.weapons.push(new bossCircle(game));
    boss.weapons.push(new bossMissile(game));
    boss.weapons.push(new bossFan(game));
    boss.weapons.push(new bossMissile2(game));
    boss.weapons.push(new bossVary(game));
    boss.weapons.push(new bossRingScattered(game));
    boss.weapons.push(new bossFrontScattered(game));
    boss.allBullets = [];
    for (var i = 0; i < boss.weapons.length; i++) {
      boss.allBullets.push(boss.weapons[i].weapon.bullets);
    }

    cursors = game.input.keyboard.createCursorKeys();
    //Add key listener for 'shift'
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    explosions = new Explosion(game);
    powerUp = new PowerUpGroup(game);

    stageStart();
  },

  resetGame: function() {
    //Reset global variables
    lifeCount = 50;
    player.reset(game.world.width / 2, game.world.height);
    invincible = false;
    weapons = [];
    currentWeapon = 0;
    enemyGroups = {};
    enemyBulletGroups = [];
    explosions = null;
    powerUp = null;
    fightMusic.stop();
    bossIsLaunched = false;

    game.state.start('gameover');
  },

  resetTint: function(enemy) {
    enemy.tint = 0xffffff;
  },

  damageEnemy: function(enemy, bullet) {
    enemy.damage(bullet.damage);
    enemy.tint = 0xff0000;
    game.time.events.add(15, this.resetTint, this, enemy);
    bullet.kill();
    if(!enemy.alive)
    {
      //Remove the tween that is associated with the enemy
      game.tweens.removeFrom(enemy);
      enemyDie.play();
      explosions.display(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
    }
  },

  revivePlayer: function() {
    player.reset(game.world.width / 2, game.world.height);
    invincible = true;
    game.time.events.add(2000, function() { invincible = false; }, this);
  },

  hitPlayer: function(player) {
    if (!invincible) {
      lifeCount--;
      lifeText.text = 'life: ' + lifeCount;
      player.kill();
      enemyDie.play();
      explosions.display(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
      if (lifeCount != 0) {
        game.time.events.add(1000, this.revivePlayer, this);
      }
    }
    if(lifeCount == 0){
      //Gameover after 1 second
      game.time.events.add(1000, this.resetGame, this);
    }
  },

  enemyShoot: function(enemy) {
    if (enemy.weapon) {
      if (enemy.weapon instanceof Array) {
        for (var i = 0; i < enemy.weapon.length; i++) {
          enemy.weapon[i].shoot(enemy);
        }
      }
      else {
        enemy.weapon.shoot(enemy);
      }
    }
  },

  powerUpWeapon: function(player, powerUp) {
    powerUp.kill();
    var currentPowerLevel = weapons[currentWeapon].powerLevel;
    //Increase power level of current weapon
    if (currentWeapon == powerUp.weaponType && currentPowerLevel < 3) {
      weapons[currentWeapon].powerLevel++;
    }
    //Switch the weapon
    else if (currentWeapon != powerUp.weaponType) {
      currentWeapon = powerUp.weaponType;
      weapons[currentWeapon].powerLevel = currentPowerLevel;
    }
  },

  update: function() {
    keyboardHandler();
    for (var key in enemyGroups) {
      if (enemyGroups.hasOwnProperty(key)) {
        game.physics.arcade.overlap(enemyGroups[key], weapons[currentWeapon].weapon.bullets, this.damageEnemy, null, this);
        game.physics.arcade.overlap(player, enemyGroups[key], this.hitPlayer, null, this);
        enemyGroups[key].forEachExists(this.enemyShoot, this);
      }
    }
    game.physics.arcade.overlap(player, enemyBulletGroups, this.hitPlayer, null, this);
    game.physics.arcade.overlap(player, powerUp, this.powerUpWeapon, null, this);
    if (boss.exists) {
      if (boss.damageCondition == 0) {
        boss.weapons[0].enabled = true;
        boss.weapons[1].enabled = true;
      }
      //console.log(boss.health);
      if (boss.health <= boss.maxHealth * 0.75 && boss.damageCondition == 0) {
        explosions.display(boss.body.x + 48, boss.body.y + 160);
        explosions.display(boss.body.x + 294, boss.body.y + 160);
        enemyDie.play();
        boss.loadTexture('boss1');
        boss.weapons[0].enabled = false;
        boss.weapons[2].enabled = true;
        boss.weapons[3].enabled = true;
        boss.damageCondition = 1;
        boss.heal(boss.maxHealth * 0.20);
      }

      if (boss.health <= boss.maxHealth * 0.5 && boss.damageCondition == 1) {
        explosions.display(boss.body.x + 120, boss.body.y - 20);
        explosions.display(boss.body.x + -120, boss.body.y - 20);
        enemyDie.play();
        boss.loadTexture('boss2');
        boss.weapons[1].enabled = false;
        boss.weapons[2].enabled = false;
        boss.weapons[3].enabled = false;
        boss.weapons[4].enabled = true;
        boss.weapons[5].enabled = true;
        boss.weapons[6].enabled = true;
        boss.damageCondition = 2;
        boss.heal(boss.maxHealth * 0.15);
      }

      if (boss.health <= boss.maxHealth * 0.25 && boss.damageCondition == 2) {
        explosions.display(boss.body.x, boss.body.y - 30);
        boss.loadTexture('boss3');
        enemyDie.play();
        boss.weapons[4].enabled = false;
        boss.weapons[5].enabled = false;
        boss.weapons[6].enabled = false;
        boss.weapons[7].enabled = true;
        boss.weapons[8].enabled = true;
        boss.damageCondition = 3;
        boss.heal(boss.maxHealth * 0.10);
      }

      game.physics.arcade.overlap(boss, weapons[currentWeapon].weapon.bullets, this.damageEnemy, null, this);
      game.physics.arcade.overlap(player, boss.allBullets, this.hitPlayer, null, this);
      game.physics.arcade.overlap(player, boss, this.hitPlayer, null, this);
      for (var i = 0; i < boss.weapons.length; i++) {
        boss.weapons[i].shoot(boss);
      }
    }
    else if (!boss.alive && bossIsLaunched) {
      isWon = true;
      game.time.events.add(1000, this.resetGame, this);
    }
  }
};  //MainState prototype end

var currentAngle;
function keyboardHandler() {
  if (!player.alive) {
    return;
  }
  player.body.velocity.set(0, 0);
  player.loadTexture('player');
  //Move the plane left
  if (cursors.left.isDown) {
    game.physics.arcade.velocityFromAngle(-180, 300, player.body.velocity);
    currentAngle = -180;
    player.loadTexture('playerLeft');
  }
  //Move the plane right
  if (cursors.right.isDown) {
    game.physics.arcade.velocityFromAngle(0, 300, player.body.velocity);
    currentAngle = 0;
    player.loadTexture('playerRight');
  }
  //Up
  if (cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-90, 300, player.body.velocity);
    currentAngle = -90;
  }
  //Down
  if (cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(90, 300, player.body.velocity);
    currentAngle = 90;
  }

  //Up-left
  if (cursors.left.isDown && cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-135, 300, player.body.velocity);
    currentAngle = -135;
  }

  //Up-right
  if (cursors.right.isDown && cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-45, 300, player.body.velocity);
    currentAngle = -45;
  }

  //Down-left
  if (cursors.left.isDown && cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(135, 300, player.body.velocity);
    currentAngle = 135;
  }

  //Down-right
  if (cursors.right.isDown && cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(45, 300, player.body.velocity);
    currentAngle = 45;
  }

  //Check if 'shift' is being pressed
  if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && !player.body.velocity.isZero()) {
    //Slow down the move speed for each direction
    game.physics.arcade.velocityFromAngle(currentAngle, 200, player.body.velocity);
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    weapons[currentWeapon].shoot();
    playerShoot.play();
  }
}
