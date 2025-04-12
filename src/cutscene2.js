import Phaser from 'phaser';

class CutScene2 extends Phaser.Scene {
  constructor() {
    super("CutScene2");
  }

  preload() {
    this.load.image(
      "cs_bg2","./assets/background/PNG/Cutscene/CutScene2.png"
    );
  }

  create() {
    const sad_music = this.registry.get('sad_music');
    this.cameras.main.fadeIn(1000,0,0,0);
    const nextButton = this.add.image(0, 0, "cs_bg2").setOrigin(0, 0);
    nextButton.setInteractive();
    nextButton.on('pointerdown', () =>{
        this.cameras.main.fadeOut(1000,0,0,0);
            this.time.delayedCall(1000,()=>{
                sad_music.stop();
                this.scene.start('GameScene');
            })
    })
  }

  update() {}

  
}

export default CutScene2;
