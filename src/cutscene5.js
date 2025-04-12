import Phaser from 'phaser';

class CutScene5 extends Phaser.Scene {
  constructor() {
    super("CutScene5");
  }

  preload() {
    this.load.image(
      "cs_bg5","./assets/background/PNG/Cutscene/CutScene5.png"
    );
  }

  create() {
    const sad_music = this.registry.get('sad_music');
    this.cameras.main.fadeIn(600,0,0,0);
    const nextButton = this.add.image(0, 0, "cs_bg5").setOrigin(0, 0);
    nextButton.setInteractive();
    nextButton.on('pointerdown', () =>{
        this.cameras.main.fadeOut(600,0,0,0);
            this.time.delayedCall(600,()=>{
                sad_music.stop();
                this.scene.start('GameScene');
            })
    })
  }

  update() {}

  
}

export default CutScene5;
