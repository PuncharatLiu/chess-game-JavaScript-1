import { initializeBoard } from "../board/initBoard.js";
import { getCurrentPosition } from "../position/position.js";
import { calculateAttackSquare } from "../rule/AttackSquare.js";

import { handleEngineResponse } from "../engine/handleEngineResponse.js";
import { playWithEngine, invertTurn } from "../move-control/piecesControl.js";
import { shortCastle, longCastle } from "../rule/castle.js";

initializeBoard();
getCurrentPosition();
calculateAttackSquare();

let best_move;
export function sendMoveToEngine(FEN, who) {
  fetch("http://localhost:5500/engine/move", {
    // send player move to stockfish to calculate the best move. then send back best move
    method: "POST",
    body: JSON.stringify({ data: FEN }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((bestMove) => {
      best_move = bestMove;

      if (playWithEngine && who === "player") {
        handleEngineResponse(best_move);
      }
    });
}

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
