import enemyFace from "./profilephoto.png"

// Game area dimensions
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

// Player configuration
export const PLAYER_WIDTH = 50;
export const PLAYER_HEIGHT = 25;
export const PLAYER_START_Y = GAME_HEIGHT - PLAYER_HEIGHT - 30;
export const PLAYER_SPEED = 8;
export const PLAYER_LIVES = 3;

// Projectile configuration
export const PROJECTILE_WIDTH = 5;
export const PROJECTILE_HEIGHT = 20;
export const PLAYER_PROJECTILE_SPEED = 12;
export const ENEMY_PROJECTILE_SPEED = 6;

// Enemy configuration
export const ENEMY_WIDTH = 40;
export const ENEMY_HEIGHT = 40;
export const ENEMY_GRID_ROWS = 4;
export const ENEMY_GRID_COLS = 10;
export const ENEMY_GRID_GAP = 20;
export const ENEMY_SPEED = 1;
export const ENEMY_VERTICAL_STEP = 20;
export const ENEMY_SHOOT_PROBABILITY = 0.001; // Probability per enemy per frame

export const ENEMY_FACE_URL = enemyFace;