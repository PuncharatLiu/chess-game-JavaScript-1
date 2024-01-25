// import * as pieceMovement from "./pieceMovement.js"

// export function validSquare(){
//     // Black Rook valid move  
//     if (getPieceId === 0 || getPieceId === 7 ) {
//         const chessBoard = document.getElementById('chess-board');
//         let numberOfLeftMove = getFile - 1;
//         let numberOfRightMove = getFile - 7;
//         let numberOfUpMove = getColumn;
//         let numberOfDownMove = getColumn - 7;
//         // left move 
//         for (numberOfLeftMove ; numberOfLeftMove >= 0; numberOfLeftMove--) {
//             const chessPiece = document.createElement('div');
//             // move diretion of black rook
//             let moveLeft = chessPiece.style.transform;
//             moveLeft = `translate(${(getFile) * 100}px, ${(getColumn) * 100}px)`;
//             chessPiece.className = 'highlight';
//             chessBoard.appendChild(chessPiece);
            
//             console.log('create select ');
//         }
//     }
// }