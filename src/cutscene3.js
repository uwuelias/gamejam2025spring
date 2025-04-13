
class CutScene3 extends Phaser.Scene {
  constructor() {
    super("CutScene3");
  }

  preload() {
    this.load.image(
      "cs_bg3","./assets/background/PNG/Cutscene/CutScene3.png"
    );
  }

  create() {
    this.cameras.main.fadeIn(600,0,0,0);
    const nextButton = this.add.image(0, 0, "cs_bg3").setOrigin(0, 0);
    nextButton.setInteractive();
    nextButton.on('pointerdown', () =>{
        this.cameras.main.fadeOut(600,0,0,0);
            this.time.delayedCall(600,()=>{
                this.scene.start('CutScene4');
            })
    })
  }

  update() {}

  
}

export default CutScene3;
