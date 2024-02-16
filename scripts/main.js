import { calculateAttackSquare } from "./AttackSquare.js";
import { generateFen } from "./generateFen.js";
import { pieces, isSelfPiece, isOpponentPiece, Is } from "./pieces.js";
import {overlapBlack, overlapWhite, changeDefualtPosition, getCurrentPosition} from "./position.js"
import { validSquare } from "./handleValidMove.js";
import { initializeBoard } from "./initBoard.js";
import { capture } from "./capture.js";
import KingEvent from "./handleKingEvent.js";
import { handleEngineResponse } from "./handleEngineResponse.js"; 
// import { isCheck } from "./handleKingEvent.js";

console.log("hi");

let best_move;
function sendMoveToEngine(FEN) {
    fetch('http://localhost:5500/engine/move', { // send player move to stockfish to calculate the best move. then send back best move
        method: 'POST',
        body: JSON.stringify({ data: FEN }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(bestMove => {
            console.log(bestMove);
            best_move = bestMove
            
            handleEngineResponse(best_move);
        })
        // .catch(error => console.error('Error here!!!!', error));
}

export function checkCastleEvenForEngine (best_move) {
    if (best_move.bestMove === "e8g8" || best_move.bestMove === "e1g1") {
        console.log("short true!!!!")
        shortCastle(invertTurn);
        return true;       
    } else if (best_move.bestMove === "e8c8" || best_move.bestMove === "e1c1") {
        console.log("long true!!!!")
        longCastle(invertTurn);
        return true;
    } else {
        return false;
    }
}