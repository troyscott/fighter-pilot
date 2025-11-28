import { GAME_CONFIG } from '../config/gameConfig.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // Title
    this.add.text(GAME_CONFIG.width / 2, 200, 'FIGHTER PILOT', {
      fontSize: '48px',
      fill: '#00ff88'
    }).setOrigin(0.5);

    // Instructions
    this.add.text(GAME_CONFIG.width / 2, 350, 'Arrow keys to move\nSpace to shoot', {
      fontSize: '20px',
      fill: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    // Start prompt
    this.add.text(GAME_CONFIG.width / 2, 500, 'Press SPACE to Start', {
      fontSize: '24px',
      fill: '#ffff00'
    }).setOrigin(0.5);

    // Listen for spacebar
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}