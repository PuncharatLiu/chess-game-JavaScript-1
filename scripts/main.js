import { calculateAttackSquare } from "./AttackSquare.js";
import { generateFen } from "./generateFen.js";
import { pieces } from "./pieces.js";
import { getAttackDirectionFromObject, isAttackSquare, whatEventOccur } from "./check.js";

let overlapBlack = [];
let overlapWhite = [];
let isWhiteEnPassant = false;
let take = false;
let en;    
let pawnMove = false;

getCurrentPosition();
calculateAttackSquare();
getAttackDirectionFromObject();

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

// ==================================================================================================== //
// ======================================== VALIDATE SQUARE =========================================== //
/* =========================== This function use to calculate valid square ============================ */
// ==================================================================================================== //
let _clickedPiece 
export function validSquare(fromPieceId){
    // getCurrentPosition();

    _clickedPiece = event?.target;

    function rook() { // white and black rook
        return (
            getPieceId === '0' || getPieceId === '7' || getPieceId === '24' || getPieceId === '31' ||
            fromPieceId === '0' || fromPieceId === "7" || fromPieceId === "24" || fromPieceId === "31"
        );
    }

    function knight() {
        return (
            getPieceId === '1' || getPieceId === '6' || getPieceId === '25' || getPieceId === '30' ||
            fromPieceId === "1" || fromPieceId === "6" ||  fromPieceId === "25" || fromPieceId === "30"
        );
    }

    function bishop() {
        return (
            getPieceId === '2' || getPieceId === '5' || getPieceId === '26' || getPieceId === '29' ||
            fromPieceId === "2" || fromPieceId === "5" || fromPieceId === "26" || fromPieceId === "29"
        );
    }

    function queen() {
        return (
            getPieceId === '3' || getPieceId === '27' ||
            fromPieceId === "3" || fromPieceId === "27"
        );
    }

    function king() {
        return (
            getPieceId === '4' || getPieceId === '28' ||
            fromPieceId === "4" || fromPieceId === "28"
        );
    }

    function blackPawn() {
        return (
            (getPieceId >= 8 && getPieceId <= 15) || (parseInt(fromPieceId) >= 8 && parseInt(fromPieceId) <= 15)
        );
    }

    // =============================== Rook move  =========================================== //
    if (rook(fromPieceId)) {
        horizontalVertical();
    }

    // ===================================== Night Move =========================================== // 
    else if (knight(fromPieceId)) {
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
    else if (bishop(fromPieceId)) {
        // create diagonal move
        diagonal();  
    }
   
    // ======================================== Queen move ========================================= //  
    else if (queen(fromPieceId)) {
        // create diagonal, horizontal and vertical move
        horizontalVertical();
        diagonal();
    }

    // ========================================= King move ========================================= // 
    else if (king(fromPieceId)) {
        // all king move
        const filePosition = [getFile, getFile - 1, getFile + 1, getFile - 1, getFile + 1, getFile, getFile -1, getFile + 1];
        const rankPosition = [getRank - 1, getRank - 1, getRank - 1, getRank, getRank, getRank + 1, getRank + 1, getRank + 1];
        
        

        // check if beside king is empty
        let isEmptyWhiteRight = overlapWhite.includes( ( ( (getFile + 1).toString() + getRank.toString() ) && (getFile + 2).toString() + getRank.toString() ) );
        let isEmptyWhiteLeft = overlapWhite.includes( ( ( (getFile - 1).toString() + getRank.toString() ) && (getFile - 2).toString() + getRank.toString() && (getFile - 2).toString() + getRank.toString() ));
        let isEmptyBlackRight = overlapBlack.includes( ( ( (getFile + 1).toString() + getRank.toString() ) && (getFile + 2).toString() + getRank.toString() ) );
        let isEmptyBlackLeft = overlapBlack.includes( ( ( (getFile - 2).toString() + getRank.toString() ) && (getFile - 2).toString() + getRank.toString() && (getFile - 2).toString() + getRank.toString() ));
        
        if (!isEmptyWhiteRight && turn === 'white' && !isWhiteCastle) 
        {
            shortCastleSquare(getFile + 2, getRank);
        } 
        else if (!isEmptyWhiteLeft && turn === 'white' && !isWhiteCastle) 
        {
            longCastlesquare(getFile - 2, getRank);
        } 

        if (!isEmptyBlackRight && turn === 'black' && !isBlackCastle) 
        {
            shortCastleSquare(getFile + 2, getRank);
        } 
        else if (!isEmptyBlackLeft && turn === 'black' && !isBlackCastle) 
        {
            longCastlesquare(getFile - 2, getRank);
        }

        // calculate valid square
        for (let i = 0; i <= 7; i++) 
        {
            if // check if piece block the valid square
            ( 
                ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'white') ||
                ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'black' ) 
            )  
            {
                continue;
            }

            
            
            createValidSquare(filePosition[i], rankPosition[i], undefined, undefined, undefined, "king");
        }

    } 

    // ======================================= Pawn move =========================================== //
    else {
        // ================================= black pawn ======================================= // 
        if (blackPawn(fromPieceId)) {
            let pawnRank = pieces[getPieceId].position.rank;
            // let pawnRank_fromEngine = pieces[fromPieceId].position.rank;

            // check if first move of black pawn
            if (pawnRank * 100 === 100 || pieces[fromPieceId]?.position.rank * 100 === 100) {
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
                    
                    if (i === 1){
                        createValidSquare(filePosition, rankPosition);
                        pawnMove = true;    
                    } 
                    
                    else if (i === 2) {
                        createValidSquare(filePosition, rankPosition, true);
                        pawnMove = true;
                    }
                }
            }
            
            // if not a first move, create one valid square
            else {
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
                enPassantState();
                pawnMove = true;
    
            }
        }
         
         // ======================================= White pawn ======================================== // 
         else {
            let pawnRank = pieces[getPieceId].position.rank;

            // console.log("from piece id ", fromPieceId);


            // check if first move of white pawn 
            if ( pawnRank * 100 === 600 || pieces[fromPieceId]?.position.rank * 100 === 600) {
               
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
                    
                    if (i === 1){
                        createValidSquare(filePosition, rankPosition);   
                        pawnMove = true; 
                    } 
                    
                    else if (i === 2) {
                        createValidSquare(filePosition, rankPosition, true);
                        pawnMove = true;
                        
                    }
                    
        
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
                createValidSquare(filePosition, rankPosition);
                enPassantState();
                pawnMove = true;
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
}

export function getCurrentPosition() {

    for (let i = 16; i <= 31; i++) {
        let pair = (pieces[i].position.file).toString() + (pieces[i].position.rank).toString();
        overlapWhite.push(pair);
    }

    for (let i = 0; i <= 15; i++) {
        let pair = (pieces[i].position.file).toString() + (pieces[i].position.rank).toString();
        overlapBlack.push(pair);
    }

}

let isEnPassant = false;
function enPassantState(twoSquare){
    if (!isEnPassant) {
        if (getPieceId >= 16 && getPieceId <= 23 && getRank === 3) {
            const leftBPiece = document.querySelector(`[position="${getFile - 1}${getRank}"]`);
            const rightBPiece = document.querySelector(`[position="${getFile + 1}${getRank}"]`);
            
            const isLeftBPawn = leftBPiece?.classList.contains('black', 'pawn');
            const isRightBPawn = leftBPiece?.classList.contains('black', 'pawn');
            const isTwLpawn = leftBPiece?.hasAttribute('tw');
            const isTwRpawn = rightBPiece?.hasAttribute('tw');
            const lPawnId = leftBPiece?.id;
            const rPawnId = rightBPiece?.id; 

            if (isLeftBPawn && isTwLpawn) {
                console.log('get In twl', getFile, getRank);
                createValidSquare(getFile - 1, getRank - 1, undefined, true, lPawnId);
                en = `${getFile - 1}${getRank - 1}`;
            }
            if (isRightBPawn && isTwRpawn) {
                createValidSquare(getFile + 1, getRank - 1, undefined, true, rPawnId);
                en = `${getFile + 1}${getRank - 1}`;
            }
        }
        else if (getPieceId >= 8 && getPieceId <= 15 && getRank === 4) {
            const leftWPiece = document.querySelector(`[position="${getFile - 1}${getRank}"]`);
            const rightWPiece = document.querySelector(`[position="${getFile + 1}${getRank}"]`);
            
            const isLeftWPawn = leftWPiece?.classList.contains('white', 'pawn');
            const isRightWPawn = leftWPiece?.classList.contains('white', 'pawn');
            const isTwLpawn = leftWPiece?.hasAttribute('tw');
            const isTwRpawn = rightWPiece?.hasAttribute('tw');
            const lPawnId = leftWPiece?.id;
            const rPawnId = rightWPiece?.id;

            if (isLeftWPawn && isTwLpawn) {
                createValidSquare(getFile - 1, getRank + 1, undefined, true, lPawnId);
                en = `${getFile - 1}${getRank + 1}`; 
            } 
            if (isRightWPawn && isTwRpawn) {
                createValidSquare(getFile + 1, getRank + 1, undefined, true, rPawnId);
                en = `${getFile + 1}${getRank + 1}`;
            }
        }
    }
}

function enPassant(pawnId) {
    const getPawnEle = document.getElementById(pawnId);
    getPawnEle.style.transform = `translate(${-1000}px, ${-1000}px)`;
    getPawnEle.setAttribute('position', 'taken');
    
    if (getPawnEle.classList.contains('black', 'pawn')) {
        pieces[getPieceId].position.rank = (pieces[pawnId].position.rank) - 1;     
    } else {
        pieces[getPieceId].position.rank = (pieces[pawnId].position.rank) + 1;     
    }
    
    pieces[getPieceId].position.file = pieces[pawnId].position.file;
    pieces[pawnId].position.file = -100;
    pieces[pawnId].position.rank = -100;
    

    console.log('piece', pieces);

    changeDefualtPosition();
    getCurrentPosition();

    isEnPassant = true;
    
}

/**==================================================================================================== */
/**======================================= CREATE VALID SQUARE ======================================== */
/**==================================================================================================== */
let occurEvent, atDirection, pinedPiece;
import { pin, captureAttackedPiece } from "./check.js";

// create valid move 
function createValidSquare(filePosition, rankPosition, twoSquare, inEnState ,pawnId, clickedPiece) {
    const chessBoard = document.getElementById('chess-board');

    if (occurEvent === "check" && atDirection.includes((filePosition.toString() + rankPosition.toString() ).toString() ) && clickedPiece === "king"){
        console.log("ckeck occur");
        return;
    }
    else if (occurEvent === "check" && clickedPiece === undefined && (!atDirection.includes((filePosition.toString() + rankPosition.toString())))) {
        console.log("protect the king!");
        if (!captureAttackedPiece()){
            return;    
        }
        // return;
    }
    else if (occurEvent === "check with pawn or knight" && clickedPiece === undefined){
        console.log("check with pawn or knight");
        return;
    } 
    
    else if (occurEvent === "pin" && _clickedPiece === pinedPiece && !pin(filePosition, rankPosition, atDirection)) {
        return;
    }

    if(isAttackSquare(filePosition, rankPosition, occurEvent, whatEventOccur()?.activeDirection) && clickedPiece === "king") { 
        return; 
    }

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

let isWhiteCastle = false;
let isBlackCastle = false;
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
    let getWhiteRook = document.getElementById("31"); // get white rook element
    let getWhiteKing = document.getElementById("28"); // get white element
    
    let getBlackRook = document.getElementById("7"); // get black rook elment
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
        isWhiteCastle = true;
        overlapWhite = [];
        overlapBlack = [];
        getCurrentPosition();
        removeValidMove();
        if (playWithEngine){
            if (playerSide()) {
                console.log('####################');
                generateFen(4, 7, 6, 7, 'white', isWhiteCastle);
                sendMoveToEngine( generateFen(7, 7, 5, 7, 'white', isWhiteCastle));
            } else {
                generateFen(4, 7, 6, 7, 'white', isWhiteCastle);
                generateFen(7, 7, 5, 7, 'white', isWhiteCastle);
            }
        }
        turn = 'black';
        console.log('rook castle', overlapWhite)
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
        isBlackCastle = true;
        overlapBlack = [];
        overlapBlack = [];
        getCurrentPosition();
        removeValidMove();
        if (playWithEngine){
            if (playerSide()) {
                generateFen(4, 0, 6, 0, 'black', isBlackCastle);
                sendMoveToEngine(generateFen(7, 0, 5, 0, 'black', isBlackCastle));
            } else {
                generateFen(4, 0, 6, 0, 'black', isBlackCastle);
                generateFen(7, 0, 5, 0, 'black', isBlackCastle);
            }
        }
        turn = 'white';
        console.log('rook castle', overlapBlack)
        return;
    }
}

function longCastle(){
    let getWhiteRook = document.getElementById("24"); // get white rook element
    let getWhiteKing = document.getElementById("28"); // get white king element
    
    let getBlackRook = document.getElementById("0"); // get black rook element
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
        isWhiteCastle = true;
        getCurrentPosition();
        removeValidMove();
        generateFen(4, 7, 2, 7, 'black', isWhiteCastle);
        generateFen(0, 7, 3, 7, 'black', isWhiteCastle);
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
        isBlackCastle = true;
        getCurrentPosition();
        removeValidMove();
        generateFen(4, 0, 2, 0, 'white', isBlackCastle);
        generateFen(0, 0, 3, 0, 'white', isBlackCastle);
        turn = 'white';
        return;
    }
    
    getCurrentPosition();
}

// =================================================================================================== // 
// ===================================== PIECE MOVEMENT ============================================== //
// =================================================================================================== //
import { handleEnPosition } from "./enPassant.js";

export let getPieceId;
export let getFile;
export let getRank
let getPiece, pieceIdBackup;
let isSamePiece = "";
let turn = 'white';
let playerTurn;
let invertTurn;
invertTurn = turn === 'white' ? invertTurn = 'black' : invertTurn = 'white'; 
let storeFR;
let playWithEngine = false;
function playerSide() {
    return turn === 'white';
}

export function handleClick(event, squareToGoFromEngine){
    if (playWithEngine){
        if (playerSide()) {
            pieceIdBackup = event.target.id;
            playerTurn = event.target.classList.contains(turn);
        } else {
            pieceIdBackup = event.id;
            playerTurn = event.classList.contains(turn);
        }
    } else { // controll for white and black
        pieceIdBackup = event.target.id;
        playerTurn = event.target.classList.contains(turn);

    }

    // when click same piece it unstate
    if (pieceIdBackup === isSamePiece) {    
        removeValidMove();
        return;
    } 
    if (playerTurn) {
        handlePlay(event, squareToGoFromEngine);
    }
}

function handlePlay(event, squareToGoFromEngine) {
    removeValidMove();
    if (playWithEngine){
        if (playerSide()) {
            getPieceId = event.target.id;
        } else {
            getPieceId = event.id;
        }
    } else {
        getPieceId = event.target.id;

    }

    getPiece = document.getElementById(getPieceId);
    
    // let selectedPiece = pieces[getPieceId];
    let selectedPiece = pieces[getPieceId];
            
    // get file and column 
    getFile = selectedPiece.position.file;
    getRank = selectedPiece.position.rank;
    // generate and calculate valid square
    validSquare();
    
    isSamePiece = getPieceId; 

    if (playWithEngine) {
        if (!playerSide()) {
            changePosition(undefined, squareToGoFromEngine);
        }
    }
}

let getValidSquareID;
export let getFilePosition;
export let getRankPosition;
function changePosition(twoSquare, squareToGoFromEngine)
{ 
    let squareToGo, getPosition, getSquareToGoFromEngine;

    if (playWithEngine) {
        if (playerSide()) {
            squareToGo = event.target; // get valid square element    
            getValidSquareID = squareToGo.id; 

        } else {
            getSquareToGoFromEngine = document.getElementById(`${squareToGoFromEngine[0]} ${squareToGoFromEngine[1]}`);
            getValidSquareID = getSquareToGoFromEngine.id;
            
        }
    } else {
        squareToGo = event.target; // get valid square element    
        getValidSquareID = squareToGo.id; 

    }
        
    let [filePart, rankPart] = getValidSquareID.split(" "); // saparate file and rank
    getFilePosition = parseInt(filePart); // convert to number
    getRankPosition = parseInt(rankPart);
        
    // change position
    if (playWithEngine){
        if (playerSide()) 
        {
            getPosition = squareToGo.style.transform;
        } else 
        {
            getPosition = getSquareToGoFromEngine.style.transform;
        }
    } else {
        getPosition = squareToGo.style.transform;

    }
    
    getPiece.style.transform = getPosition;

    // when move delete 'tw'
    const getAllPawn = document.querySelectorAll('[tw]');
    getAllPawn.forEach(element => {
        element.removeAttribute('tw');
    });

    // mark that tw
    if (twoSquare) { getPiece.setAttribute("tw", "tw"); } 
    
    // handle piece capture
    capture(getFilePosition, getRankPosition, filePart, rankPart);
    
    removeValidMove(); // remove valid square
 

    let keepTurn = turn
    turn === "white" ? turn = "black" : turn = "white";  // change player turn

    if (playWithEngine){
        if (!playerSide()) 
        { 
            let FEN = generateFen(getFile, getRank, getFilePosition, getRankPosition, keepTurn, undefined, handleEnPosition(), take, pawnMove);
            sendMoveToEngine(FEN);
        } 
        else 
        {
            generateFen(getFile, getRank, getFilePosition, getRankPosition, keepTurn, undefined, handleEnPosition(), take, pawnMove);    
        }
    }

    // get occur event, direction, pined piece
    occurEvent = whatEventOccur();
    occurEvent = occurEvent?.occurEvent;
    atDirection = whatEventOccur();
    atDirection = atDirection?.atDirection;
    pinedPiece = whatEventOccur();
    pinedPiece = pinedPiece?.pinedPiece;
    
    take = false;
    pawnMove = false;
    
    console.log("occur event: ", occurEvent);
    console.log("pined piece: ", pinedPiece);
    
}

function removeValidMove() {
    // Remove existing highlighted squares
    const getValidSquare = document.querySelectorAll('.valid-square');
    
    // remove all valid square
    getValidSquare.forEach(function(div) {
        div.remove();
    });

    isSamePiece = ""; // set to default
    
}

export function changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart) {
    pieces[getPieceId].position.file = getFilePosition;
    pieces[getPieceId].position.rank = getRankPosition;

    let getPieceElement = document.getElementById(getPieceId);
    getPieceElement.setAttribute("position", filePart+rankPart);

    overlapWhite = [];
    overlapBlack = [];

    getCurrentPosition();
}

/* ==================================================================================================== */
/* ============================================= PIECE CAPTURE ======================================== */
/* ==================================================================================================== */
function capture(getFilePosition, getRankPosition, filePart, rankPart) {
    storeFR = filePart + rankPart;
    console.log(storeFR);
    if (turn === 'white') {
        if ( overlapBlack.includes(storeFR) ) {
            let getEnemyPosition = document.querySelector(`[position="${filePart}${rankPart}"]`);
            let getEnemyId = getEnemyPosition.id;
            
            let getEnemyElement = document.getElementById(getEnemyId);
            getEnemyElement.setAttribute("position", "taken");

            if (getEnemyPosition) {
                getEnemyPosition.style.transform = `translate(${filePart * -1000}px, ${rankPart * -1000}px)`;
                
                pieces[getEnemyId].position.file = -1000;
                pieces[getEnemyId].position.rank = -1000;
                changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart);

                take = true;
            }
        }
    } else {
        if ( overlapWhite.includes(storeFR) ) {
            let getEnemyPosition = document.querySelector(`[position="${filePart}${rankPart}"]`);
            let getEnemyId = getEnemyPosition.id;

            let getEnemyElement = document.getElementById(getEnemyId);
            getEnemyElement.setAttribute("position", "taken");

            if (getEnemyPosition) {
                getEnemyPosition.style.transform = `translate(${filePart * -1000}px, ${rankPart * -1000}px)`;
                
                pieces[getEnemyId].position.file = -1000;
                pieces[getEnemyId].position.rank = -1000;
                changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart);

                take = true;
            }
        }
    }

    changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart);
 
}

import { handleEngineResponse } from "./handleEngineResponse.js"; 

let best_move;
function sendMoveToEngine(FEN) {
    fetch('http://localhost:5500/engine/move', { // send player move to stockfish to calculate the best move. then send back best move
        method: 'POST',
        body: JSON.stringify({ data: FEN }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(bestMove => {
            console.log(bestMove);
            best_move = bestMove
            
            handleEngineResponse(best_move);
        })
        // .catch(error => console.error('Error here!!!!', error));
}

export function checkCastleEvenForEngine (best_move) {
    if (best_move.bestMove === "e8g8" || best_move.bestMove === "e1g1") {
        console.log("short true!!!!")
        shortCastle(invertTurn);
        return true;       
    } else if (best_move.bestMove === "e8c8" || best_move.bestMove === "e1c1") {
        console.log("long true!!!!")
        longCastle(invertTurn);
        return true;
    } else {
        return false;
    }
}

export { overlapBlack, overlapWhite, turn};
whatEventOccur();