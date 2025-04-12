import "./style.css";
import Phaser, { Scene } from "phaser";
import MenuScene from "./menu";
import GameScene from "./gamescene1";
import SettingsScene from "./settings";
import CutScene1 from "./cutscene1";
import CutScene2 from "./cutscene2";

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
  scene: [MenuScene, SettingsScene, CutScene1, CutScene2, GameScene],
};

const game = new Phaser.Game(config);
