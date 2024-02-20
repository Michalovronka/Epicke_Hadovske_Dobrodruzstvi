export class SnakeBody {
    constructor() {
      //type 1,2,3 - head, body, tail
      this.velocity = {
        //bude se měnit až budu umět event listener
        x: -5,
        y: 0,
      };
      this.size = {
        width: 30,
        height: 30,
      };
      this.position = {
        x: 50,
        y: 700 / 2 - this.size.height,
      };
    }
  
    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(
          this.position.x,
          this.position.y,
          this.size.width,
          this.size.height
        );
    }

    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
  
        //700 = canvas size
        //x
        if (this.position.x >= 700) {
            this.position.x = 0 - this.size.width/1.5;
            return;
        }
        if (this.position.x <= 0 - this.size.width/1.5) {
            this.position.x = 700;
            return;
        }
  
        //y
        if (this.position.y >= 700 ) {
          this.position.y = 0 - this.size.height/1.5;
          return;
        }
        if (this.position.y <= 0 - this.size.height/1.5) {
          this.position.y = 700;
          return;
        }
  
      }
}
  