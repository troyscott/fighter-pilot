import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { GAME_CONFIG } from './config/gameConfig.js';

const config = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  backgroundColor: GAME_CONFIG.backgroundColor,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false  // set to true to see hitboxes
    }
  },
  scene: [MenuScene, GameScene, GameOverScene] // menu scene first
};
// Create the Phaser game instance
const game = new Phaser.Game(config);