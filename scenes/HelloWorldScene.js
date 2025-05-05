export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("HelloWorldScene");
  }

  init() {
    
  }

  preload() {
    // Load assets
    this.load.image("sky", "./public/assets/cielo.webp");
    this.load.image("diamond", "./public/assets/diamond.png");
    this.load.image("square", "./public/assets/square.png");
    this.load.image("triangle", "./public/assets/triangle.png");
    this.load.image("platform", "./public/assets/platform.png");
    this.load.spritesheet("ninja", "./public/assets/ninja.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky").setScale(2.5);

    this.player = this.physics.add.sprite(100, 450, "ninja").setScale(2);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    
    this.collider = this.physics.add.collider(this.player, this.platform);

    
    const ground = this.physics.add.staticImage(400, 600, "platform").setScale(2).refreshBody();

   
    this.fallingObjects = this.physics.add.group({
        allowGravity: true, 
    });

    this.time.addEvent({
        delay: 1000, 
        callback: this.spawnFallingObject,
        callbackScope: this,
        loop: true,
    });

    this.physics.add.collider(this.fallingObjects, ground, (object1, object2) => {
        if (this.fallingObjects.contains(object1)) {
            object1.destroy(); 
        } else if (this.fallingObjects.contains(object2)) {
            object2.destroy(); 
        }
    });
  }

  spawnFallingObject() {

    const objectTypes = ["diamond", "square", "triangle"];
    const randomType = Phaser.Utils.Array.GetRandom(objectTypes);

   
    const x = Phaser.Math.Between(50, 750); 
    const object = this.fallingObjects.create(x, 0, randomType);

  
    object.setBounce(0.2);
    object.setCollideWorldBounds(false);
  }

  update() {
  }
}
