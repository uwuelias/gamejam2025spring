import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.player;
    this.isAttacking = false;
  }

  preload() {
    this.load.image("bg", "./assets/background/PNG/battle1.png");
    this.load.image("platform", "./assets/background/platform.jpg");

    this.load.spritesheet("idle", "./assets/sprites/player/Samurai/Idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("run", "./assets/sprites/player/Samurai/Run.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("jump", "./assets/sprites/player/Samurai/Jump.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet(
      "attack",
      "./assets/sprites/player/Samurai/Attack_1.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(0, 0, "bg").setOrigin(0, 0);

    const platform = this.add.image(0, height - 50, "platform").setOrigin(0, 0);
    platform.displayWidth = width;
    platform.displayHeight = 50;

    this.physics.add.existing(platform, true);

    this.player = this.physics.add.sprite(100, 450, "idle");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platform);

    // animations
    const idle = {
      key: "idleAnimation",
      frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    };

    const run = {
      key: "run",
      frames: this.anims.generateFrameNumbers("run", { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1,
    };

    const jump = {
      key: "jump",
      frames: this.anims.generateFrameNumbers("jump", { start: 0, end: 11 }),
      frameRate: 12,
      repeat: 0,
    };

    const attack = {
      key: "attack",
      frames: this.anims.generateFrameNumbers("attack", { start: 0, end: 5 }),
      frameRate: 12,
      repeat: 0,
    };

    this.anims.create(idle);
    this.anims.create(run);
    this.anims.create(jump);
    this.anims.create(attack);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.input.on("pointerdown", (pointer) => {
      if (pointer.leftButtonDown() && !this.isAttacking) {
        this.isAttacking = true;
        this.player.anims.play("attack", true);

        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isAttacking = false;
        });
      }
    });
  }

  update() {
    const speed = 160;
    const onGround = this.player.body.touching.down;

    if (this.isAttacking) {
      this.player.setVelocityX(0);
      return;
    }

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
      if (onGround) this.player.anims.play("run", true);
      this.player.setFlipX(true);
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
      if (onGround) this.player.anims.play("run", true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      if (onGround) this.player.anims.play("idleAnimation", true);
    }

    if ((this.keys.up.isDown || this.keys.space.isDown) && onGround) {
      this.player.setVelocityY(-250);
      this.player.anims.play("jump", true);
    }

    if (this.isAttacking) return;
  }
}

export default GameScene;
