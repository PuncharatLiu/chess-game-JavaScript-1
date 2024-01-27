// // import { blackPawnDefualtPosition, pieces, whitePawnDefualtPosition } from "./pieces.js";
// // import { changePosition } from "./pieceMovement.js";

// function validSquare(getPieceId, getFile, getRank, startPosition, changePosition){
//     const chessBoard = document.getElementById('chess-board');
    
//     // =============================== Rook move  =========================================== //
//     if (getPieceId === '0' || getPieceId === '7' || getPieceId === '24' || getPieceId === '31') {
//         horizontalVertical();
 
//     }

//     // ===================================== Night Move =========================================== // 
//     else if (getPieceId === '1' || getPieceId === '6' || getPieceId === '25' || getPieceId === '30' ) {
//         // knight move in fire and rank position
//         const rankPosition = [getFile - 1, getFile + 1, getFile - 1, getFile + 1, getFile - 2, getFile - 2, getFile + 2, getFile + 2];
//         const filePosition = [getRank + 2, getRank + 2, getRank - 2, getRank - 2, getRank + 1, getRank - 1, getRank + 1, getRank - 1];
        
//         // create 7 square default if valid
//         for (let i = 0; i <= 7; i++ ) {
//             createValidSquare(rankPosition[i], filePosition[i]);
//         } 
//     }

//     // ======================================= Bishop move ========================================= // 
//     else if (getPieceId === '2' || getPieceId === '5' || getPieceId === '26' || getPieceId === '29') {
//         // create diagonal move
//         diagonal();  
//     }
   
//     // ======================================== Queen move ========================================= //  
//     else if (getPieceId === '3' || getPieceId === '27') {
//         // create diagonal, horizontal and vertical move
//         horizontalVertical();
//         diagonal();
//     }

//     // ========================================= King move ========================================= // 
//     else if (getPieceId === '4' || getPieceId === '28') {
//         const rankPosition = [getFile, getFile - 1, getFile + 1, getFile - 1, getFile + 1, getFile, getFile -1, getFile + 1];
//         const filePosition = [getRank - 1, getRank - 1, getRank - 1, getRank, getRank, getRank + 1, getRank + 1, getRank + 1];

//         for (let i = 0; i <= 7; i++) {
//             createValidSquare(rankPosition[i], filePosition[i]);

//         }

//     }

//     // ======================================= Pawn move =========================================== //
//     else {
//         // convert to number  
//         getPieceId = parseInt(getPieceId, 10);
         
//          // ================================= black pawn ======================================= // 
//          if (getPieceId >= 8 && getPieceId <= 15 ) {
//             // get default position of black pawn
//             const defaultRank = blackPawnDefualtPosition[getPieceId - (getPieceId - 1)].defaultPosition[0];
//             const defaultFile = blackPawnDefualtPosition[getPieceId - (getPieceId - 1)].defaultPosition[1];
//             const currentRank = pieces[getPieceId].position[0];
//             const currentFile = pieces[getPieceId].position[1];  
            
//             // check if first move of black pawn
//             if ((defaultRank === currentRank) && (defaultFile === currentFile)) {
//                 // generate two valid square  
//                 for (let i = 1; i <= 2; i++) {
//                     const rankPosition = (getFile );
//                     const filePosition = (getRank + i);

//                     createValidSquare(rankPosition, filePosition);
        
//                 }
//             }

//             // if not a first move, create one valid square
//             else {
//                 const rankPosition = (getFile);
//                 const filePosition = (getRank + i);

//                 createValidSquare(rankPosition, filePosition);
    
//             }
//          }
         
//          // ======================================= White pawn ======================================== // 
//          else {
//             // get default position of white pawn
//             const defaultRank = whitePawnDefualtPosition[getPieceId - (getPieceId - 1)].defaultPosition[0];
//             const defaultFile = whitePawnDefualtPosition[getPieceId - (getPieceId - 1)].defaultPosition[1];
//             const currentRank = pieces[getPieceId].position[0];
//             const currentFile = pieces[getPieceId].position[1];  

//             // check if first move of white pawn 
//             if ((defaultRank === currentRank) && (defaultFile === currentFile)) {
                
//                 // create two valid square 
//                 for (let i = 1; i <= 2; i++) {
//                     const rankPosition = (getFile);
//                     const filePosition = (getRank - i);

//                     createValidSquare(rankPosition, filePosition);
        
//                 }
//             }

//             // create one valid square 
//             else {
//                 const rankPosition = (getFile);
//                 const filePosition = (getRank - i);

//                 createValidSquare(rankPosition, filePosition);
//             }
//         }

//         startPosition = false;
//     }

//     // ================================ horizontal and vertical move ================================ //
//     function horizontalVertical() {        
//         // left move 
//         for (let i = 1 ; i <= getFile; i++) {
//             const rankPosition = (getFile - i);
//             const filePosition = getRank;

//             createValidSquare(rankPosition, filePosition);
//         }
//         // right move 
//         for (let i = 1; i <= (7 - getFile); i++ ) {
//             const rankPosition = (getFile + i);
//             const filePosition = getRank;

//             createValidSquare(rankPosition, filePosition);
//         } 
//         // up move
//         for (let i = 1; i <= getRank; i++ ) {
//             const rankPosition = getFile;
//             const filePosition = (getRank - i);

//             createValidSquare(rankPosition, filePosition);
//         }
//         // down move 
//         for (let i = 1; i <= (7 - getRank); i++) {
//             const rankPosition = getFile;
//             const filePosition = (getRank + i);

//             createValidSquare(rankPosition, filePosition);
//         }
    
//     }

//     // ========================================== diagonal move ===================================== // 
//     function diagonal() {
//         const chessBoardSize = 8;

//         // up left diagonal
//         for (let i = 1; i <= getFile; i ++) {
//             const rankPosition = (getFile - i);
//             const filePosition = (getRank - i);

//             createValidSquare(rankPosition, filePosition);
//         }
//         // up right diagonal  
//         for (let i = 1; i <= (7 - getFile); i++) {
//             const rankPosition = (getFile + i);
//             const filePosition = (getRank - i);

//             createValidSquare(rankPosition, filePosition);
//         }
//         // down left diagonal
//         for (let i = 1; i <= getFile; i++) {
//             const rankPosition = (getFile - i);
//             const filePosition = (getRank + i);
//             console.log('left down bishop')
            
//             createValidSquare(rankPosition, filePosition);
            
//         }
       
//         // down right diagonal
//         for (let i = 1; i <= (7 - getFile); i++) {
//             const rankPosition = (getFile + i);
//             const filePosition = (getRank + i);

//             createValidSquare(rankPosition, filePosition);
                
//         }
        
    
//     }

//     // create valid move 
//     function createValidSquare(rankPosition, filePosition) {
//         // check if valid square outside board 
//         if ((rankPosition * 100) > 700 || (rankPosition * 100) < 0 || (filePosition * 100) < 0 || (filePosition * 100 ) > 700) {
//             return;

//         } 
//         // create valid square
//         else {
//             const validMove = document.createElement('div');
//             validMove.style.transform = `translate(${ rankPosition * 100 }px, ${ filePosition * 100 }px)`;
//             validMove.className = 'chess-piece highlight';
//             validMove.id = 'valid-move';
    
//             validMove.addEventListener("click", function(event) {
//                 changePosition(event);
//             });
        
//             chessBoard.appendChild(validMove);
//         }
//     }
// }