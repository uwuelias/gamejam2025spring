
class CutScene4 extends Phaser.Scene {
  constructor() {
    super("CutScene4");
  }

  preload() {
    this.load.image(
      "cs_bg4","./assets/background/PNG/Cutscene/CutScene4.png"
    );
  }

  create() {
    this.cameras.main.fadeIn(600,0,0,0);
    const nextButton = this.add.image(0, 0, "cs_bg4").setOrigin(0, 0);
    nextButton.setInteractive();
    nextButton.on('pointerdown', () =>{
        this.cameras.main.fadeOut(600,0,0,0);
            this.time.delayedCall(600,()=>{
                this.scene.start('CutScene5');
            })
    })
  }

  update() {}

  
}

export default CutScene4;
