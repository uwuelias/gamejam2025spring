import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.player;
    this.isAttacking = false;
    this.hitBox = null;
    this.damage = 0;
  }

  updateHitBoxPosition() {
    if (this.hitBox) {
      this.hitBox.setPosition(this.player.x, this.player.y);

      if (this.player.flipX) {
        this.hitBox.setPosition(this.player.x - 50, this.player.y);
      } else {
        this.hitBox.setPosition(this.player.x + 50, this.player.y);
      }
    }
  }

  playerDealDamage(vampire) {
    let damage = Phaser.Math.Between(1, 1000);
    vampire.setData("health", vampire.getData("health") - damage);
    this.damageText.setText(`-${damage}`);
    this.damageText.setPosition(vampire.x, vampire.y - 50);
    this.damageText.setAlpha(1);
    this.tweens.add({
      targets: this.damageText,
      alpha: { from: 1, to: 0 },
      duration: 3000,
      onComplete: () => {
        this.damageText.setText("");
      },
    });
    if (vampire.getData("health") <= 0) {
      this.vampires.remove(vampire, true, true);
    }
  }

  playerTakeDamage() {
    console.log("player took damage");
    let damage = Phaser.Math.Between(50, 2500);
    this.playerCurrentHP -= damage;
    console.log("Player took damage! Current HP: ", this.playerCurrentHP);
    if (this.playerCurrentHP <= 0) {
      this.player.setVelocity(0, 0);
      console.log("Game Over");
    }
    this.updateHealthBar();
  }

  updateHealthBar() {
    const x = 20;
    const y = 20;
    const width = 200;
    const height = 50;

    const hpPercent = Phaser.Math.Clamp(
      this.playerCurrentHP / this.playerMaxHP,
      0,
      1
    );
    this.healthBar.clear();

    this.healthBar.fillStyle(0x000000);
    this.healthBar.fillRect(x - 2, y - 2, width + 4, height + 4);

    this.healthBar.fillStyle(0xff0000);
    this.healthBar.fillRect(x, y, width, height);

    this.healthBar.fillStyle(0x00ff00);
    this.healthBar.fillRect(x, y, width * hpPercent, height);

    this.hpText.setText(`${Math.floor(hpPercent * 100)}%`);
  }

  preload() {
    this.load.image("bg", "./assets/background/PNG/battle1.png");
    this.load.image("platform", "./assets/background/platform.jpg");

    this.load.audio(
      "bgm_audio",
      "./assets/sound/Miguel Johnson - Good Day To Die.mp3"
    );

    // spritesheets for player
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

    //spritesheets for enemy
    this.load.spritesheet(
      "vampire1",
      "./assets/sprites/villains/craftpix-net-506778-free-vampire-pixel-art-sprite-sheets/Countess_Vampire/Run.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "vampAttack",
      "./assets/sprites/villains/craftpix-net-506778-free-vampire-pixel-art-sprite-sheets/Countess_Vampire/Attack_1.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );
  }

  create() {
    //winning/losing:
    let outcome = true;
    this.registry.set("outcome", outcome);

    const { width, height } = this.scale;

    var bgm = this.sound.add("bgm_audio");
    bgm.loop = true;
    bgm.play();
    this.registry.set("bgm", bgm);

    this.damageText = this.add.text(20, 80, "", {
      fontSize: "30px",
      fontFamily: "pixel",
      color: "#ff0000",
    });
    this.damageText.setDepth(10);

    this.playerMaxHP = Phaser.Math.FloatBetween(10, 10000);
    this.playerCurrentHP = this.playerMaxHP;

    this.add.image(0, 0, "bg").setOrigin(0, 0);

    const platform = this.add.image(0, height - 50, "platform").setOrigin(0, 0);
    platform.displayWidth = width;
    platform.displayHeight = 50;

    this.physics.add.existing(platform, true);

    this.player = this.physics.add.sprite(100, 450, "idle");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, platform);

    this.healthBar = this.add.graphics();
    this.hpText = this.add.text(230, 25, "100%", {
      fontSize: "40px",
      fontFamily: "pixel",
      color: "#000",
    });
    this.updateHealthBar();

    this.hitBox = this.add.rectangle(
      this.player.x + this.player.width / 2,
      this.player.y,
      64,
      128,
      0xff0000,
      0.5
    );
    this.physics.add.existing(this.hitBox);
    this.hitBox.body.setAllowGravity(false);
    this.hitBox.body.setImmovable(true);
    this.hitBox.setVisible(false);

    this.vampires = this.physics.add.group();
    this.physics.add.overlap(
      this.player,
      this.vampires,
      this.onPlayerVampCollision,
      null,
      this
    );

    for (let i = 0; i < Phaser.Math.Between(5, 20); i++) {
      const vampire = this.vampires.create(
        Phaser.Math.Between(400, 1000),
        Phaser.Math.Between(300, 500),
        "vampire1"
      );
      vampire.setData("health", Phaser.Math.Between(10, 1000));
      vampire.setBounce(0.2);
      vampire.setCollideWorldBounds(true);
      vampire.setScale(1.2);
      vampire.direction = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
      vampire.anims.play("vampRun", true);
      this.physics.add.collider(vampire, platform);
      vampire.damagedFromAtk = false;
    }

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
      frameRate: 8,
      repeat: 0,
    };

    this.anims.create(idle);
    this.anims.create(run);
    this.anims.create(jump);
    this.anims.create(attack);

    //vamp anims

    const vampRun = {
      key: "vampRun",
      frames: this.anims.generateFrameNumbers("vampire1", { start: 0, end: 5 }),
      frameRate: 6,
      repeat: -1,
    };

    const vampAttack = {
      key: "vampAttack",
      frames: this.anims.generateFrameNumbers("vampAttack", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: 0,
    };

    this.anims.create(vampRun);
    this.anims.create(vampAttack);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.input.on("pointerdown", (pointer) => {
      if (pointer.leftButtonDown() && !this.isAttacking) {
        this.isAttacking = true;
        this.player.anims.play("attack", true);
        this.updateHitBoxPosition();
        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isAttacking = false;
        });
      }
    });
  }

  update() {
    const speed = 200;
    const onGround = this.player.body.touching.down;
    const bgm = this.registry.get("bgm");
    const rightEdge = this.scale.width;

    //conditions (victory/defeat)
    if (
      this.vampires.getChildren().length == 0 &&
      this.player.x >= rightEdge - this.player.width / 2
    ) {
      this.registry.set("outcome", true);
      bgm.stop();
      this.scene.start("EndScene");
      return;
    }

    //if player dead (loss)
    if (this.playerCurrentHP <= 0) {
      this.playerCurrentHp = 0;
      this.registry.set("outcome", false);
      bgm.stop();
      this.scene.start("EndScene");
      return;
    }

    if (this.isAttacking) {
      this.player.setVelocityX(0);
      this.updateHitBoxPosition();
      this.vampires.getChildren().forEach((vampire) => {
        if (
          this.hitBox.getBounds().contains(vampire.x, vampire.y) &&
          !vampire.damagedFromAtk
        ) {
          this.playerDealDamage(vampire);
          vampire.damagedFromAtk = true;
        }
      });
      this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.isAttacking = false;
        this.vampires.getChildren().forEach((vampire) => {
          vampire.damagedFromAtk = false;
        });
      });
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
    this.vampires.getChildren().forEach((vampire) => {
      if (!vampire.isAttacking) {
        vampire.setVelocityX(100 * vampire.direction);
        vampire.setFlipX(vampire.direction < 0);
        vampire.anims.play("vampRun", true);
        if (vampire.x >= 1000) {
          vampire.direction = -1;
        } else if (vampire.x <= 100) {
          vampire.direction = 1;
        }
      }
    });
  }

  onPlayerVampCollision(player, vampire) {
    if (this.playerCurrentHP <= 0) return;
    if (!vampire.isAttacking) {
      const distanceToPlayer = Phaser.Math.Distance.Between(
        vampire.x,
        vampire.y,
        player.x,
        player.y
      );
      if (distanceToPlayer < 40) {
        vampire.isAttacking = true;
        vampire.anims.play("vampAttack", true);
        this.playerTakeDamage();
        this.time.delayedCall(1500, () => {
          vampire.isAttacking = false;
        });
      }
    }
  }
}

export default GameScene;
