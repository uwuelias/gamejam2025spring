import "./style.css";
import Phaser, { Scene } from "phaser";
import MenuScene from "./menu";
import GameScene from "./gamescene1";

const sizes = {
  width: 1200,
  height: 675,
};

const speedDown = 300;

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
  scene: [MenuScene, GameScene],
};

const game = new Phaser.Game(config);
