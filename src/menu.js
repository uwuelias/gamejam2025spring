import Phaser from 'phaser';

class MenuScene extends Phaser.Scene{
    constructor(){
        super ('Menu');
    }

    init(){

    }
    
    preload(){
        this.load.image(
            "menu_bg",
            "./assets/background/PNG/menu.png"
          );
    }

    create(){
        //startButton
        this.add.image(0, 0, "menu_bg").setOrigin(0, 0);
        const startButton = this.add.text(50,350, 'Start',
            {
                fontSize: '90px',
                fontFamily: 'pixel',
                color: '#000'

            }
        );
        startButton.setInteractive();
        startButton.on('pointerdown', () =>{
            this.cameras.main.fadeOut(1000,0,0,0);
            this.time.delayedCall(1000,()=>{
                this.scene.start('GameScene');
            })
        })

        //settingsButton
        const settingsButton = this.add.text(50,450, 'Settings',
            {
                fontSize: '90px',
                fontFamily: 'pixel',
                color: '#000'
            }
        );
        settingsButton.setInteractive();
        settingsButton.on('pointerdown', () =>{
            this.scene.switch('GameScene');
        })


    }


}

export default MenuScene;