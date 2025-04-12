import Phaser from 'phaser';

class EndScene extends Phaser.Scene{
    constructor(){
        super ('EndScene');
    }

    init(){

    }
    
    preload(){
        this.load.image(
            "end_bg",
            "./assets/background/PNG/end.png"
          );
    }



    create(){


        this.add.image(0, 0, "end_bg").setOrigin(0, 0);
    
        //restartButton
        const restartButton = this.add.text(475,190,'Play Again', {
            fontSize: '50px',
            fontFamily: 'pixel',
            color: '#000'
        });
        restartButton.setInteractive();
        restartButton.on('pointerdown', () =>{
            this.scene.switch('Menu');
        })

        //add victory defeat based on a boolean set in registry named outcome

        var outcome = this.registry.get('outcome');
        console.log(outcome);
        if(outcome){
        this.add.text(415, 300, 'Victory', {
            fontSize: '100px',
            fontFamily: 'pixel',
            color: '#000'
        });
         } else{
            this.add.text(445, 300, 'Defeat', {
                fontSize: '100px',
                fontFamily: 'pixel',
                color: '#000'
            });
        }   
    }

}

export default EndScene;