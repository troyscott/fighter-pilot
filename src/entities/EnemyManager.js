import { ENEMY_CONFIG, GAME_CONFIG } from '../config/gameConfig.js';
import { Enemy } from './Enemy.js';

export class EnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.enemies = scene.physics.add.group({
      classType: Enemy,
      maxSize: 50,
      runChildUpdate: true
    });
    this.lastSpawn = 0;
  }

  update(time) {
    // Spawn enemies at intervals
    if (time > this.lastSpawn) {
      this.spawnEnemy();
      this.lastSpawn = time + ENEMY_CONFIG.spawnRate;
    }
  }

  spawnEnemy() {
    // Random x position
    const x = Phaser.Math.Between(30, GAME_CONFIG.width - 30);

    // Get enemy from pool
    const enemy = this.enemies.get(x, -20);

    if (enemy) {
      enemy.spawn(x, -20);
    }
  }

  getEnemies() {
    return this.enemies;
  }
}