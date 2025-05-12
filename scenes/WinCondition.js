export default class WinCondition extends Phaser.Scene {
    constructor() {
        super("WinScene");
    }

    init(data) {
       
        this.message = data.message;
        this.score = data.score;
        this.collectedShapes = data.collectedShapes;
    }
    
    create() {

        this.add.image(400, 300, "fondomenu").setScale(1);
        
        this.add.text(400, 200, this.message, {
            fontSize: "32px",
            fill: "#fff",
        }).setOrigin(0.5);

        this.add.text(400, 300, `Puntuación: ${this.score}`, {
            fontSize: "24px",
            fill: "#fff",
        }).setOrigin(0.5);

        this.add.text(
            400,
            350,
            `Shapes: ${this.collectedShapes.diamond}D, ${this.collectedShapes.triangle}T, ${this.collectedShapes.square}S`,
            {
                fontSize: "24px",
                fill: "#fff",
            }
        ).setOrigin(0.5);

        
        this.add.text(400, 450, "Presiona R para reintentar", {
            fontSize: "24px",
            fill: "#fff",
        }).setOrigin(0.5);

        
        this.input.keyboard.on("keydown-R", () => {
            this.scene.start("HelloWorldScene"); 
        });
    }
}