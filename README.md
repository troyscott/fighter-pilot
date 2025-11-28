# Fighter Pilot

A 2D vertical shooter game built with Phaser 3.

## Screenshots

*Coming soon*

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository
```bash
   git clone https://github.com/yourusername/fighter-pilot.git
   cd fighter-pilot
```

2. Install dependencies
```bash
   npm install
```

3. Start the development server
```bash
   npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

## How to Play

- **Arrow Keys** - Move left/right
- **Spacebar** - Shoot

Destroy enemies to score points. Avoid getting hit!

## Project Structure
```
fighter-pilot/
├── src/
│   ├── main.js              # Game initialization
│   ├── config/
│   │   └── gameConfig.js    # Game constants
│   ├── entities/
│   │   ├── Player.js        # Player ship
│   │   └── EnemyManager.js  # Enemy spawning
│   ├── scenes/
│   │   ├── MenuScene.js     # Start screen
│   │   └── GameScene.js     # Main gameplay
│   └── assets/
│       ├── images/
│       └── audio/
├── index.html
├── package.json
└── vite.config.js
```

## Tech Stack

- [Phaser 3](https://phaser.io/) - Game framework
- [Vite](https://vitejs.dev/) - Build tool

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.