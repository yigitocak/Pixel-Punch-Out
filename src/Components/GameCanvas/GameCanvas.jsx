import React, { useEffect, useRef } from "react";
import {
  createFighter,
  rectangularCollision,
  determineWinner,
  endGame,
} from "./utils/Logic";
import { Sprite } from "./utils/Classes";
import { gsap } from "gsap";
import "./GameCanvas.scss";
import { HealthBar } from "../GameHealthBar/GameHealthBar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";

export const GameCanvas = ({
  socket,
  username,
  backgroundId,
  setShowSnackbar,
  setFlashSuccess,
  setFlashMessage,
}) => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const BACKGROUNDS = [
    {
      id: 1,
      imageSrc: `${BASE_URL}img/backgrounds/dojo.png`,
      scale: 1,
      framesMax: 37,
    },
    {
      id: 2,
      imageSrc: `${BASE_URL}img/backgrounds/leaf.png`,
      scale: 1,
      framesMax: 38,
    },
    {
      id: 3,
      imageSrc: `${BASE_URL}img/backgrounds/dragon.png`,
      scale: 1,
      framesMax: 8,
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.querySelector("#displayText").style.display = "flex";
    document.querySelector("#displayText").innerText =
      "Waiting for another player";

    // Globals
    let players = [];
    let timerId;
    let timer;
    let STOP = false;
    let FINISH = false;

    //Input Maps
    const inputs = {
      up: false,
      left: false,
      right: false,
      attack: false,
    };

    let enemyInputs = {
      up: false,
      left: false,
      right: false,
      attack: false,
    };

    const chosenBackground = BACKGROUNDS.find(
      (background) => background.id === backgroundId,
    );

    const background = new Sprite({
      canvas: canvasRef.current,
      ctx: canvasRef.current.getContext("2d"),
      position: { x: 0, y: 0 },
      imageSrc: chosenBackground.imageSrc,
      scale: chosenBackground.scale,
      framesMax: chosenBackground.framesMax,
    });
    const playerSprite = createFighter(canvas, ctx, 65, 330, 215, 155);
    const enemySprite = createFighter(canvas, ctx, 950, 330, 215, 155);

    function decreaseTimer() {
      if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector("#timer").innerText = timer;
      }

      if (timer === 0) {
        determineWinner({ playerSprite, enemySprite, timerId });
      }
    }

    socket.on("countdown3", (message) => {
      document.querySelector("#displayText").innerText = message;
    });

    socket.on("countdown2", () => {
      document.querySelector("#displayText").innerText = "2";
    });

    socket.on("countdown1", () => {
      document.querySelector("#displayText").innerText = "1";
    });

    socket.on("go", () => {
      socket.emit("startGameRequest");
    });

    socket.on("close", () => {
      navigate(`/`);
    });

    socket.on("playersReady", () => {
      socket.emit("startCountdown");
    });

    socket.on("startGame", (time) => {
      // Clearing the text in case something is there
      document.querySelector("#displayText").innerText = "";
      timer = time;
      decreaseTimer();

      // When websocket server sends player data
      socket.on("players", (serverPlayers) => {
        if (!STOP) {
          players = serverPlayers;

          const playerId = socket.id;
          const localPlayer = players.find((player) => player.id === playerId);

          if (localPlayer) {
            playerSprite.setPositions(
              localPlayer.x,
              localPlayer.y,
              localPlayer.velocity.x,
              localPlayer.velocity.y,
            );
            playerSprite.setHealth(localPlayer.health);
            playerSprite.setId(socket.id);
            playerSprite.setName(username);

            // updating the health bar for player
            gsap.to("#playerHealth", {
              width: playerSprite.health + "%",
            });
          }

          // Updating enemySprite health and position
          if (players.length > 1) {
            const enemy = players.find((player) => player.id !== playerId);
            if (enemy) {
              enemySprite.setPositions(
                enemy.x,
                enemy.y,
                enemy.velocity.x,
                enemy.velocity.y,
              );
              enemySprite.setHealth(enemy.health);
              enemySprite.setName(enemy.name);

              // updating the health bar for the enemy
              gsap.to("#enemyHealth", {
                width: enemySprite.health + "%",
              });
              enemySprite.draw();
              enemySprite.setId(enemy.id);
            }
          }
        }
      });

      // Listener For Enemy Inputs
      socket.on("playerInputs", (serverInputMap) => {
        if (!STOP) {
          for (let id in serverInputMap) {
            if (id !== socket.id) {
              enemyInputs = serverInputMap[id];
            }
          }
        }
      });

      // Event Listeners For Inputs
      window.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "w") {
          inputs["up"] = true;
        } else if (e.key.toLowerCase() === " ") {
          inputs["attack"] = true;
        }
        if (e.key.toLowerCase() === "d") {
          inputs["right"] = true;
        } else if (e.key.toLowerCase() === "a") {
          inputs["left"] = true;
        }
        if (!STOP) {
          socket.emit("inputs", inputs);
        }
      });

      window.addEventListener("keyup", (e) => {
        if (e.key.toLowerCase() === "w") {
          inputs["up"] = false;
        } else if (e.key.toLowerCase() === " ") {
          inputs["attack"] = false;
        }
        if (e.key.toLowerCase() === "d") {
          inputs["right"] = false;
        } else if (e.key.toLowerCase() === "a") {
          inputs["left"] = false;
        }

        if (!STOP) {
          socket.emit("inputs", inputs);
        }
      });

      // Deleting the enemy when dced
      socket.on("playerDisconnected", () => {
        enemySprite.remove();
      });

      // When the enemy disconnects
      socket.on("playerDisconnected", () => {
        STOP = true; // Set stop flag to true to stop game updates
        animate(); // Call animate to update the canvas immediately
      });

      animate(); // Call the animate function to start the animation loop
    });

    // Game Loop
    function animate() {
      if (!STOP) {
        // Recursion and animation
        window.requestAnimationFrame(animate);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animating the background
        if (background) {
          background.update();
        }

        if (playerSprite.health <= 0 && enemySprite.health <= 0) {
          endGame("tie", timerId);
          return;
        } else if (playerSprite.health <= 0) {
          if (!FINISH) {
            socket.emit("death", playerSprite.id);
            endGame(enemySprite.name, timerId, FINISH);
            FINISH = true;
          }
          return;
        } else if (enemySprite.health <= 0) {
          if (!FINISH) {
            socket.emit("death", enemySprite.id);
            endGame(playerSprite.name, timerId, FINISH);
            FINISH = true;
          }
          return;
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Sprite change, velocity change  direction handling
        playerSprite.velocity.x = 0;
        if (playerSprite.velocity.y < 0) {
          playerSprite.switchSprite("jump");
        } else if (playerSprite.velocity.y > 0) {
          playerSprite.switchSprite("fall");
        } else if (inputs["right"]) {
          if (playerSprite.position.x <= 950) {
            playerSprite.faceRight();
            playerSprite.velocity.x = 5;
            playerSprite.switchSprite("run");
          }
        } else if (inputs["left"]) {
          if (playerSprite.position.x >= 0) {
            playerSprite.faceLeft();
            playerSprite.velocity.x = -5;
            playerSprite.switchSprite("run");
          }
        } else if (inputs["attack"]) {
          if (!playerSprite.justAttacked) {
            playerSprite.attack();
          }
        } else {
          playerSprite.switchSprite("idle");
        }

        enemySprite.velocity.x = 0;
        if (enemySprite.velocity.y < 0) {
          enemySprite.switchSprite("jump");
        } else if (enemySprite.velocity.y > 0) {
          enemySprite.switchSprite("fall");
        } else if (enemyInputs["right"]) {
          if (enemySprite.position.x <= 950) {
            enemySprite.faceRight();
            enemySprite.velocity.x = 5;
            enemySprite.switchSprite("run");
          }
        } else if (enemyInputs["left"]) {
          if (enemySprite.position.x >= 0) {
            enemySprite.faceLeft();
            enemySprite.velocity.x = -5;
            enemySprite.switchSprite("run");
          }
        } else if (enemyInputs["attack"]) {
          if (!enemySprite.justAttacked) {
            enemySprite.attack();
          }
        } else {
          enemySprite.switchSprite("idle");
        }

        // Update both player and enemy sprites
        playerSprite.update();
        enemySprite.update();

        // Collision and Attack
        if (playerSprite.isAttacking && playerSprite.framesCurrent === 4) {
          if (rectangularCollision(playerSprite, enemySprite)) {
            enemySprite.takeHit();
            socket.emit("getHit", {
              id: enemySprite.id,
              health: enemySprite.health,
            });
            playerSprite.isAttacking = false;
            playerSprite.justAttacked = true;

            // Set timeout to avoid spamming
            setTimeout(() => {
              playerSprite.justAttacked = false;
            }, 450);
          } else {
            playerSprite.isAttacking = false;
          }
        }
        // Enemy collision and attack
        if (enemySprite.isAttacking && enemySprite.framesCurrent === 4) {
          if (rectangularCollision(enemySprite, playerSprite)) {
            playerSprite.takeHit();
            socket.emit("getHit", {
              id: playerSprite.id,
              health: playerSprite.health,
            });
            enemySprite.isAttacking = false;
            enemySprite.justAttacked = true;

            // Set timeout to avoid spamming
            setTimeout(() => {
              enemySprite.justAttacked = false;
            }, 450);
          } else {
            enemySprite.isAttacking = false;
          }
        }
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        document.querySelector("#displayText").innerText =
          `${enemySprite.name} Disconnected`;
      }
    }

    return () => {
      // Cleanup listeners when the component unmounts
      clearInterval(timerId);
      window.cancelAnimationFrame(animate);
      socket.disconnect();
    };
  }, [socket]); // Re-run the effect if the socket changes

  return (
    <section className="health">
      <div className="health__container-div">
        <HealthBar
          socket={socket}
          username={username}
          setShowSnackbar={setShowSnackbar}
          setFlashMessage={setFlashMessage}
          setFlashSuccess={setFlashSuccess}
        />
        <canvas ref={canvasRef}></canvas>
      </div>
    </section>
  );
};
