import { pieces, blackPawnDefualtPosition, whitePawnDefualtPosition  } from "./pieces.js";

let overlapBlack = [];
let overlapWhite = [];

/* ==================================================================================================== */
/* ====================================== CREATE PIECES ================================================*/
/* ==================================================================================================== */

// create pieces
function renderPiece(piece){
    // get chess board Id
    const chessBoard = document.getElementById("chess-board");
    const chessPiece = document.createElement('div');
    
    // add class to element
    chessPiece.className = `chess-piece ${piece.color} ${piece.type}`;
    
    // set position
    chessPiece.style.transform = `translate(${piece.position.file * 100}px , ${piece.position.rank * 100}px)`;
    
    // set id
    chessPiece.id = i;
    chessPiece.addEventListener('click', handleClick);
    chessBoard.appendChild(chessPiece);
    i ++;
}

// setup board.
let i = 0;
function initializeBoard(){
    pieces.forEach(renderPiece);
}
initializeBoard();

/* ==================================================================================================== */
/* ====================================== CREATE PIECES ================================================*/
/* ==================================================================================================== */





// ==================================================================================================== //
// ======================================== VALIDATE SQUARE =========================================== //
// ==================================================================================================== //
function validSquare(){
    const chessBoard = document.getElementById('chess-board');
    
    // =============================== Rook move  =========================================== //
    if (getPieceId === '0' || getPieceId === '7' || getPieceId === '24' || getPieceId === '31') {
        horizontalVertical();
    }

    // ===================================== Night Move =========================================== // 
    else if (getPieceId === '1' || getPieceId === '6' || getPieceId === '25' || getPieceId === '30' ) {
        // knight move in fire and rank position
        const filePosition = [getFile - 1, getFile + 1, getFile - 1, getFile + 1, getFile - 2, getFile - 2, getFile + 2, getFile + 2];
        const rankPosition = [getRank + 2, getRank + 2, getRank - 2, getRank - 2, getRank + 1, getRank - 1, getRank + 1, getRank - 1];
        
        // create 7 square default if valid
        for (let i = 0; i <= 7; i++ ) {
            if ( ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'white') || ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'black' ) )  {
                continue;
            }
            createValidSquare(filePosition[i], rankPosition[i]);
        } 
    }

    // ======================================= Bishop move ========================================= // 
    else if (getPieceId === '2' || getPieceId === '5' || getPieceId === '26' || getPieceId === '29') {
        // create diagonal move
        diagonal();  
    }
   
    // ======================================== Queen move ========================================= //  
    else if (getPieceId === '3' || getPieceId === '27') {
        // create diagonal, horizontal and vertical move
        horizontalVertical();
        diagonal();
    }

    // ========================================= King move ========================================= // 
    else if (getPieceId === '4' || getPieceId === '28') {
        const filePosition = [getFile, getFile - 1, getFile + 1, getFile - 1, getFile + 1, getFile, getFile -1, getFile + 1];
        const rankPosition = [getRank - 1, getRank - 1, getRank - 1, getRank, getRank, getRank + 1, getRank + 1, getRank + 1];

        console.log("black pair", overlapBlack);
        for (let i = 0; i <= 7; i++) {
            if ( ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'white') || ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'black' ) )  {
                continue;
            }

            createValidSquare(filePosition[i], rankPosition[i]);
        }

    } 

    // ======================================= Pawn move =========================================== //
    else {
        // convert to number  
        getPieceId = parseInt(getPieceId);
        console.log("pawn ",getPieceId);
         // ================================= black pawn ======================================= // 
        if (getPieceId >= 8 && getPieceId <= 15 ) {
            let pawnRank = pieces[getPieceId].position.rank;
            console.log("black pawn go here ", pawnRank);


           
            // check if first move of black pawn
            if (pawnRank * 100 === 100) {
                // generate two valid square  
                for (let i = 1; i <= 2; i++) {
                    const filePosition = getFile;
                    const rankPosition = (getRank + i);

                    if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                        break;
                    }
                    createValidSquare(filePosition, rankPosition);
        
                }
            }
            
            // if not a first move, create one valid square
            else {
                console.log('secondaty ')
                const filePosition = getFile;
                const rankPosition = getRank + 1;

                if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                    return;
                }
                createValidSquare(filePosition, rankPosition);
    
            }
        }
         
         // ======================================= White pawn ======================================== // 
         else {
            let pawnRank = pieces[getPieceId].position.rank;
            console.log("pawn go here ", pawnRank);

            // check if first move of white pawn 
            if ( (pawnRank) * 100 === 600) {
               
                // create two valid square 
                for (let i = 1; i <= 2; i++) {
                    const filePosition = (getFile);
                    const rankPosition = (getRank - i);

                    if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                        break;
                    }
                    
                    createValidSquare(filePosition, rankPosition);
        
                }
            }

            // create one valid square 
            else {
                console.log("white secondary");
                const filePosition = getFile;
                const rankPosition = getRank - 1;

                if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                    return;
                }
                console.log("white pawn secondary");
                createValidSquare(filePosition, rankPosition);
            }
        }
    }

    // ================================ horizontal and vertical move ================================ //
    function horizontalVertical() {        
        // left move 
        for (let i = 1 ; i <= getFile; i++) {
            const filePosition = (getFile - i);
            const rankPosition = getRank;
            if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                break;
            }
            createValidSquare(filePosition, rankPosition);
        }
        // right move 
        for (let i = 1; i <= (7 - getFile); i++ ) {
            const filePosition = (getFile + i);
            const rankPosition = getRank;
            if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                break;
            }
            createValidSquare(filePosition, rankPosition);
        } 
        // up move
        for (let i = 1; i <= getRank; i++ ) {
            const filePosition = getFile;
            const rankPosition = (getRank - i);
            if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                break;
            }
            createValidSquare(filePosition, rankPosition);
        }
        // down move 
        for (let i = 1; i <= (7 - getRank); i++) {
            const filePosition = getFile;
            const rankPosition = (getRank + i);
            if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                break;
            }
            createValidSquare(filePosition, rankPosition);
        }
    
    }

    // ========================================== diagonal move ===================================== // 
    function diagonal() {
        const chessBoardSize = 8;

        // up left diagonal
        for (let i = 1; i <= getFile; i ++) {
            const filePosition = (getFile - i);
            const rankPosition = (getRank - i);
        
            if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                break;
            } 
            createValidSquare(filePosition, rankPosition);
            
            if ( 
                ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
                ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
                ) {
                break;
             }
        }
        // up right diagonal  
        for (let i = 1; i <= (7 - getFile); i++) {
            const filePosition = (getFile + i);
            const rankPosition = (getRank - i);
            
            if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                break;
            }
            createValidSquare(filePosition, rankPosition);

            if ( 
                ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
                ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
                ) {
                break;
             }
        }
        // down left diagonal
        for (let i = 1; i <= getFile; i++) {
            const filePosition = (getFile - i);
            const rankPosition = (getRank + i);
            console.log('left down bishop')
            if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                break;
            }
            createValidSquare(filePosition, rankPosition);

            if ( 
                ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
                ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
                ) {
                break;
             }
        }
       
        // down right diagonal
        for (let i = 1; i <= (7 - getFile); i++) {
            const filePosition = (getFile + i);
            const rankPosition = (getRank + i);
            if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) )  {
                break;
            }
            createValidSquare(filePosition, rankPosition); 
            
            if ( 
                ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
                ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
                ) {
                break;
             }
        }
    }

    
    // create valid move 
    function createValidSquare(filePosition, rankPosition) {
        getCurrentPosition();

        // check if valid square outside board 
        if ((filePosition * 100) > 700 || (filePosition * 100) < 0 || (rankPosition * 100) < 0 || (rankPosition * 100 ) > 700) {
            return;

        } 
        // create valid square
        else {
            const validMove = document.createElement('div');
            validMove.style.transform = `translate(${ filePosition * 100 }px, ${ rankPosition * 100 }px)`;
            validMove.className = 'valid-square';
            validMove.id = `${filePosition} ${rankPosition}`;
    
            validMove.addEventListener("click", function(event) {
                changePosition(event);
            });
        
            chessBoard.appendChild(validMove);
        }
    }
    
    startPosition = false;
}

function getCurrentPosition() {

    for (let i = 16; i <= 31; i++) {
        let pair = (pieces[i].position.file).toString() + (pieces[i].position.rank).toString();
        overlapWhite.push(pair);

    }

    for (let i = 0; i <= 15; i++) {
        let pair = (pieces[i].position.file).toString() + (pieces[i].position.rank).toString();
        overlapBlack.push(pair);
    }
}



// ==================================================================================================== //
// ======================================== VALIDATE SQUARE =========================================== //
// ==================================================================================================== //





// =================================================================================================== // 
// ===================================== PIECE MOVEMENT ============================================== //
// =================================================================================================== //

let getPieceId, getFile, getRank, getPiece;
let isSamePiece = "";
let startPosition = true;
let whitePiece = ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
let blackPiece = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
let turn = 'white'
let whiteOrBlack;

function handleClick(event){
    getPieceId = event.target.id;
    whiteOrBlack = event.target.classList.contains(turn);
    // when click same piece it unstate
    if (getPieceId === isSamePiece) {    
        removeValidMove();
        return;
    } 
    if (whiteOrBlack) {
        handlePlay();
    }
  
    // test
    console.log(getPieceId); 
    console.log('file ', getFile);
    console.log('rank ', getRank );

}

function handlePlay() {
    removeValidMove();
    getPieceId = event.target.id;
    getPiece = document.getElementById(getPieceId);
    // let selectedPiece = pieces[getPieceId];
    let selectedPiece = pieces[getPieceId];
            
    // get file and column 
    getFile = selectedPiece.position.file;
    getRank = selectedPiece.position.rank;

    // generate and calculate valid square
    validSquare();
    isSamePiece = getPieceId; 
}

function changePosition(){
    removeValidMove();
    
    let squareToGo = event.target;
    let getValidSquareID = squareToGo.id;
    console.log("id: ", getValidSquareID);
    let [filePart, rankPart] = getValidSquareID.split(" ");
    let getFilePosition = parseInt(filePart);
    let getRankPosition = parseInt(rankPart);
    let getPosition = squareToGo.style.transform;
    getPiece.style.transform = getPosition;
    
    changeDefualtPosition(getFilePosition, getRankPosition);

    turn === "white" ? turn = "black" : turn = "white";

    // test
    console.log("file and rank", getFilePosition, getRankPosition);
    console.log(squareToGo);

}

function removeValidMove() {
    // Remove existing highlighted squares
    const getValidSquare = document.querySelectorAll('.valid-square');
    console.log(getValidSquare);
    getValidSquare.forEach(function(div) {
        div.remove();
    });

    isSamePiece = "";
    startPosition = true;
}

function changeDefualtPosition(getFilePosition, getRankPosition) {
    pieces[getPieceId].position.file = getFilePosition;
    pieces[getPieceId].position.rank = getRankPosition;


    overlapWhite = [];
    overlapBlack = [];

    getCurrentPosition();
}

// =================================================================================================== // 
// ===================================== PIECE MOVEMENT ============================================== //
// =================================================================================================== // 