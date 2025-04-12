import "./style.css";
import Phaser, { Scene } from "phaser";
import MenuScene from "./menu";
import GameScene from "./gamescene1";
import SettingsScene from "./settings";

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
      debug: false,
    },
  },
  scene: [MenuScene, SettingsScene, GameScene],
};

const game = new Phaser.Game(config);
