import { GAME_CONFIG } from '../config/gameConfig.js';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    // Receive score from GameScene
    this.finalScore = data.score || 0;
  }

  create() {
    // Game Over title
    this.add.text(GAME_CONFIG.width / 2, 200, 'GAME OVER', {
      fontSize: '48px',
      fill: '#ff4444'
    }).setOrigin(0.5);

    // Final score
    this.add.text(GAME_CONFIG.width / 2, 300, `Score: ${this.finalScore}`, {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Restart prompt
    this.add.text(GAME_CONFIG.width / 2, 450, 'Press SPACE to Play Again', {
      fontSize: '24px',
      fill: '#ffff00'
    }).setOrigin(0.5);

    // Menu prompt
    this.add.text(GAME_CONFIG.width / 2, 500, 'Press ESC for Menu', {
      fontSize: '18px',
      fill: '#888888'
    }).setOrigin(0.5);

    // Listen for keys
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });

    this.input.keyboard.once('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });
  }
}