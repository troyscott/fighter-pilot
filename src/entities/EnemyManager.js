import { ENEMY_CONFIG, GAME_CONFIG } from '../config/gameConfig.js';

export class EnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.enemies = scene.physics.add.group();
    this.lastSpawn = 0;
  }

  update(time) {
    // Spawn enemies at intervals
    if (time > this.lastSpawn) {
      this.spawnEnemy();
      this.lastSpawn = time + ENEMY_CONFIG.spawnRate;
    }

    // Remove enemies that go off screen
    this.enemies.getChildren().forEach(enemy => {
      if (enemy.y > GAME_CONFIG.height + 50) {
        enemy.destroy();
      }
    });
  }

  spawnEnemy() {
    // Random x position
    const x = Phaser.Math.Between(30, GAME_CONFIG.width - 30);
    
    // Create simple enemy (red square for MVP)
    const enemy = this.scene.add.rectangle(
      x,
      -20,  // spawn above screen
      ENEMY_CONFIG.width,
      ENEMY_CONFIG.height,
      0xff4444  // red color
    );
    
    this.scene.physics.add.existing(enemy);
    //enemy.body.setVelocityY(ENEMY_CONFIG.speed);
    this.enemies.add(enemy);
    enemy.body.velocity.y = ENEMY_CONFIG.speed;


  }

  getEnemies() {
    return this.enemies;
  }
}