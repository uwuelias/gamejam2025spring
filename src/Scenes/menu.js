class Menu extends Phaser.Scene{
    constructor(){
        super ({key: 'Menu', active: false});
    }

    init(){

    }
    
    preload(){

    }

    create(){

    }


}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  scene: [Menu],
};