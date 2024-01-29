// // ==================================================================================================== //
// // ======================================== VALIDATE SQUARE =========================================== //
// /* =========================== This function use to calculate valid square ============================ */
// // ==================================================================================================== //

// function validSquare(){
//     // get board wrap
//     // const chessBoard = document.getElementById('chess-board');
    
//     // =============================== Rook move  =========================================== //
//     if (getPieceId === '0' || getPieceId === '7' || getPieceId === '24' || getPieceId === '31') {
//         horizontalVertical();
//     }

//     // ===================================== Night Move =========================================== // 
//     else if (getPieceId === '1' || getPieceId === '6' || getPieceId === '25' || getPieceId === '30' ) {
//         // knight move in fire and rank position
//         const filePosition = [getFile - 1, getFile + 1, getFile - 1, getFile + 1, getFile - 2, getFile - 2, getFile + 2, getFile + 2];
//         const rankPosition = [getRank + 2, getRank + 2, getRank - 2, getRank - 2, getRank + 1, getRank - 1, getRank + 1, getRank - 1];
        
//         // create 7 square default if valid
//         for (let i = 0; i <= 7; i++ ) {
//             if ( ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'white') || ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'black' ) )  {
//                 continue;
//             }
//             createValidSquare(filePosition[i], rankPosition[i]);
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
//         const filePosition = [getFile, getFile - 1, getFile + 1, getFile - 1, getFile + 1, getFile, getFile -1, getFile + 1];
//         const rankPosition = [getRank - 1, getRank - 1, getRank - 1, getRank, getRank, getRank + 1, getRank + 1, getRank + 1];

//         console.log("black pair", overlapBlack);
//         for (let i = 0; i <= 7; i++) {
//             if ( ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'white') || ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'black' ) )  {
//                 continue;
//             }

//             createValidSquare(filePosition[i], rankPosition[i]);
//         }

//     } 

//     // ======================================= Pawn move =========================================== //
//     else {
//         // convert to number  
//         // getPieceId = parseInt(getPieceId);
         
//         // ================================= black pawn ======================================= // 
//         if (getPieceId >= 8 && getPieceId <= 15 ) {
//             let pawnRank = pieces[getPieceId].position.rank;
//             console.log("black pawn go here ", pawnRank);


           
//             // check if first move of black pawn
//             if (pawnRank * 100 === 100) {
//                 // generate two valid square  
//                 for (let i = 1; i <= 2; i++) {
//                     const filePosition = getFile;
//                     const rankPosition = (getRank + i);

//                     if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                         break;
//                     }
//                     createValidSquare(filePosition, rankPosition);
        
//                 }
//             }
            
//             // if not a first move, create one valid square
//             else {
//                 console.log('secondaty ')
//                 const filePosition = getFile;
//                 const rankPosition = getRank + 1;

//                 if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                     return;
//                 }
//                 createValidSquare(filePosition, rankPosition);
    
//             }
//         }
         
//          // ======================================= White pawn ======================================== // 
//          else {
//             let pawnRank = pieces[getPieceId].position.rank;
//             console.log("pawn go here ", pawnRank);

//             // check if first move of white pawn 
//             if ( (pawnRank) * 100 === 600) {
               
//                 // create two valid square 
//                 for (let i = 1; i <= 2; i++) {
//                     const filePosition = (getFile);
//                     const rankPosition = (getRank - i);

//                     if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                         break;
//                     }
                    
//                     createValidSquare(filePosition, rankPosition);
        
//                 }
//             }

//             // create one valid square 
//             else {
//                 console.log("white secondary");
//                 const filePosition = getFile;
//                 const rankPosition = getRank - 1;

//                 if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                     return;
//                 }
//                 console.log("white pawn secondary");
//                 createValidSquare(filePosition, rankPosition);
//             }
//         }
//     }

//     // ================================ horizontal and vertical move ================================ //
//     function horizontalVertical() {        
//         // left move 
//         for (let i = 1 ; i <= getFile; i++) {
//             const filePosition = (getFile - i);
//             const rankPosition = getRank;
//             if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                 break;
//             }
//             createValidSquare(filePosition, rankPosition);
//         }
//         // right move 
//         for (let i = 1; i <= (7 - getFile); i++ ) {
//             const filePosition = (getFile + i);
//             const rankPosition = getRank;
//             if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                 break;
//             }
//             createValidSquare(filePosition, rankPosition);
//         } 
//         // up move
//         for (let i = 1; i <= getRank; i++ ) {
//             const filePosition = getFile;
//             const rankPosition = (getRank - i);
//             if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                 break;
//             }
//             createValidSquare(filePosition, rankPosition);
//         }
//         // down move 
//         for (let i = 1; i <= (7 - getRank); i++) {
//             const filePosition = getFile;
//             const rankPosition = (getRank + i);
//             if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                 break;
//             }
//             createValidSquare(filePosition, rankPosition);
//         }
    
//     }

//     // ========================================== diagonal move ===================================== // 
//     function diagonal() {
//         // up left diagonal
//         for (let i = 1; i <= getFile; i ++) {
//             const filePosition = (getFile - i);
//             const rankPosition = (getRank - i);
        
//             if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                 break;
//             } 
//             createValidSquare(filePosition, rankPosition);
            
//             if ( 
//                 ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
//                 ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
//                 ) {
//                 break;
//              }
//         }
//         // up right diagonal  
//         for (let i = 1; i <= (7 - getFile); i++) {
//             const filePosition = (getFile + i);
//             const rankPosition = (getRank - i);
            
//             if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                 break;
//             }
//             createValidSquare(filePosition, rankPosition);

//             if ( 
//                 ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
//                 ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
//                 ) {
//                 break;
//              }
//         }
//         // down left diagonal
//         for (let i = 1; i <= getFile; i++) {
//             const filePosition = (getFile - i);
//             const rankPosition = (getRank + i);
//             console.log('left down bishop')
//             if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                 break;
//             }
//             createValidSquare(filePosition, rankPosition);

//             if ( 
//                 ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
//                 ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
//                 ) {
//                 break;
//              }
//         }
       
//         // down right diagonal
//         for (let i = 1; i <= (7 - getFile); i++) {
//             const filePosition = (getFile + i);
//             const rankPosition = (getRank + i);
//             if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
//                 break;
//             }
//             createValidSquare(filePosition, rankPosition); 
            
//             if ( 
//                 ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
//                 ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
//                 ) {
//                 break;
//              }
//         }
//     }

//     startPosition = false;
// }