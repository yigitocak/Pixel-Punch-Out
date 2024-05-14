export class Sprite {
  constructor({
    canvas,
    ctx,
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.imageLoaded = false;
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.width = this.image.width / this.framesMax;
      this.height = this.image.height;
      this.imageLoaded = true;
    };
    this.image.onerror = () => {
      console.error("Error loading the image", imageSrc);
    };
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
    this.visible = true;
    this.name = "";
    this.id = null;
  }

  draw() {
    if (!this.visible || !this.imageLoaded) return;
    this.ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale,
    );
  }

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
  remove() {
    this.visible = false;
  }
}

export class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox,
    framesHold,
    canvas,
    ctx,
  }) {
    super({
      canvas,
      ctx,
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });

    this.velocity = velocity;
    this.framesHold = framesHold;
    this.width = 50;
    this.height = 150;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.isAttacking = false;
    this.justAttacked = false;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.sprites = sprites;
    this.dead = false;
    this.facing = "right";
    this.lives = 0;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  setPositions(x, y, velX, velY) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = velX;
    this.velocity.y = velY;
  }

  setHealth(health) {
    this.health = health;
  }

  faceRight() {
    this.facing = "right";
  }
  faceLeft() {
    this.facing = "left";
  }

  draw() {
    if (!this.visible || !this.imageLoaded) return;

    this.ctx.save(); // Save the current context state

    // this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Semi-transparent red
    // this.ctx.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height,
    // );

    if (this.name) {
      this.ctx.fillStyle = "white"; // Text color
      this.ctx.font = "15px Press Start 2P"; // Text font
      this.ctx.textAlign = "center"; // Center the text above the sprite

      // Adjust the vertical position closer to the sprite
      // The y-coordinate is adjusted to be just above the sprite, considering the scale and height
      this.ctx.fillText(
        this.name,
        this.position.x + (this.width / 2) * this.scale,
        this.position.y - this.height * this.scale * 0.1, // Closer to the top of the sprite
      );
    }

    if (this.facing === "left") {
      this.ctx.scale(-1, 1); // Flip the canvas horizontally
      this.ctx.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        -(
          this.position.x +
          (this.image.width / this.framesMax) * this.scale -
          this.offset.x
        ), // Correct for flipped image
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale,
      );
    } else {
      this.ctx.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale,
      );
    }

    this.ctx.restore(); // Restore the original context state
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();

    // Adjust the attack box position based on the facing direction
    if (this.facing === "left") {
      this.attackBox.position.x =
        this.position.x - this.attackBox.width - this.attackBox.offset.x;
    } else {
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    }

    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // Keep the attack box closely aligned with the sprite's position
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // // Update the position of the fighter based on velocity
    // this.position.x += this.velocity.x;
    // this.position.y += this.velocity.y;
  }

  attack() {
    this.switchSprite("attack1");
    this.velocity.x = 0;
    this.isAttacking = true;
  }

  takeHit() {
    this.health -= 5;

    if (this.health <= 0) {
      this.switchSprite("death");
    } else this.switchSprite("takeHit");
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1) {
        this.dead = true;
      }
      return;
    }

    // overriding all other animations with the attack animation
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return;

    // override when fighter gets hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
