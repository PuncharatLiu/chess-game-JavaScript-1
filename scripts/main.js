import { calculateAttackSquare } from "./AttackSquare.js";
import { generateFen } from "./generateFen.js";
import { pieces, isSelfPiece, isOpponentPiece, Is } from "./pieces.js";
import {
  overlapBlack,
  overlapWhite,
  changeDefualtPosition,
  getCurrentPosition,
} from "./position.js";
import { validSquare } from "./handleValidMove.js";
import { initializeBoard } from "./initBoard.js";
import { capture } from "./capture.js";
import KingEvent from "./handleKingEvent.js";
import { handleEngineResponse } from "./handleEngineResponse.js";
import { playWithEngine } from "./piecesControl.js";
import { shortCastle, longCastle } from "./castle.js";
import { invertTurn } from "./piecesControl.js";
import PGN from "./PGN.js";
import Replay from "./game-control-panel/move-replay.js";

let best_move;
export function sendMoveToEngine(FEN, who) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5500/engine/move", {
      // send player move to stockfish to calculate the best move. then send back best move
      method: "POST",
      body: JSON.stringify({ data: FEN }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((bestMove) => {
        best_move = bestMove;

        if (best_move.bestMove === "(none)") {
          alert("Game over");
          resolve("checkmate");
        }

        if (playWithEngine && who === "player") {
          handleEngineResponse(best_move);
        }

        resolve(best_move);
      });
  });

  /*
  fetch("http://localhost:5500/engine/move", {
    // send player move to stockfish to calculate the best move. then send back best move
    method: "POST",
    body: JSON.stringify({ data: FEN }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((bestMove) => {
      best_move = bestMove;
      console.log(best_move.bestMove);

      if (best_move.bestMove === "(none)") {
        alert("Game over");
        console.log("Game over");
        resolve("checkmate");
      }

      if (playWithEngine && who === "player") {
        handleEngineResponse(best_move);
      }

      resolve(best_move);
    });
    
  // .catch(error => console.error('Error here!!!!', error));
  //
  */
}

/*
export async function sendMoveToEngine(FEN, who) {
  const pgn = new PGN();
  
  try {
    const response = await fetch("http://localhost:5500/engine/move", {
      method: "POST",
      body: JSON.stringify({ data: FEN }),
      headers: { "Content-Type": "application/json" },
    });

    const bestMove = await response.json();
    console.log(bestMove.bestMove);

    if (bestMove.bestMove === "(none)") {
      alert("Game over");
      console.log("Game over");
    }

    if (playWithEngine && who === "player") {
      handleEngineResponse(bestMove);
    }

    return bestMove; // Return the value to be used in the next step
  } catch (error) {
    console.error("Error in sendMoveToEngine:", error);
    throw error; // Propagate the error to the caller
  }
}
*/

export function checkCastleEvenForEngine(best_move) {
  if (best_move.bestMove === "e8g8" || best_move.bestMove === "e1g1") {
    console.log("short true!!!!");
    shortCastle(invertTurn);
    return true;
  } else if (best_move.bestMove === "e8c8" || best_move.bestMove === "e1c1") {
    console.log("long true!!!!");
    longCastle(invertTurn);
    return true;
  } else {
    return false;
  }
}
