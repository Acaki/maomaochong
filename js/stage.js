var i;
function stageStart() {

  game.time.events.add(2 * Phaser.Timer.SECOND, wave1, this);
  game.time.events.add(18 * Phaser.Timer.SECOND, wave2, this);
  game.time.events.add(38 * Phaser.Timer.SECOND, wave3, this);
  game.time.events.add(57 * Phaser.Timer.SECOND, wave4, this);
  game.time.events.add(78 * Phaser.Timer.SECOND, wave5, this);
  game.time.events.add(98 * Phaser.Timer.SECOND, wave6, this);
  game.time.events.add(123 * Phaser.Timer.SECOND, wave7, this);
  game.time.events.add(145 * Phaser.Timer.SECOND, wave8, this);
  game.time.events.add(167 * Phaser.Timer.SECOND, wave9, this);
  game.time.events.add(196 * Phaser.Timer.SECOND, wave10, this);
  game.time.events.add(232 * Phaser.Timer.SECOND, launchBoss, this);
  game.time.events.add(game.rnd.integerInRange(15000, 20000), powerUp.drop, powerUp);
}

//Intermidiate callback function for enemy.launch()
function launch(enemyGroup, x, y, angle, speed, xAccel, yAccel, angularV, angularA) {
  var enemy = enemyGroup.getFirstExists(false);
  if (enemy) {
    enemy.launch(x, y, angle, speed, xAccel, yAccel, angularV, angularA);
  }
}

//Intermidiate callback function for enemy.launchTween()
function launchTween(enemyGroup, x, y, properties, duration, ease) {
  var enemy = enemyGroup.getFirstExists(false);
  if (enemy) {
    enemy.launchTween(x, y, properties, duration, ease);
  }
}

//14 seconds
function wave1() {
  for (i = 0; i < 10 * Phaser.Timer.SECOND; i += 2 * Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.trash, 200, 0, 90, 400, 0, -200, 100, -30);
    game.time.events.add(i, launch, this, enemyGroups.trash, 400, 0, 90, 400, 0, -200, 100, -30);
  }
  for (var j = i; j < i + 5 * Phaser.Timer.SECOND; j += Phaser.Timer.SECOND) {
    game.time.events.add(j, launch, this, enemyGroups.trash, game.world.width, 200, -180, 400, 150, 0, -100, 30);
    game.time.events.add(j, launch, this, enemyGroups.trash, 0, 400, 0, 400, -150, 0, 100, -30);
  }
}

//18 seconds
function wave2() {
  for (i = 0; i < 10 * Phaser.Timer.SECOND; i += Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.trash, game.world.width, 100, -180, 400, 150, 0, -100, 30);
    game.time.events.add(i, launch, this, enemyGroups.trash, 0, 300, 0, 400, -150, 0, 100, -30);
  }
  game.time.events.add(i, launch, this, enemyGroups.medium, 200, 0, 90, 50, 0, 0);
  game.time.events.add(i, launch, this, enemyGroups.medium, 400, 0, 90, 50, 0, 0);
  var halfHeight = enemyGroups.trash.getChildAt(0).height / 2 + 1;
  for (var j = i; j < i + 10 * Phaser.Timer.SECOND; j += Phaser.Timer.SECOND) {
    game.time.events.add(j, launchTween, this, enemyGroups.trash, 100, 0, { x: [500, 100, 500, 100], y: [200, 400, 600, 800 + halfHeight] }, 5000);
    game.time.events.add(j, launchTween, this, enemyGroups.trash, 500, 0, { x: [100, 500, 100, 500], y: [200, 400, 600, 800 + halfHeight] }, 5000);
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

//17 seconds
function wave3() {
  for (i = 0; i < 10 * Phaser.Timer.SECOND; i += Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.trash, 0, 100, 45, 400, -200, 0, 100, -30);
    game.time.events.add(i, launch, this, enemyGroups.trash, game.world.width, 100, 135, 400, 200, 0, -100, 30);
  }
  for (var j = 0; j < 3; j++) {
    game.time.events.add(i, launchTween, this, enemyGroups.medium, j * 200 + 100, 0, { y: 200 }, 1000);
  }
  i += 7 * Phaser.Timer.SECOND;
  game.time.events.add(i, launchTween, this, enemyGroups.medium, 200, 0, { y: 300 }, 1000);
  game.time.events.add(i, launchTween, this, enemyGroups.medium, 400, 0, { y: 300 }, 1000);
}

//20 seconds
function wave4() {
  for (i = 0; i < 20 * Phaser.Timer.SECOND; i += Phaser.Timer.HALF) {
    game.time.events.add(game.rnd.integerInRange(i, i + 250), launch, this, enemyGroups.meteorSmall, null, null, 90, 400, 0, 0, game.rnd.integerInRange(100, 200));
    if (i % Phaser.Timer.SECOND == 0) {
      game.time.events.add(game.rnd.integerInRange(i, i + 250), launch, this, enemyGroups.meteorBig, null, null, 90, 200, 0, 0, game.rnd.integerInRange(30, 50));
    }
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

//18 seconds
function wave5() {
  var halfWidth = enemyGroups.green.getChildAt(0).width / 2 + 1;
  for (i = 0; i < 3 * Phaser.Timer.SECOND; i += Phaser.Timer.SECOND) {
    game.time.events.add(2 * i, launchTween, this, enemyGroups.green, 0, 300 - i / 10, { x: [150, 150, 150, -halfWidth] }, 6000);
    game.time.events.add(2 * i, launchTween, this, enemyGroups.green, game.world.width, 200 + i / 10, { x: [game.world.width - 150, game.world.width - 150, game.world.width - 150, game.world.width + halfWidth] }, 6000);
  }
  i *= 3;
  var halfHeight = enemyGroups.medium.getChildAt(0).height / 2 + 1;
  for (var j = i; j < i + 8 * Phaser.Timer.SECOND; j += 2 * Phaser.Timer.SECOND) {
    game.time.events.add(j, launchTween, this, enemyGroups.medium, 100, 0, { x: [400, 200, 400, 200], y: [200, 400, 600, 800 + halfHeight] }, 8000);
    game.time.events.add(j, launchTween, this, enemyGroups.medium, 500, 0, { x: [200, 400, 200, 400], y: [200, 400, 600, 800 + halfHeight] }, 8000);
  }
}

//20 seconds
function wave6() {
  background.loadTexture('darkBackground');
  for (i = 0; i < 10 * Phaser.Timer.SECOND; i += Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.trash, 0, 250, -45, 300, 0, 200, 100, -30);
    game.time.events.add(i, launch, this, enemyGroups.trash, game.world.width, 250, -135, 300, 0, 200, -100, 30);
  }
  for (var j = i; j < i + 12 * Phaser.Timer.SECOND; j += Phaser.Timer.QUARTER) {
    game.time.events.add(j, launchTween, this, enemyGroups.spaceBuilding, 0, 0, { x: game.world.width / 2, y: game.world.height + player.height / 2, angle: 359 }, 1000);
    game.time.events.add(j, launchTween, this, enemyGroups.spaceBuilding, game.world.width, 0, { x: game.world.width / 2, y: game.world.height + player.height / 2, angle: 359 }, 1000);
  }
  game.time.events.add(i + 5 * Phaser.Timer.SECOND, launchTween, this, enemyGroups.green, 150, 0, { y: 250 }, 1000);
  game.time.events.add(i + 5 * Phaser.Timer.SECOND, launchTween, this, enemyGroups.green, 300, 0, { y: 150 }, 1000);
  game.time.events.add(i + 5 * Phaser.Timer.SECOND, launchTween, this, enemyGroups.green, game.world.width - 150, 0, { y: 250 }, 1000);

  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

//30+ seconds
function wave7() {
  game.time.events.add(0, launchTween, this, enemyGroups.spaceStation, game.world.width / 2, 0, { y: 150 }, 3000);
  game.time.events.add(10 * Phaser.Timer.SECOND, launchTween, this, enemyGroups.black, 150, 0, { y: 150 }, 1000);
  game.time.events.add(10 * Phaser.Timer.SECOND, launchTween, this, enemyGroups.black, game.world.width - 150, 0, { y: 150 }, 1000);
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

//20 seconds
function wave8() {
  game.time.events.add(0, launch, this, enemyGroups.red, 0, 100, 0, 25);
  game.time.events.add(0, launch, this, enemyGroups.red, game.world.width, 200, 180, 25);
  game.time.events.add(0, launch, this, enemyGroups.red, 0, 300, 0, 25);
  game.time.events.add(0, launch, this, enemyGroups.red, game.world.width, 400, 180, 25);
  game.time.events.add(10 * Phaser.Timer.SECOND, launchTween, this, enemyGroups.medium, 200, 0, { y: 300 }, 1000);
  game.time.events.add(10 * Phaser.Timer.SECOND, launchTween, this, enemyGroups.medium, 400, 0, { y: 300 }, 1000);
  for (i = 10 * Phaser.Timer.SECOND; i < 20 * Phaser.Timer.SECOND; i += Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.trash, 0, 250, -45, 300, 0, 200, 100, -30);
    game.time.events.add(i, launch, this, enemyGroups.trash, game.world.width, 250, -135, 300, 0, 200, -100, 30);
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

//20 seconds
function wave9() {
  for (var i = 0; i < 10 * Phaser.Timer.SECOND; i += Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.green, 0, 50 + i / 50, 0, 100, 200);
    game.time.events.add(i, launch, this, enemyGroups.green, game.world.width, 50 + i / 50, 180, 100, -200);
  }
  for (var j = i; j < i + 10 * Phaser.Timer.SECOND; j += 5 * Phaser.Timer.SECOND) {
    game.time.events.add(j, launch, this, enemyGroups.black, 150, 0, 90, 20);
    game.time.events.add(j, launch, this, enemyGroups.black, game.world.width - 150, 0, 90, 20);
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

function wave10() {
  game.time.events.add(0, launchTween, this, enemyGroups.spaceStation, 150, 0, { y: 150 }, 3000);
  game.time.events.add(0, launchTween, this, enemyGroups.spaceStation, 450, 0, { y: 150 }, 3000);
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

function launchBoss() {
  fightMusic.stop();
  fightMusic = game.add.audio('bossBGM');
  fightMusic.loop = true;
  fightMusic.volume = 0.5;
  fightMusic.play();
  bossIsLaunched = true;
  var bossTween;
  background.loadTexture('blackBackground');
  game.time.events.add(
    3000,
    function() {
      boss.reset(game.world.width / 2, -boss.height / 2, boss.maxHealth);
      bossTween = game.add.tween(boss).to({ y: 150 }, 3000, Phaser.Easing.Sinusoidal.Out, true);
      bossTween.chain(game.add.tween(boss).to({ x: [200, game.world.width / 2, 400, game.world.width / 2] }, 14000, null, false, 0, -1));
    }
  );
}
