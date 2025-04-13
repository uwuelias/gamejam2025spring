
class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
  }

  init() {}

  preload() {
    this.load.image("end_bg", "./assets/background/PNG/end.png");
    this.load.audio("victory_sound", "./assets/sound/CallToAdventure.mp3");
    this.load.audio("defeat_sound", "./assets/sound/defeat.mp3");
  }

  create() {
    var outcome = this.registry.get("outcome");

    if (outcome) {
      var end_sound = this.sound.add("victory_sound");
      end_sound.loop = true;
      end_sound.play();
    } else {
      var end_sound = this.sound.add("defeat_sound");
      end_sound.loop = true;
      end_sound.play();
    }

    this.add.image(0, 0, "end_bg").setOrigin(0, 0);

    //restartButton
    const restartButton = this.add.text(475, 190, "Play Again", {
      fontSize: "50px",
      fontFamily: "pixel",
      color: "#000",
    });
    restartButton.setInteractive();
    restartButton.on("pointerdown", () => {
      end_sound.stop();
      this.scene.start("GameScene");
    });

    //add victory defeat based on a boolean set in registry named outcome
    if (outcome) {
      this.add.text(415, 300, "Victory", {
        fontSize: "100px",
        fontFamily: "pixel",
        color: "#000",
      });
    } else {
      this.add.text(445, 300, "Defeat", {
        fontSize: "100px",
        fontFamily: "pixel",
        color: "#000",
      });
    }
  }
}

export default EndScene;
