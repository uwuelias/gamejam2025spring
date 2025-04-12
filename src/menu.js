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

          this.load.audio("menu_audio", "./assets/sound/menu_music.mp3");
     }

    create(){
        //audio
        var menu_sound = this.sound.add('menu_audio');
        menu_sound.loop=true;
        menu_sound.play();
        this.registry.set('menu_sound', menu_sound);


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
            menu_sound.stop();
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
            this.scene.switch('SettingsScene');
        })


    }


}

export default MenuScene;