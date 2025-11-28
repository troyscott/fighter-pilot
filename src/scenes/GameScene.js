import { Player } from '../entities/Player.js';
import { EnemyManager } from '../entities/EnemyManager.js';
import { GAME_CONFIG } from '../config/gameConfig.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
  }

  create() {
    // Create player
    this.player = new Player(this);
    
    // Create enemy manager
    this.enemyManager = new EnemyManager(this);
    
    // Setup keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Collision: bullets hit enemies
    this.physics.add.overlap(
      this.player.getBullets(),
      this.enemyManager.getEnemies(),
      this.bulletHitEnemy,
      null,
      this
    );
    
    // Collision: enemies hit player
    this.physics.add.overlap(
      this.player.getSprite(),
      this.enemyManager.getEnemies(),
      this.enemyHitPlayer,
      null,
      this
    );
    
    // Score display
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '20px',
      fill: '#ffffff'
    });
    
    // Instructions
    this.add.text(10, GAME_CONFIG.height - 30, 'Arrow keys to move, Space to shoot', {
      fontSize: '14px',
      fill: '#888888'
    });
  }

  update(time) {
    this.player.update(this.cursors, time);
    this.player.cleanupBullets();
    this.enemyManager.update(time);
  }

  bulletHitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }

  enemyHitPlayer(player, enemy) {
    // For MVP: just restart the scene
    this.scene.start('GameOverScene', { score: this.score });
    this.score = 0;
  }
}