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

export const ENEMY_FACE_URL = 'https://media.licdn.com/dms/image/v2/C4E03AQEy3wmo1yOmHQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1524815911253?e=1762387200&v=beta&t=aBh5BMXbuFSIZdB7EtTIvD3D49nrNvAO1rjr2sUqoPU';
export const ENEMY_FACE_L1_URL= 'https://media.licdn.com/dms/image/v2/C5603AQEOC5XwdYjJxg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1581381196647?e=1762992000&v=beta&t=viz0Sv8sOin4epFZms9ptoR2G7nhCMeOmV4ilc2utYg'
export const ENEMY_FACE_L2_URL= 'https://media.licdn.com/dms/image/v2/C4E03AQH5RmRAD93sqA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1639139637345?e=1762992000&v=beta&t=QIWYT5bQUDdu5XcsCP0G7HM05VIgoVkEUBh5HhgG76M'
export const ENEMY_FACE_L3_URL= 'https://media.licdn.com/dms/image/v2/C4D03AQGiLc2qcuwDbw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1596224070462?e=1762992000&v=beta&t=kmMDAfBNQWQ4j9GS_sTY5JFTVAdwj4RhJbY8Rli9fIw'
export const ENEMY_FACE_L4_URL= 'https://media.licdn.com/dms/image/v2/C4D03AQFH5QsfTqavww/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1614365194895?e=1762992000&v=beta&t=5riyfkYqTTFhj0mz3Zc-KhDgnu6_oyo73CQWtnfZqT8'
export const ENEMY_FACE_L5_URL= 'https://media.licdn.com/dms/image/v2/C4E03AQFEHpAxgrjr1A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1536003102416?e=1762992000&v=beta&t=klM9vgFX57G_Y9R5KXbp8EJyy3Y1FMMpREcx9xNF0Ek'
export const ENEMY_FACE_L6_URL= 'https://media.licdn.com/dms/image/v2/D4E03AQEaQFvRbp81sg/profile-displayphoto-shrink_800_800/B4EZY4M7VxHMAg-/0/1744699642649?e=1762992000&v=beta&t=tN3ln1Ha9g-9GeO1jFgSy8bETJ-95djehYL5Tc8q_-M'
export const ENEMY_FACE_L7_URL= 'https://media.licdn.com/dms/image/v2/C4D03AQEQPqRDWlRJeQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517269787572?e=1762992000&v=beta&t=X2Lry32XKACTUNqMU-ZXFD4WDZaLOG-B1psNg6nuROs'
export const ENEMY_FACE_L8_URL= 'https://media.licdn.com/dms/image/v2/C4D03AQGlSrFI1Ma-fw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1590963237716?e=1762992000&v=beta&t=2nNFp9acHWufKv99yyXLtI2AbrWtRXpu8KHXMktIgh0'
export const ENEMY_FACE_L9_URL= 'https://media.licdn.com/dms/image/v2/D4E03AQETlBjB95W2sg/profile-displayphoto-crop_800_800/B4EZn88JK4GoAM-/0/1760885253851?e=1762992000&v=beta&t=g6J-K9nU-29nKctjjyhfMCqjQs6-v0H-JCA3XSYGyuU'
export const ENEMY_FACE_L10_URL= 'https://media.licdn.com/dms/image/v2/D4E03AQHvZO311JrdzQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1688976095149?e=1762992000&v=beta&t=BeaHoYFi0-gzFBGrsZQq4c6l6Ld7FHWrrB_YF01uLLU'

export const ENEMY_LEVELS = [
    ENEMY_FACE_URL,
    ENEMY_FACE_L1_URL,
    ENEMY_FACE_L2_URL,
    ENEMY_FACE_L3_URL,
    ENEMY_FACE_L4_URL,
    ENEMY_FACE_L5_URL,
    ENEMY_FACE_L6_URL,
    ENEMY_FACE_L7_URL,
    ENEMY_FACE_L8_URL,
    ENEMY_FACE_L9_URL,
    ENEMY_FACE_L10_URL,
];
