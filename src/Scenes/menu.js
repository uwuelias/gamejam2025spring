class Menu extends Phaser.Scene{
    constructor(){
        super ({key: 'Menu', active: false});
    }

    init(){

    }
    
    preload(){
        this.load.image(
            "bg",
            "./assets/background/PNG/menu.png"
          );
    }

    create(){
        this.add.image(0, 0, "bg").setOrigin(0, 0);
    }


}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  scene: [Menu],
};