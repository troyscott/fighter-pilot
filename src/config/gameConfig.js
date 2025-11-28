// Game configuration constants
export const GAME_CONFIG = {
  width: 480,
  height: 640,
  backgroundColor: '#1a1a2e'
};

export const PLAYER_CONFIG = {
  speed: 300,
  fireRate: 250,  // ms between shots
  startY: 580     // near bottom of screen
};

export const BULLET_CONFIG = {
  speed: 500,
  width: 4,
  height: 12
};

export const ENEMY_CONFIG = {
  speed: 150,
  spawnRate: 1000,  // ms between spawns
  width: 32,
  height: 32
};