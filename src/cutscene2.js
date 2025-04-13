
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
    this.cameras.main.fadeIn(600,0,0,0);
    const nextButton = this.add.image(0, 0, "cs_bg2").setOrigin(0, 0);
    nextButton.setInteractive();
    nextButton.on('pointerdown', () =>{
        this.cameras.main.fadeOut(600,0,0,0);
            this.time.delayedCall(600,()=>{
                this.scene.start('CutScene3');
            })
    })
  }

  update() {}

  
}

export default CutScene2;
