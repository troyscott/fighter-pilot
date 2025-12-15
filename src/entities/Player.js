import { PLAYER_CONFIG, GAME_CONFIG } from '../config/gameConfig.js';
import { Bullet } from './Bullet.js';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.lastFired = 0;

    // Create player ship using Sprite
    this.sprite = scene.physics.add.sprite(
      GAME_CONFIG.width / 2,
      PLAYER_CONFIG.startY,
      'playerTexture'
    );
    this.sprite.setCollideWorldBounds(true);

    // Bullet group using Object Pooling
    this.bullets = scene.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true
    });
  }

  update(cursors, time) {
    if (cursors.left.isDown) {
      this.sprite.body.setVelocityX(-PLAYER_CONFIG.speed);
    } else if (cursors.right.isDown) {
      this.sprite.body.setVelocityX(PLAYER_CONFIG.speed);
    } else {
      this.sprite.body.setVelocityX(0);
    }

    if (cursors.space.isDown && time > this.lastFired) {
      this.fire(time);
    }
  }

  fire(time) {
    const bullet = this.bullets.get(this.sprite.x, this.sprite.y - 20);

    if (bullet) {
      bullet.fire(this.sprite.x, this.sprite.y - 20);
      this.lastFired = time + PLAYER_CONFIG.fireRate;
    }
  }

  cleanupBullets() {
    // Handled by Bullet.preUpdate()
  }

  getBullets() {
    return this.bullets;
  }

  getSprite() {
    return this.sprite;
  }
}