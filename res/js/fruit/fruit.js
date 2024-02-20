export class Fruit {
    constructor() {
      //type 1,2,3 - head, body, tail
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
      //this.randomPosition();
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      );
    } 
}