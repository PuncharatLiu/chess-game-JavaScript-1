// // impost pieces array object from pieces.js file.
// import { pieces } from './pieces.js';
// // import { handleClick } from './pieceMovement.js';

// // get chess board Id
// // const chessBoard = document.getElementById('chess-board');

// // create pieces
// function renderPiece(piece){
//     // get chess board Id
//     const chessBoard = document.getElementById('chess-board');
//     // const pieceID = ['br', 'bn', 'bb', 'bq', 'bk', 'bB', 'bN', 'bR', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wr', 'wn', 'wb', 'wq', 'wk', 'wB', 'wN', 'wR'];
//     const chessPiece = document.createElement('div');
    
//     // add class to element
//     chessPiece.className = `chess-piece ${piece.color} ${piece.type}`;
    
//     // set position
//     chessPiece.style.transform = `translate(${piece.position.x * 100}px , ${piece.position.y * 100}px)`;
    
//     // set id
//     chessPiece.id = i;

//     chessPiece.addEventListener('click', handleClick);

//     chessBoard.appendChild(chessPiece);
//     i ++;
// }

// // setup board.
// let i = 0;
// function initializeBoard(){
//     pieces.forEach(renderPiece);
// }
// initializeBoard();