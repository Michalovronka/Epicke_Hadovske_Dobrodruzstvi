export class SnakeBody {

  static skinsData;
  constructor(type, currentPart) {
    //type 1,2,3 - head, body, tail
    this.img = new Image();
    this.img.src;
    this.bodyPart = currentPart;
    this.setSkin(type);
    this.size = {
      width: 30,
      height: 30,
    };
    this.velocity = {
      x: -5,
      y: 0,
    };
    this.position = {
      x: 50,
      y: 300,
    };
    this.rotationAngle = 270;
  }

  setSkin(type) {
    SnakeBody.skinsData.map((obj) => {
      if (type === obj.name) {
        obj.parts.map((objPart) => {
          if (this.bodyPart === objPart.part) {
            this.img.src = objPart.sprite.path;
          }
        });
      }
    });
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
    ctx.rotate(this.rotationAngle * Math.PI / 180);
    ctx.drawImage(
      this.img,
      -this.size.width / 2,
      -this.size.height / 2,
      this.size.width,
      this.size.height
    );
    ctx.restore();
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //700 = canvas size
    if (this.position.x >= 700) {
      this.position.x = 0 - this.size.width / 1.5;
      return;
    }
    if (this.position.x <= 0 - this.size.width / 1.5) {
      this.position.x = 700;
      return;
    }

    //y
    if (this.position.y >= 700) {
      this.position.y = 0 - this.size.height / 1.5;
      return;
    }
    if (this.position.y <= 0 - this.size.height / 1.5) {
      this.position.y = 700;
      return;
    }
  }
}
