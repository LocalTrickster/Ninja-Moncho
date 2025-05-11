export default class LosingCondition extends Phaser.Scene {
    constructor() {
        super("LosingCondition");
    }

    init(data) {
        this.score = data.score;
        this.collectedShapes = data.collectedShapes;
    }

    preload() {
        this.load.image("fondomenu", "./public/assets/fondomenu.jpg"); 
    }

    create() {
        this.add.image(400, 300, "fondomenu").setScale(1);

        this.add.text(400, 200, "¡Perdiste!", {
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
            `Formas recolectadas: ${this.collectedShapes.diamond}D, ${this.collectedShapes.triangle}T, ${this.collectedShapes.square}C`,
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