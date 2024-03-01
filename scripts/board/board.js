import { pieces, handleClick } from "../modules/index.js";

// handleClick
let i = 0;
export function initializeBoard() {
  pieces.forEach(renderPiece);

  function renderPiece(piece) {
    // get chess board Id
    const chessBoard = document.getElementById("chess-board");
    const chessPiece = document.createElement("div");

    // add class to element
    chessPiece.className = `chess-piece ${piece.color} ${piece.type}`;

    // set position
    chessPiece.style.transform = `translate(${piece.position.file * 100}px , ${piece.position.rank * 100}px)`;

    // set attribute as position
    let pieceAttribute =
      piece.position.file.toString() + piece.position.rank.toString();
    chessPiece.setAttribute("position", pieceAttribute);

    chessPiece.id = i; // set id

    // set eventlistenner.        
    chessPiece.addEventListener("click", handleClick);  

    // add to wrap "chess-Board"
    chessBoard.appendChild(chessPiece);

    i++;
  }
}
