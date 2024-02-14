import { changePosition } from "./main.js";
import { enPassant } from "./enPassant.js";

// create valid move 
export function createValidSquare(filePosition, rankPosition, twoSquare, inEnState ,pawnId, clickedPiece) {
    const chessBoard = document.getElementById('chess-board');
    // check if valid square outside board 
    if ((filePosition * 100) > 700 || (filePosition * 100) < 0 || (rankPosition * 100) < 0 || (rankPosition * 100 ) > 700) {
        return;
    }

    // create valid square
    else {
        const validSquare = document.createElement('div'); 
        validSquare.style.transform = `translate(${ filePosition * 100 }px, ${ rankPosition * 100 }px)`;
        validSquare.className = 'valid-square';
        validSquare.id = `${filePosition} ${rankPosition}`;
        validSquare.addEventListener("click", function() {
            changePosition(twoSquare);
        });
        
        if (inEnState) {
            validSquare.addEventListener('click', function() {
                enPassant(pawnId);
            });
        }

        chessBoard.appendChild(validSquare);
    }
}