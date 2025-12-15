import Phaser from 'phaser';
import { ENEMY_CONFIG, GAME_CONFIG } from '../config/gameConfig.js';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyTexture');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    spawn(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.velocity.y = ENEMY_CONFIG.speed;
    }

    preUpdate(time, delta) {
        if (this.y > GAME_CONFIG.height + 50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
