export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("HelloWorldScene");
  }

  init() {}

  preload() {
    this.load.image("sky", "./public/assets/cielo.webp");
    this.load.image("diamond", "./public/assets/diamond.png");
    this.load.image("square", "./public/assets/square.png");
    this.load.image("triangle", "./public/assets/triangle.png");
    this.load.image("platform", "./public/assets/platform.png");
    this.load.spritesheet("ninja", "./public/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky").setScale(2.5);

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 600, "platform").setScale(2).refreshBody();

    this.platforms.create(200, 400, "platform").setScale(0.5).refreshBody();
    this.platforms.create(800, 300, "platform").setScale(0.5).refreshBody();
    this.platforms.create(500, 250, "platform").setScale(0.5).refreshBody();

    this.player = this.physics.add.sprite(100, 450, "ninja").setScale(1.5);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );
    this.gameOver = false;

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("ninja", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "ninja", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("ninja", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.fallingObjects = this.physics.add.group({
      allowGravity: true,
    });

    this.time.addEvent({
      delay: 500,
      callback: this.spawnFallingObject,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      this.fallingObjects,
      this.platforms,
      (fallingObject, platform) => {
        let score = fallingObject.getData("score");
        fallingObject.setData("score", score - 5);
        if (score <= 5) {
          fallingObject.disableBody(true, true);
        }
      },
      null,
      this
    );

    this.score = 0;

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.physics.add.overlap(
      this.player,
      this.fallingObjects,
      this.collectObject,
      null,
      this
    );
  }

  spawnFallingObject() {
    const objectTypes = [
      { type: "diamond", score: 20 },
      { type: "triangle", score: 15 },
      { type: "square", score: 10 },
    ];
    const randomObject = Phaser.Utils.Array.GetRandom(objectTypes);

    const x = Phaser.Math.Between(50, 750);
    const object = this.fallingObjects.create(x, 0, randomObject.type);

    object.setBounce(1);
    object.setCollideWorldBounds(true);
    object.setData("score", randomObject.score);
    object.setVelocityX(Phaser.Math.Between(-50, 50));
  }

  collectObject(player, object) {
    object.disableBody(true, true);

    const objectScore = object.getData("score");
    this.score += objectScore;

    this.scoreText.setText(`Score: ${this.score}`);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
      this.scene.restart();
    }

    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
