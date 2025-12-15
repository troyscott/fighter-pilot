import Phaser from 'phaser';
import { BULLET_CONFIG } from '../config/gameConfig.js';

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bulletTexture');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.velocity.y = -BULLET_CONFIG.speed;
    }

    preUpdate(time, delta) {
        // Phaser 3.60+ sometimes needs this call if checking bounds automatically, 
        // but for simple rects we might just check y
        if (this.y < -50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
