import Phaser from 'phaser';

class CutScene1 extends Phaser.Scene {
  constructor() {
    super("CutScene1");
  }

  preload() {
    this.load.image(
      "cs_bg1","./assets/background/PNG/Cutscene/Cutscene1.png"
    );
    this.load.audio("sad_music", "./assets/sound/sad_music.mp3");
  }

  create() {
    var sad_music = this.sound.add('sad_music');
        sad_music.loop=true;
        sad_music.play();
        this.registry.set('sad_music', sad_music);


    this.cameras.main.fadeIn(1000,0,0,0);
    const nextButton = this.add.image(0, 0, "cs_bg1").setOrigin(0, 0);
    nextButton.setInteractive();
    nextButton.on('pointerdown', () =>{
        this.cameras.main.fadeOut(600,0,0,0);
            this.time.delayedCall(600,()=>{
                this.scene.start('CutScene2');
            })
    })
  }

  update() {}

  
}

export default CutScene1;
