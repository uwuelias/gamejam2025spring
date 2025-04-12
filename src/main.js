import "./style.css";
import Phaser, { Scene } from "phaser";

const sizes = {
  width: 1100,
  height: 600,
};

const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.player;
  }

  preload() {
    this.load.image(
      "bg",
      "./assets/background/PNG/Battleground1/Bright/Battleground1.png"
    );
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
  }

  update() {}
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: true,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
