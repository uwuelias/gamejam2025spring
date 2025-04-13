
class SettingsScene extends Phaser.Scene{
    constructor(){
        super ('SettingsScene');
    }

    init(){

    }
    
    preload(){
        this.load.image(
            "setting_bg",
            "./assets/background/PNG/setting.png"
          );
    }

    create(){
        //rollButton
        this.add.image(0, 0, "setting_bg").setOrigin(0, 0);
        const rollButton = this.add.text(520,175, 'Roll',
            {
                fontSize: '90px',
                fontFamily: 'pixel',
                color: '#000'

            }
        );
        rollButton.setInteractive();
        rollButton.on('pointerdown', () =>{
            this.rollVolume();
        })
        //rolling
        const menu_sound = this.registry.get('menu_sound');
       
        this.volText = this.add.text(360, 300, 'Volume: ' + menu_sound.volume * 100,
            {
                fontSize: '90px',
                fontFamily: 'pixel',
                color: '#000'

            }
         );

 


        //backButton
        const backButton = this.add.text(75,530,'Back', {
            fontSize: '50px',
            fontFamily: 'pixel',
            color: '#000'
        });
        backButton.setInteractive();
        backButton.on('pointerdown', () =>{
            this.scene.switch('Menu');
        })
    }
        rollVolume(){
            const menu_sound = this.registry.get('menu_sound');
            const randomVal = Phaser.Math.FloatBetween(0, 1).toFixed(2);
            this.sound.setVolume(randomVal);
            this.volText.setText('Volume: ' + randomVal * 100);
         }

}

export default SettingsScene;