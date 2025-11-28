import { PLAYER_CONFIG, BULLET_CONFIG, GAME_CONFIG } from '../config/gameConfig.js';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.lastFired = 0;
    
    // Create player ship (simple triangle)
    this.sprite = scene.add.triangle(
      GAME_CONFIG.width / 2,
      PLAYER_CONFIG.startY,
      0, 20,
      15, 0,
      30, 20,
      0x00ff88
    );
    
    // Enable physics
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);
    
    // Bullet group
    this.bullets = scene.physics.add.group();
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
  const bullet = this.scene.add.rectangle(
    this.sprite.x,
    this.sprite.y - 20,
    BULLET_CONFIG.width,
    BULLET_CONFIG.height,
    0xffff00
  );
  
  this.scene.physics.add.existing(bullet);
  this.bullets.add(bullet);
  
  // Set velocity AFTER adding to group
  bullet.body.velocity.y = -500;
  
  this.lastFired = time + PLAYER_CONFIG.fireRate;
}


  cleanupBullets() {
    this.bullets.getChildren().forEach(bullet => {
      if (bullet.y < -10) {
        bullet.destroy();
      }
    });
  }

  getBullets() {
    return this.bullets;
  }

  getSprite() {
    return this.sprite;
  }
}