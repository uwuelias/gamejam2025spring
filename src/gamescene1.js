import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.player;
  }

  preload() {
    this.load.image(
      "bg","./assets/background/PNG/battle1.png"
    );
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
  }

  update() {}

  
}

export default GameScene;
