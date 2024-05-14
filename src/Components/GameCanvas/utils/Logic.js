import { Sprite, Fighter } from "./Classes";
import { BASE_URL } from "../../../utils/utils";

export const rectangularCollision = (attacker, defender) => {
  // Calculate the attack box edges
  let attackLeft = attacker.attackBox.position.x;
  let attackRight = attackLeft + attacker.attackBox.width;
  let attackTop = attacker.attackBox.position.y;
  let attackBottom = attackTop + attacker.attackBox.height;

  // Calculate the defender's bounding box
  let defendLeft = defender.position.x;
  let defendRight = defendLeft + defender.width;
  let defendTop = defender.position.y;
  let defendBottom = defendTop + defender.height;

  // Check if the attack box overlaps with the defender's bounding box
  let overlapsX = attackRight > defendLeft && attackLeft < defendRight;
  let overlapsY = attackBottom > defendTop && attackTop < defendBottom;

  // Calculate horizontal distance between the attacker and defender
  let distanceX = Math.abs(attacker.position.x - defender.position.x);

  // Define the exact distance at which the collision should start being considered
  const startCollisionDistance = 229; // Adjusted as per your example (318 - 105)

  // Ensure collision starts at the specified distance
  if (distanceX > startCollisionDistance) {
    return false; // Ignore collision if the distance is greater than the start collision distance
  }

  return overlapsX && overlapsY;
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

export const endGame = (winner, timerId) => {
  clearTimeout(timerId);
  document.querySelector("#displayText").innerHTML = `${winner} wins`;
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
        x: 70,
        y: -20,
      },
      width: 160,
      height: 160,
    },
    canvas: canvas,
    ctx: ctx,
  });
};
