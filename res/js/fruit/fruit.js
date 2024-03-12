export class Fruit {
  constructor() {
    this.img = new Image();
    this.img.src = "./res/img/fruit/fruit.png";
    this.size = {
      width: 30,
      height: 30,
    };
    this.position = {
      x: 410,
      y: 310,
    };
  }

  randomPosition() {
    this.position.x = Math.floor(Math.random() * (700 - this.size.width));
    this.position.y = Math.floor(Math.random() * (700 - this.size.height));
  }

  draw(ctx) {
    ctx.save();

    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    ctx.restore();
  }
}
