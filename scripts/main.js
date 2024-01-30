import { pieces } from "./pieces.js";

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
/* =========================== This function use to calculate valid square ============================ */
// ==================================================================================================== //

function validSquare(){
    getCurrentPosition();
    
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
        // all king move
        const filePosition = [getFile, getFile - 1, getFile + 1, getFile - 1, getFile + 1, getFile, getFile -1, getFile + 1];
        const rankPosition = [getRank - 1, getRank - 1, getRank - 1, getRank, getRank, getRank + 1, getRank + 1, getRank + 1];
        
        // check if beside king is empty
        let isEmptyWhiteRight = overlapWhite.includes( ( ( (getFile + 1).toString() + getRank.toString() ) && (getFile + 2).toString() + getRank.toString() ) );
        let isEmptyWhiteLeft = overlapWhite.includes( ( ( (getFile - 1).toString() + getRank.toString() ) && (getFile - 2).toString() + getRank.toString() && (getFile - 2).toString() + getRank.toString() ));
        let isEmptyBlackRight = overlapBlack.includes( ( ( (getFile + 1).toString() + getRank.toString() ) && (getFile + 2).toString() + getRank.toString() ) );
        let isEmptyBlackLeft = overlapBlack.includes( ( ( (getFile - 2).toString() + getRank.toString() ) && (getFile - 2).toString() + getRank.toString() && (getFile - 2).toString() + getRank.toString() ));
        
        if (!isEmptyWhiteRight && turn === 'white') {
            shortCastleSquare(getFile + 2, getRank);
            console.log('ready to short castle');
        } else if (!isEmptyWhiteLeft && turn === 'white') {
            longCastlesquare(getFile - 2, getRank);
            console.log('ready for long castle');
        } 

        if (!isEmptyBlackRight && turn === 'black') {
            shortCastleSquare(getFile + 2, getRank);
        } else if (!isEmptyBlackLeft && turn === 'black') {
            longCastlesquare(getFile - 2, getRank);
        }

        // calculate valid square
        for (let i = 0; i <= 7; i++) {
            // check if piece block the valid square
            if ( ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'white') || ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'black' ) )  {
                continue;
            }

            createValidSquare(filePosition[i], rankPosition[i]);
        }

    } 

    // ======================================= Pawn move =========================================== //
    else {
        // ================================= black pawn ======================================= // 
        if (getPieceId >= 8 && getPieceId <= 15 ) {
            let pawnRank = pieces[getPieceId].position.rank;

            // check if first move of black pawn
            if (pawnRank * 100 === 100) {
                // generate two valid square  
                for (let i = 1; i <= 2; i++) {
                    const filePosition = getFile;
                    const rankPosition = (getRank + i);

                    let blackPawnCaptueRightSquare = (getFile + 1).toString() + (getRank + 1).toString();
                    let blackPawnCaptueLeftSquare = (getFile - 1).toString() + (getRank + 1).toString();

                    if (overlapWhite.includes(blackPawnCaptueLeftSquare) && turn === 'black') {
                        createValidSquare(getFile - 1, getRank + 1);
                    } 
                    if (overlapWhite.includes(blackPawnCaptueRightSquare) && turn === 'black') {
                        createValidSquare(getFile + 1, getRank + 1);
                    }

                    if (( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') ||
                        ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black') ||
                        ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') ||
                        ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black')
                        )  
                        {
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

                let blackPawnCaptueRightSquare = (getFile + 1).toString() + (getRank + 1).toString();
                let blackPawnCaptueLeftSquare = (getFile - 1).toString() + (getRank + 1).toString();

                if (overlapWhite.includes(blackPawnCaptueLeftSquare) && turn === 'black') {
                    createValidSquare(getFile - 1, getRank + 1);
                } 
                if (overlapWhite.includes(blackPawnCaptueRightSquare) && turn === 'black') {
                    createValidSquare(getFile + 1, getRank + 1);
                }

                if (( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || 
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') ||
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black') 
                    )
                    {
                    return;
                }
                createValidSquare(filePosition, rankPosition);
    
            }
        }
         
         // ======================================= White pawn ======================================== // 
         else {
            let pawnRank = pieces[getPieceId].position.rank;

            // check if first move of white pawn 
            if ( (pawnRank) * 100 === 600) {
               
                // create two valid square 
                for (let i = 1; i <= 2; i++) {
                    const filePosition = (getFile);
                    const rankPosition = (getRank - i);

                    let whitePawnCaptueRightSquare = (getFile + 1).toString() + (getRank - 1).toString();
                    let whitePawnCaptueLeftSquare = (getFile - 1).toString() + (getRank - 1).toString();

                    if (overlapBlack.includes(whitePawnCaptueLeftSquare) && turn === 'white') {
                        createValidSquare(getFile - 1, getRank - 1);
                    } 
                    if (overlapBlack.includes(whitePawnCaptueRightSquare) && turn === 'white') {
                        createValidSquare(getFile + 1, getRank - 1);
                    }


                    if (( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') ||
                        ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black') ||
                        ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') ||
                        ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black')
                        )
                        {
                        break;
                    }
                    
                    createValidSquare(filePosition, rankPosition);
        
                }
            }

            // create one valid square 
            else {
                const filePosition = getFile;
                const rankPosition = getRank - 1;

                let whitePawnCaptueRightSquare = (getFile + 1).toString() + (getRank - 1).toString();
                let whitePawnCaptueLeftSquare = (getFile - 1).toString() + (getRank - 1).toString();

                if (overlapBlack.includes(whitePawnCaptueLeftSquare) && turn === 'white') {
                    createValidSquare(getFile - 1, getRank - 1);
                } 
                if (overlapBlack.includes(whitePawnCaptueRightSquare) && turn === 'white') {
                    createValidSquare(getFile + 1, getRank - 1);
                }

                if (( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || 
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') ||
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black') 
                    )
                    {
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

            if ( 
                ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'black' ) ||
                ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white' ) 
                ) {
                break;
             }
        }
        // right move 
        for (let i = 1; i <= (7 - getFile); i++ ) {
            const filePosition = (getFile + i);
            const rankPosition = getRank;
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
        // up move
        for (let i = 1; i <= getRank; i++ ) {
            const filePosition = getFile;
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
        // down move 
        for (let i = 1; i <= (7 - getRank); i++) {
            const filePosition = getFile;
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

    // ========================================== diagonal move ===================================== // 
    function diagonal() {
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

    // startPosition = false;
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





/**==================================================================================================== */
/**======================================= CREATE VALID SQUARE ======================================== */
/**==================================================================================================== */

// create valid move 
function createValidSquare(filePosition, rankPosition) {
    const chessBoard = document.getElementById('chess-board');
   
    getCurrentPosition();

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

        validSquare.addEventListener("click", function(event) {
            changePosition(event);
        });
    
        chessBoard.appendChild(validSquare);
    }
}

// create short castle square for black and white
function shortCastleSquare(filePosition, rankPosition) {
    const chessBoard = document.getElementById('chess-board');
    const validSquare = document.createElement('div');
    validSquare.style.transform = `translate(${ filePosition * 100 }px, ${ rankPosition * 100 }px)`;
    validSquare.className = 'valid-square';
    validSquare.id = `${filePosition} ${rankPosition}`;

    validSquare.addEventListener("click", function(event) {
        shortCastle(event);
    });
    
    chessBoard.appendChild(validSquare);
} 

function longCastlesquare(filePosition, rankPosition){
    const chessBoard = document.getElementById('chess-board');
    const validSquare = document.createElement('div');
    validSquare.style.transform = `translate(${ filePosition * 100 }px, ${ rankPosition * 100 }px)`;
    validSquare.className = 'valid-square';
    validSquare.id = `${filePosition} ${rankPosition}`;

    validSquare.addEventListener("click", function(event) {
        longCastle(event);
    });
    
    chessBoard.appendChild(validSquare);
}

// short castle for black and white
function shortCastle(){
    let getWhiteRook = document.getElementById("31"); // get white rook
    let getWhiteKing = document.getElementById("28"); // get white element
    
    let getBlackRook = document.getElementById("7"); // get black rook
    let getBlackKing = document.getElementById("4"); // get black king element
    
    if (turn === 'white') {
        getWhiteRook.style.transform = `translate(${500}px, ${700}px)`;
        getWhiteRook.setAttribute("position", "57");
        getWhiteKing.style.transform = `translate(${600}px, ${700}px)`;
        getWhiteKing.setAttribute("position", "67");
        pieces[31].position.file = 5;
        pieces[31].position.rank = 7;
        pieces[28].position.file = 6;
        pieces[28].position.rank = 7;
        getCurrentPosition();
        removeValidMove();
        turn = 'black';
        return;
    }
    if (turn === 'black') {
        getBlackRook.style.transform = `translate(${500}px, ${0}px)`;
        getBlackRook.setAttribute("position", "50");
        getBlackKing.style.transform = `translate(${600}px, ${0}px)`;
        getBlackKing.setAttribute("position", "60");
        pieces[7].position.file = 5;
        pieces[7].position.rank = 0;
        pieces[4].position.file = 6;
        pieces[4].position.rank = 0;
        getCurrentPosition();
        removeValidMove();
        turn = 'white';
        return;
    }
}

function longCastle(){
    let getWhiteRook = document.getElementById("24"); // get white rook
    let getWhiteKing = document.getElementById("28"); // get white element
    
    let getBlackRook = document.getElementById("0"); // get black rook
    let getBlackKing = document.getElementById("4"); // get black king element
    
    if (turn === 'white') {
        getWhiteRook.style.transform = `translate(${300}px, ${700}px)`;
        getWhiteRook.setAttribute("position", "37");
        getWhiteKing.style.transform = `translate(${200}px, ${700}px)`;
        getWhiteKing.setAttribute("position", "27");
        pieces[24].position.file = 3;
        pieces[24].position.rank = 7;
        pieces[28].position.file = 2;
        pieces[28].position.rank = 7;
        getCurrentPosition();
        removeValidMove();
        turn = 'black';
        return;
    }
    if (turn === 'black') {
        getBlackRook.style.transform = `translate(${300}px, ${0}px)`;
        getBlackRook.setAttribute("position", "30");
        getBlackKing.style.transform = `translate(${200}px, ${0}px)`;
        getBlackKing.setAttribute("position", "20");
        pieces[0].position.file = 3;
        pieces[0].position.rank = 0;
        pieces[4].position.file = 2;
        pieces[4].position.rank = 0;
        getCurrentPosition();
        removeValidMove();
        turn = 'white';
        return;
    }
}






// =================================================================================================== // 
// ===================================== PIECE MOVEMENT ============================================== //
// =================================================================================================== //

let getPieceId, getFile, getRank, getPiece, pieceIdBackup;
let isSamePiece = "";
let turn = 'white'
let playerTurn;

function handleClick(event){
    pieceIdBackup = event.target.id;
    playerTurn = event.target.classList.contains(turn);
    // when click same piece it unstate
    if (pieceIdBackup === isSamePiece) {    
        removeValidMove();
        return;
    } 
    if (playerTurn) {
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
    console.log('getPieceId ', getPieceId);
    
    // let selectedPiece = pieces[getPieceId];
    let selectedPiece = pieces[getPieceId];
            
    // get file and column 
    getFile = selectedPiece.position.file;
    getRank = selectedPiece.position.rank;
    // generate and calculate valid square
    validSquare();
    isSamePiece = getPieceId; 
}

let getValidSquareID;
function changePosition(){ 
    // get valid square element 
    let squareToGo = event.target;
    
    // get id
    getValidSquareID = squareToGo.id;
    
    // saparate file and rank
    let [filePart, rankPart] = getValidSquareID.split(" ");
    
    // convert to number
    let getFilePosition = parseInt(filePart);
    let getRankPosition = parseInt(rankPart);
    
    // change position
    let getPosition = squareToGo.style.transform;
    getPiece.style.transform = getPosition;

    // handle piece capture
    capture(getFilePosition, getRankPosition, filePart, rankPart);
    
     // remove valid square
     removeValidMove();
        
    // change player turn
    turn === "white" ? turn = "black" : turn = "white";

}

function removeValidMove() {
    // Remove existing highlighted squares
    const getValidSquare = document.querySelectorAll('.valid-square');
    
    // remove all valid square
    getValidSquare.forEach(function(div) {
        div.remove();
    });

    // set to default
    isSamePiece = "";
    // startPosition = true;
}

let take;
function changeDefualtPosition(getFilePosition, getRankPosition, /*pieceAttribute*/ filePart, rankPart, squareToGo) {
    pieces[getPieceId].position.file = getFilePosition;
    pieces[getPieceId].position.rank = getRankPosition;

    let getPieceElement = document.getElementById(getPieceId);
    getPieceElement.setAttribute("position", filePart+rankPart);

    overlapWhite = [];
    overlapBlack = [];

    getCurrentPosition();
    

   
    console.log("overlapblack", overlapBlack);
    console.log("overlapwhite", overlapWhite);
    
}

/* ==================================================================================================== */
/* ============================================= PIECE CAPTURE ======================================== */
/* ==================================================================================================== */

function capture(getFilePosition, getRankPosition, filePart, rankPart) {



    let storeFR = filePart + rankPart;
    console.log("storeFR", storeFR);
    if (turn === 'white') {
        if ( overlapBlack.includes(storeFR) ) {
            let getEnemyPosition = document.querySelector(`[position="${filePart}${rankPart}"]`);
            let getEnemyId = getEnemyPosition.id;
            
            let getEnemyElement = document.getElementById(getEnemyId);
            getEnemyElement.setAttribute("position", "taken");

            console.log('enemy id', getEnemyId);
            console.log('getEnemyPosition', getEnemyPosition);

            if (getEnemyPosition) {
                getEnemyPosition.style.transform = `translate(${filePart * -1000}px, ${rankPart * -1000}px)`;
                
                pieces[getEnemyId].position.file = -1000;
                pieces[getEnemyId].position.rank = -1000;
                changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart);

                take = true;

                console.log('being capture from white');
            }
        }
    } else {
        if ( overlapWhite.includes(storeFR) ) {
            let getEnemyPosition = document.querySelector(`[position="${filePart}${rankPart}"]`);
            let getEnemyId = getEnemyPosition.id;

            let getEnemyElement = document.getElementById(getEnemyId);
            getEnemyElement.setAttribute("position", "taken");

            console.log('enemy id', getEnemyId);
            console.log('getEnemyPosition', getEnemyPosition);
            
            if (getEnemyPosition) {
                getEnemyPosition.style.transform = `translate(${filePart * -1000}px, ${rankPart * -1000}px)`;
                
                pieces[getEnemyId].position.file = -1000;
                pieces[getEnemyId].position.rank = -1000;
                changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart);

                take = true;

                console.log('being capture from black');
            }
        }
    }

    changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart);
}




