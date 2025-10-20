
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_START_Y, PLAYER_SPEED,
  PROJECTILE_WIDTH, PROJECTILE_HEIGHT, PLAYER_PROJECTILE_SPEED, ENEMY_PROJECTILE_SPEED,
  ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_GRID_ROWS, ENEMY_GRID_COLS, ENEMY_GRID_GAP,
  ENEMY_SPEED, ENEMY_VERTICAL_STEP, ENEMY_SHOOT_PROBABILITY, PLAYER_LIVES, ENEMY_FACE_URL,
} from './constants';
import { GameStatus } from './types';
import type { Position, GameObject } from './types';

// --- Helper Functions ---
const checkCollision = (objA: GameObject, objB: GameObject): boolean => {
  return (
    objA.x < objB.x + objB.width &&
    objA.x + objA.width > objB.x &&
    objA.y < objB.y + objB.height &&
    objA.y + objA.height > objB.y
  );
};

// --- Presentational Components ---

const Player: React.FC<{ position: Position }> = React.memo(({ position }) => (
  <div style={{ left: position.x, top: position.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }} className="absolute">
    <svg viewBox="0 0 20 20" fill="currentColor" className="text-cyan-400 w-full h-full">
      <path d="M10 2.5l7.5 15h-15z" />
    </svg>
  </div>
));

const Enemy: React.FC<{ position: Position }> = React.memo(({ position }) => (
  <img
    src={ENEMY_FACE_URL}
    alt="Enemy Invader"
    style={{ left: position.x, top: position.y, width: ENEMY_WIDTH, height: ENEMY_HEIGHT }}
    className="absolute rounded-md"
  />
));

const Projectile: React.FC<{ position: Position; color: string }> = React.memo(({ position, color }) => (
  <div
    style={{ left: position.x, top: position.y, width: PROJECTILE_WIDTH, height: PROJECTILE_HEIGHT }}
    className={`absolute ${color} rounded-full`}
  ></div>
));

const Hud: React.FC<{ score: number; lives: number }> = React.memo(({ score, lives }) => (
  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white font-mono z-10">
    <div>SCORE: {score.toString().padStart(5, '0')}</div>
    <div className="flex items-center">
      <span>LIVES:</span>
      <div className="flex ml-2">
        {Array.from({ length: lives }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="text-cyan-400 w-6 h-6 -ml-2">
            <path d="M10 2.5l7.5 15h-15z" />
          </svg>
        ))}
      </div>
    </div>
  </div>
));

const Overlay: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white font-mono z-20">
    {children}
  </div>
);

const StartScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <Overlay>
    <h1 className="text-6xl font-bold text-cyan-400 mb-4 animate-pulse">SPACE IAN-VADERS</h1>
    <p className="text-xl mb-8">Use Arrow Keys to Move, Spacebar to Shoot</p>
    <button
      onClick={onStart}
      className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold rounded-lg transition-transform transform hover:scale-105"
    >
      Start Game
    </button>
  </Overlay>
);

const GameOverScreen: React.FC<{ score: number; onRestart: () => void }> = ({ score, onRestart }) => (
  <Overlay>
    <h1 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h1>
    <p className="text-2xl mb-8">Final Score: {score}</p>
    <button
      onClick={onRestart}
      className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold rounded-lg transition-transform transform hover:scale-105"
    >
      Play Again
    </button>
  </Overlay>
);


// --- Main App Component ---

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Start);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(PLAYER_LIVES);

  const [playerPos, setPlayerPos] = useState<Position>({ x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: PLAYER_START_Y });
  const [playerProjectile, setPlayerProjectile] = useState<GameObject | null>(null);

  const [enemies, setEnemies] = useState<GameObject[]>([]);
  const [enemyProjectiles, setEnemyProjectiles] = useState<GameObject[]>([]);
  const [enemyDirection, setEnemyDirection] = useState<'right' | 'left'>('right');
  
  const keysPressed = useRef<Set<string>>(new Set());
  const gameLoopId = useRef<number | null>(null);

  const createEnemies = () => {
    const newEnemies: GameObject[] = [];
    const gridWidth = ENEMY_GRID_COLS * (ENEMY_WIDTH + ENEMY_GRID_GAP) - ENEMY_GRID_GAP;
    const startX = (GAME_WIDTH - gridWidth) / 2;
    for (let row = 0; row < ENEMY_GRID_ROWS; row++) {
      for (let col = 0; col < ENEMY_GRID_COLS; col++) {
        newEnemies.push({
          id: `enemy-${row}-${col}`,
          x: startX + col * (ENEMY_WIDTH + ENEMY_GRID_GAP),
          y: 50 + row * (ENEMY_HEIGHT + ENEMY_GRID_GAP),
          width: ENEMY_WIDTH,
          height: ENEMY_HEIGHT,
        });
      }
    }
    setEnemies(newEnemies);
  };

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(PLAYER_LIVES);
    setPlayerPos({ x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: PLAYER_START_Y });
    setPlayerProjectile(null);
    createEnemies();
    setEnemyProjectiles([]);
    setEnemyDirection('right');
    setGameStatus(GameStatus.Playing);
  }, []);

  const handleShoot = useCallback(() => {
    if (!playerProjectile) {
      setPlayerProjectile({
        id: `p-proj-${Date.now()}`,
        x: playerPos.x + PLAYER_WIDTH / 2 - PROJECTILE_WIDTH / 2,
        y: playerPos.y,
        width: PROJECTILE_WIDTH,
        height: PROJECTILE_HEIGHT,
      });
    }
  }, [playerPos, playerProjectile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
      if (e.key === ' ' && gameStatus === GameStatus.Playing) {
        e.preventDefault();
        handleShoot();
      }
      if(e.key === 'Enter' && (gameStatus === GameStatus.Start || gameStatus === GameStatus.GameOver)) {
        resetGame();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStatus, handleShoot, resetGame]);

  const gameLoop = useCallback(() => {
    if (gameStatus !== GameStatus.Playing) return;

    // Player Movement
    setPlayerPos(prev => {
      let newX = prev.x;
      if (keysPressed.current.has('ArrowLeft')) newX -= PLAYER_SPEED;
      if (keysPressed.current.has('ArrowRight')) newX += PLAYER_SPEED;
      return { ...prev, x: Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, newX)) };
    });

    // Player Projectile
    if (playerProjectile) {
      setPlayerProjectile(prev => {
        if (!prev) return null;
        const newY = prev.y - PLAYER_PROJECTILE_SPEED;
        return newY < 0 ? null : { ...prev, y: newY };
      });
    }

    // Enemy Projectiles
    setEnemyProjectiles(prev => 
      prev
        .map(p => ({ ...p, y: p.y + ENEMY_PROJECTILE_SPEED }))
        .filter(p => p.y < GAME_HEIGHT)
    );

    // Enemy Movement & Shooting
    setEnemies(prevEnemies => {
      let mustDropDown = false;
      let newDirection = enemyDirection;

      if (prevEnemies.length === 0) return prevEnemies;

      for (const enemy of prevEnemies) {
        if ((enemyDirection === 'right' && enemy.x + ENEMY_WIDTH >= GAME_WIDTH) || (enemyDirection === 'left' && enemy.x <= 0)) {
          mustDropDown = true;
          newDirection = enemyDirection === 'right' ? 'left' : 'right';
          break;
        }
      }

      if (mustDropDown) {
        setEnemyDirection(newDirection);
        return prevEnemies.map(e => ({ ...e, y: e.y + ENEMY_VERTICAL_STEP }));
      } else {
        const moveX = enemyDirection === 'right' ? ENEMY_SPEED : -ENEMY_SPEED;
        return prevEnemies.map(e => ({ ...e, x: e.x + moveX }));
      }
    });
    
    // Enemy shooting
    if (enemies.length > 0 && Math.random() < ENEMY_SHOOT_PROBABILITY * enemies.length) {
        const shootingEnemy = enemies[Math.floor(Math.random() * enemies.length)];
        setEnemyProjectiles(prev => [...prev, {
            id: `e-proj-${Date.now()}`,
            x: shootingEnemy.x + ENEMY_WIDTH / 2 - PROJECTILE_WIDTH / 2,
            y: shootingEnemy.y + ENEMY_HEIGHT,
            width: PROJECTILE_WIDTH,
            height: PROJECTILE_HEIGHT,
        }]);
    }
    
    // Collision Detection
    // Player projectile vs enemies
    if (playerProjectile) {
      const hitEnemyIndex = enemies.findIndex(enemy => checkCollision(playerProjectile, enemy));
      if (hitEnemyIndex > -1) {
        setEnemies(prev => prev.filter((_, index) => index !== hitEnemyIndex));
        setPlayerProjectile(null);
        setScore(s => s + 10);
      }
    }

    // Enemy projectiles vs player
    const playerGameObject = { ...playerPos, width: PLAYER_WIDTH, height: PLAYER_HEIGHT, id: 'player' };
    const hitProjectileIndex = enemyProjectiles.findIndex(proj => checkCollision(proj, playerGameObject));
    if (hitProjectileIndex > -1) {
        setEnemyProjectiles(prev => prev.filter((_, index) => index !== hitProjectileIndex));
        setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
                setGameStatus(GameStatus.GameOver);
            }
            return newLives;
        });
    }

    // Enemies reach player
    if (enemies.some(e => e.y + ENEMY_HEIGHT >= PLAYER_START_Y)) {
        setGameStatus(GameStatus.GameOver);
    }
    
    // Win condition
    if (enemies.length === 0 && gameStatus === GameStatus.Playing) {
        // For simplicity, we just start a new, faster wave.
        createEnemies();
        setScore(s => s + 100);
    }


    gameLoopId.current = requestAnimationFrame(gameLoop);
  }, [gameStatus, playerProjectile, enemies, enemyProjectiles, enemyDirection, playerPos]);


  useEffect(() => {
    if (gameStatus === GameStatus.Playing) {
      gameLoopId.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopId.current) {
        cancelAnimationFrame(gameLoopId.current);
      }
    };
  }, [gameStatus, gameLoop]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        className="relative bg-black overflow-hidden border-4 border-cyan-700 shadow-lg shadow-cyan-500/50"
      >
        {gameStatus === GameStatus.Start && <StartScreen onStart={resetGame} />}
        {gameStatus === GameStatus.GameOver && <GameOverScreen score={score} onRestart={resetGame} />}
        
        {gameStatus === GameStatus.Playing && (
          <>
            <Hud score={score} lives={lives} />
            <Player position={playerPos} />
            {enemies.map(enemy => <Enemy key={enemy.id} position={enemy} />)}
            {playerProjectile && <Projectile position={playerProjectile} color="bg-cyan-400" />}
            {enemyProjectiles.map(proj => <Projectile key={proj.id} position={proj} color="bg-red-500" />)}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
