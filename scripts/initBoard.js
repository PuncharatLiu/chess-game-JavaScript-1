import { getCurrentPosition } from "./position.js";
import { calculateAttackSquare } from "./AttackSquare.js";
import { pieces } from "./pieces.js";
import { handleClick } from "./main.js";

let i = 0;

initializeBoard();
getCurrentPosition();
calculateAttackSquare();

function renderPiece(piece){
    // get chess board Id
    const chessBoard = document.getElementById("chess-board");
    const chessPiece = document.createElement('div');
    
    // add class to element
    chessPiece.className = `chess-piece ${piece.color} ${piece.type}`;
    
    // set position
    chessPiece.style.transform = `translate(${piece.position.file * 100}px , ${piece.position.rank * 100}px)`;
    
    // set attribute as position
    let pieceAttribute = (piece.position.file).toString() + (piece.position.rank).toString();
    chessPiece.setAttribute("position", pieceAttribute);

    chessPiece.id = i;  // set id
    
    // set eventlistenner.
    chessPiece.addEventListener('click', handleClick);
    
    // add to wrap "chess-Board" 
    chessBoard.appendChild(chessPiece);
    
    i ++;
}

// setup board.
// let i = 0;
export function initializeBoard(){
    pieces.forEach(renderPiece);
}