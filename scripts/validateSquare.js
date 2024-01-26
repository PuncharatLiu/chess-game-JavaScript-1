// import { changePosition } from "./pieceMovement";

import { blackPawnDefualtPosition, pieces, whitePawnDefualtPosition } from "./pieces.js";

export function validSquare(getPieceId, getFile, getColumn, startPosition, changePosition){
   
    
    const chessBoard = document.getElementById('chess-board');

    // =============================== Black Rook valid move =============================== //
    if (getPieceId === '0' || getPieceId === '7' || getPieceId === '24' || getPieceId === '31') {
        horizontalVertical();
 
    } 
    // ===================================== Night Move =========================================== // 
    else if (getPieceId === '1' || getPieceId === '6' || getPieceId === '25' || getPieceId === '30' ) {
        const downLeftMove = `translate(${(getFile - 1) * 100}px, ${(getColumn + 2) * 100}px )`;
        const downRightMove = `translate(${(getFile + 1) * 100}px, ${(getColumn + 2) * 100}px )`;
        const upLeftMove = `translate(${(getFile - 1) * 100}px, ${(getColumn - 2) * 100}px )`;
        const upRightMove = `translate(${(getFile + 1) * 100}px, ${(getColumn - 2) * 100}px )`;
        const leftBottomMove = `translate(${(getFile - 2) * 100}px, ${(getColumn + 1) * 100}px )`;
        const leftUpperMove = `translate(${(getFile - 2) * 100}px, ${(getColumn - 1) * 100}px )`;
        const rightBottomMove = `translate(${(getFile + 2) * 100}px, ${(getColumn + 1) * 100}px )`;
        const rightUpperMove = `translate(${(getFile + 2) * 100}px, ${(getColumn - 1) * 100}px )`;

        const storeNightMove = [downLeftMove, downRightMove, upLeftMove, upRightMove, leftBottomMove, leftUpperMove, rightBottomMove, rightUpperMove]
        for (let i = 0; i <= 7; i++ ) {
            const validMove = document.createElement('div');

            validMove.style.transform = storeNightMove[i];
            validMove.className = 'chess-piece highlight';
            validMove.id = 'valid-move';
            validMove.addEventListener('click', function(event) {
                changePosition(event);
            });

            chessBoard.appendChild(validMove);

            // test 
            console.log('night valid move');
        } 
    } 

    // ======================================= Bishop move ========================================= // 
    else if (getPieceId === '2' || getPieceId === '5' || getPieceId === '26' || getPieceId === '29') {
        diagonal();  
    
    }
   
    // ======================================== Queen move ========================================= //  
    else if (getPieceId === '3' || getPieceId === '27') {
        horizontalVertical();
        diagonal();

    }

    // ========================================= King move ========================================= // 
    else if (getPieceId === '4' || getPieceId === '28') {
        const upMove = `translate(${(getFile) * 100}px, ${(getColumn - 1) * 100}px )`;
        const upLeftMove = `translate(${(getFile - 1) * 100}px, ${(getColumn - 1) * 100}px )`;
        const upRightMove = `translate(${(getFile + 1) * 100}px, ${(getColumn - 1) * 100}px )`;
        const leftMove = `translate(${(getFile - 1) * 100}px, ${getColumn * 100}px )`;
        const rightMove = `translate(${(getFile + 1) * 100}px, ${getColumn * 100}px )`;
        const downMove = `translate(${getFile * 100}px, ${(getColumn + 1) * 100}px )`;
        const downLeftMove = `translate(${(getFile - 1) * 100}px, ${(getColumn + 1) * 100}px )`;
        const downRightMove = `translate(${(getFile + 1) * 100}px, ${(getColumn + 1) * 100}px )`;

        const storeKingMove = [upMove, upLeftMove, upRightMove, leftMove, rightMove, downMove, downLeftMove, downRightMove];

        for (let i = 0; i <= 8; i++) {
            const validMove = document.createElement('div');
            
            validMove.style.transform = storeKingMove[i];
            validMove.className = 'chess-piece highlight';
            validMove.id = 'valid-move';
            validMove.addEventListener('click', function(event) {
                changePosition(event);
            });

            chessBoard.appendChild(validMove);

        }

    }

    else {
         getPieceId = parseInt(getPieceId, 10);
         
         // ================================= black pawn ======================================= // 
         if (getPieceId >= 8 && getPieceId <= 15 ) {
            const defaultRank = blackPawnDefualtPosition[getPieceId - (getPieceId - 1)].defaultPosition[0];
            const defaultFile = blackPawnDefualtPosition[getPieceId - (getPieceId - 1)].defaultPosition[1];
            const currentRank = pieces[getPieceId].position[0];
            const currentFile = pieces[getPieceId].position[1];  
            
            // check if first move of black pawn
            if ((defaultRank === currentRank) && (defaultFile === currentFile)) {
                // generate two valid square  
                for (let i = 1; i <= 2; i++) {
                    const validMove = document.createElement('div');

                    validMove.style.transform = `translate(${getFile * 100}px, ${(getColumn + i) * 100}px)`;
                    validMove.className = 'chess-piece highlight';
                    validMove.id = 'valid-move';
                    validMove.addEventListener('click', function(event) {
                        changePosition(event);
                    });
        
                    chessBoard.appendChild(validMove);
        
                }
            }

            // if not a first move, create one valid square
            else {
                const validMove = document.createElement('div');

                validMove.style.transform = `translate(${getFile * 100}px, ${(getColumn + 1) * 100}px)`;
                validMove.className = 'chess-piece highlight';
                validMove.id = 'valid-move';
                validMove.addEventListener('click', function(event) {
                    changePosition(event);
                });
    
                chessBoard.appendChild(validMove);
    
            }
         }
         
         // ======================================= White pawn ======================================== // 
         else {
            const defaultRank = whitePawnDefualtPosition[getPieceId - (getPieceId - 1)].defaultPosition[0];
            const defaultFile = whitePawnDefualtPosition[getPieceId - (getPieceId - 1)].defaultPosition[1];
            const currentRank = pieces[getPieceId].position[0];
            const currentFile = pieces[getPieceId].position[1];  

            // check if first move of white pawn 
            if ((defaultRank === currentRank) && (defaultFile === currentFile)) {
                
                // create two valid square 
                for (let i = 1; i <= 2; i++) {
                    const validMove = document.createElement('div');

                    validMove.style.transform = `translate(${getFile * 100}px, ${(getColumn - i) * 100}px)`;
                    validMove.className = 'chess-piece highlight';
                    validMove.id = 'valid-move';
                    validMove.addEventListener('click', function(event) {
                        changePosition(event);
                    });
        
                    chessBoard.appendChild(validMove);
        
                }
            }

            // create one valid square 
            else {
                const validMove = document.createElement('div');

                validMove.style.transform = `translate(${getFile * 100}px, ${(getColumn + 1) * 100}px)`;
                validMove.className = 'chess-piece highlight';
                validMove.id = 'valid-move';
                validMove.addEventListener('click', function(event) {
                    changePosition(event);
                });
    
                chessBoard.appendChild(validMove);
            }
         }
    }
    startPosition = false;

    // horizontal and vertical move
    function horizontalVertical() {

        // number of valid move
        let numberOfLeftMove = getFile - 1;
        let numberOfRightMove = getFile + 1;
        let numberOfUpMove = getColumn - 1;
        let numberOfDownMove = getColumn + 1;
        
        // left move 
        for (numberOfLeftMove ; numberOfLeftMove >= 0; numberOfLeftMove--) {
            const chessPiece = document.createElement('div');
            // move diretion of black rook
            chessPiece.style.transform = `translate(${(numberOfLeftMove) * 100}px, ${(getColumn) * 100}px)`;
            chessPiece.className = 'chess-piece highlight' ;
            chessPiece.id = "hint-move";
            chessPiece.addEventListener('click', function(event) {
                changePosition(event);
            });
            chessBoard.appendChild(chessPiece);
            
            console.log('create select ');
        }
        // right move 
        for (numberOfRightMove; numberOfRightMove <= 7; numberOfRightMove++ ) {
            const chessPiece = document.createElement('div');
    
            chessPiece.style.transform = `translate(${(numberOfRightMove) * 100}px, ${(getColumn) * 100}px)`;
            chessPiece.className = 'chess-piece highlight' ;
            chessPiece.id = "hint-move";
            chessPiece.addEventListener('click', function(event) {
                changePosition(event);
            });
            chessBoard.appendChild(chessPiece);
            
            console.log('create select ');
        } 
        // up move
        for (numberOfUpMove; numberOfUpMove >= 0; numberOfUpMove-- ) {
            const chessPiece = document.createElement('div');
    
            chessPiece.style.transform = `translate(${(getFile) * 100}px, ${(numberOfUpMove) * 100}px)`;
            chessPiece.className = 'chess-piece highlight' ;
            chessPiece.id = "hint-move";
            chessPiece.addEventListener('click', function(event) {
                changePosition(event);
            });
            chessBoard.appendChild(chessPiece);
            
            console.log('create select ');
        }
        // down move 
        for (numberOfDownMove; numberOfDownMove <= 7; numberOfDownMove++) {
            const chessPiece = document.createElement('div');
            
            chessPiece.style.transform = `translate(${(getFile) * 100}px, ${(numberOfDownMove) * 100}px)`;
            chessPiece.className = 'chess-piece highlight' ;
            chessPiece.id = "hint-move";
            chessPiece.addEventListener('click', function(event) {
                changePosition(event);
            });
    
            chessBoard.appendChild(chessPiece);
            
            console.log('create select ');
            // console.log(position);
        }
    
    }

    // diagonal move
    function diagonal() {

        // up left diagonal
        for (let i = 1; i <= getFile; i ++) {
            const validMove = document.createElement('div');
            
            validMove.style.transform = `translate(${ (getFile - i) * 100 }px, ${ (getColumn - i) * 100 }px)`;
            validMove.className = 'chess-piece highlight';
            validMove.id = 'valid-move';
    
            validMove.addEventListener('click', function(event) {
                changePosition(event);
            });
    
            chessBoard.appendChild(validMove);
    
            // test 
            console.log('bishop valid move');
        }
        // up right diagonal  
        for (let i = 1; i <= (7 - getFile); i++) {
            const validMove = document.createElement('div');
            
            validMove.style.transform = `translate(${ (getFile + i) * 100 }px, ${ (getColumn - i) * 100 }px)`;
            validMove.className = 'chess-piece highlight';
            validMove.id = 'valid-move';
    
            validMove.addEventListener('click', function(event) {
                changePosition(event);
            });
    
            chessBoard.appendChild(validMove);
    
            // test 
            console.log('bishop valid move');
        }
        // down left diagonal
        for (let i = 0; i <= getFile; i++) {
            const validMove = document.createElement('div');
    
            validMove.style.transform = `translate(${ (getFile - i) * 100 }px, ${ (getColumn + i) * 100 }px)`;
            validMove.className = 'chess-piece highlight';
            validMove.id = 'valid-move';
    
            validMove.addEventListener('click', function(event) {
                changePosition(event);
            });
    
            chessBoard.appendChild(validMove);
    
            // test 
            console.log('bishop valid move');
        }
        // down right diagonal
        for (let i = 0; i <= (7 - getFile); i++) {
            const validMove = document.createElement('div');
    
            validMove.style.transform = `translate(${ (getFile + i) * 100 }px, ${ (getColumn + i) * 100 }px)`;
            validMove.className = 'chess-piece highlight';
            validMove.id = 'valid-move';
    
            validMove.addEventListener('click', function(event) {
                changePosition(event);
            });
    
            chessBoard.appendChild(validMove);
    
            // test 
            console.log('bishop valid move');            
    
        }
    
    }
    


}
