import { Sprite, Fighter } from "./Classes";
import { BASE_URL } from "../../../utils/utils";

export const rectangularCollision = (rectangle1, rectangle2) => {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
};

export const determineWinner = ({ playerSprite, enemySprite, timerId }) => {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (playerSprite.health === enemySprite.health) {
    document.querySelector("#displayText").innerHTML = "Tie";
  } else if (playerSprite.health > enemySprite.health) {
    document.querySelector("#displayText").innerHTML =
      `${playerSprite.name} wins`;
  } else if (playerSprite.health < enemySprite.health) {
    document.querySelector("#displayText").innerHTML =
      `${enemySprite.name} wins`;
  }
};

export const createFighter = (
  canvas,
  ctx,
  positionX,
  positionY,
  offsetX,
  offsetY,
) => {
  return new Fighter({
    position: {
      x: positionX,
      y: positionY,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    //'./img/samuraiMack/Idle.png'
    imageSrc: `${BASE_URL}img/PlayerImages/samuraiMack/Idle.png`,
    framesMax: 8,
    scale: 2.5,
    offset: {
      x: offsetX,
      y: offsetY,
    },
    sprites: {
      idle: {
        imageSrc: `${BASE_URL}img/PlayerImages/samuraiMack/Idle.png`,
        framesMax: 8,
      },
      run: {
        imageSrc: `${BASE_URL}img/PlayerImages/samuraiMack/Run.png`,
        framesMax: 8,
      },
      jump: {
        imageSrc: `${BASE_URL}img/PlayerImages/samuraiMack/Jump.png`,
        framesMax: 2,
      },
      fall: {
        imageSrc: `${BASE_URL}img/PlayerImages/samuraiMack/Fall.png`,
        framesMax: 2,
      },
      attack1: {
        imageSrc: `${BASE_URL}img/PlayerImages/samuraiMack/Attack.png`,
        framesMax: 6,
      },
      takeHit: {
        imageSrc: `${BASE_URL}img/PlayerImages/samuraiMack/TakeHit.png`,
        framesMax: 4,
      },
      death: {
        imageSrc: `${BASE_URL}img/PlayerImages/samuraiMack/Death.png`,
        framesMax: 6,
      },
    },
    framesHold: "5",
    attackBox: {
      offset: {
        x: 50,
        y: -20,
      },
      width: 160,
      height: 160,
    },
    canvas: canvas,
    ctx: ctx,
  });
};
