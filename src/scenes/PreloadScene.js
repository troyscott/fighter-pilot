import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/gameConfig.js';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.createLoadingBar();

        // Use programmatic graphics instead of loading files
        this.load.on('complete', () => {
            this.generateTextures();
            this.scene.start('MenuScene');
        });

        // Fake loading to show the bar briefly
        // In a real app with programmatic assets, we might generate them ASYNC during preload
        // or just generate them instantly.
        // For effect, let's keep a small dummy load or just rely on 'create' to call generate.
        // Actually, 'preload' is for external files. 
        // We can just create textures in 'create' or right here if not async.
        // Let's just simulate a small load so the bar shows up.
        this.load.image('dummy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');
    }

    create() {
        // moved start to complete event or here
        // But since we are generating textures, we should do it before starting menu
    }

    generateTextures() {
        // 1. Player Ship
        // Design: Futuristic Jet with sweeping wings
        const playerGraphics = this.make.graphics({ x: 0, y: 0 });

        // Wings (Darker Blue)
        playerGraphics.fillStyle(0x0077be, 1);
        playerGraphics.beginPath();
        playerGraphics.moveTo(16, 8);
        playerGraphics.lineTo(32, 28);
        playerGraphics.lineTo(16, 24);
        playerGraphics.lineTo(0, 28);
        playerGraphics.closePath();
        playerGraphics.fillPath();

        // Fuselage (Lighter Blue)
        playerGraphics.fillStyle(0x00aaff, 1);
        playerGraphics.beginPath();
        playerGraphics.moveTo(16, 0);  // Nose
        playerGraphics.lineTo(22, 28); // Bottom Right
        playerGraphics.lineTo(16, 26); // Center notch
        playerGraphics.lineTo(10, 28); // Bottom Left
        playerGraphics.closePath();
        playerGraphics.fillPath();

        // Cockpit (Ice Blue)
        playerGraphics.fillStyle(0xaaddff, 1);
        playerGraphics.fillEllipse(16, 12, 3, 6);

        // Save to texture
        playerGraphics.generateTexture('playerTexture', 32, 32);


        // 2. Enemy Ship
        // Design: Aggressive Spade/Dart shape
        const enemyGraphics = this.make.graphics({ x: 0, y: 0 });

        // Main Body (Crimson)
        enemyGraphics.fillStyle(0xc70039, 1);
        enemyGraphics.beginPath();
        enemyGraphics.moveTo(16, 32);  // Bottom point
        enemyGraphics.lineTo(32, 0);   // Top Right
        enemyGraphics.lineTo(16, 8);   // Center curve
        enemyGraphics.lineTo(0, 0);    // Top Left
        enemyGraphics.closePath();
        enemyGraphics.fillPath();

        // Engine/Core (Orange)
        enemyGraphics.fillStyle(0xff5733, 1);
        enemyGraphics.beginPath();
        enemyGraphics.moveTo(16, 12);
        enemyGraphics.lineTo(20, 4);
        enemyGraphics.lineTo(12, 4);
        enemyGraphics.closePath();
        enemyGraphics.fillPath();

        enemyGraphics.generateTexture('enemyTexture', 32, 32);


        // 3. Bullet (Glow Effect)
        const bulletGraphics = this.make.graphics({ x: 0, y: 0 });

        // Outer Glow (faded yellow)
        bulletGraphics.fillStyle(0xffffaa, 0.4);
        bulletGraphics.fillRect(0, 0, 8, 20);

        // Inner Core (Bright White-Yellow)
        bulletGraphics.fillStyle(0xffffff, 1);
        bulletGraphics.fillRect(2, 2, 4, 16);

        bulletGraphics.generateTexture('bulletTexture', 8, 20);
    }

    createLoadingBar() {
        const width = GAME_CONFIG.width;
        const height = GAME_CONFIG.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
    }
}
