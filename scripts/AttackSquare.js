import { overlapBlack, overlapWhite } from "./position.js";
import { whitePieceIndex, blackPieceIndex } from "./position.js";
import { isSelfPiece, isOpponentPiece } from "./pieces.js";

export function calculateAttackSquare(){
    let pieceAttackId, attackFile, attackRank;
    let allPosition = overlapBlack.concat(overlapWhite); // merge black and white position
    let index = 0;
    let getAttackSquare;
    let turn;
    let blackAttackSquare = [];
    let whiteAttackSquare = [];
    let blackPinDirection = [];
    let whitePinDirection = [];
    let L, R, U, D, DUL, DUR, DDL, DDR;

    function pushSquare(direction, filePosition, rankPosition){
        if ((filePosition * 100) > 700 || (filePosition * 100) < 0 || (rankPosition * 100) < 0 || (rankPosition * 100 ) > 700) {
            return;
        }
        getAttackSquare = `${filePosition}${rankPosition}`;
        direction.push(getAttackSquare);
    }

    function pushAttackDirection(direction, ){
        0 <= index && index <= 15 ? blackAttackSquare.push(direction) : whiteAttackSquare.push(direction);
    }

    function pushPinDirection(direction){
        0 <= index && index <= 15 ? blackPinDirection.push(direction) : whitePinDirection.push(direction); 
    }

    // give piece id
    for (index = 0; index <= 31; index++ ) 
    {
        (index >= 0 && index <= 15) ? turn = 'black' : turn = 'white';
        pieceAttackId = `${turn === "white" ? whitePieceIndex[index - 16] : blackPieceIndex[index]}`;
        [attackFile, attackRank] = ((allPosition[index]).toString()).split("");
        [attackFile, attackRank] = ((allPosition[index]).toString()).split("");
        attackFile = parseInt(attackFile);
        attackRank = parseInt(attackRank);

        // =============================== Rook move  =========================================== //
        if (pieceAttackId === '0' || pieceAttackId === '7' || pieceAttackId === '24' || pieceAttackId === '31') {
            horizontalVertical();
        }

        // ===================================== Night Move =========================================== // 
        else if (pieceAttackId === '1' || pieceAttackId === '6' || pieceAttackId === '25' || pieceAttackId === '30' ) {
            // knight move in fire and rank position
            const filePosition = [attackFile, attackFile - 1, attackFile + 1, attackFile - 1, attackFile + 1, attackFile - 2, attackFile - 2, attackFile + 2, attackFile + 2];
            const rankPosition = [attackRank, attackRank + 2, attackRank + 2, attackRank - 2, attackRank - 2, attackRank + 1, attackRank - 1, attackRank + 1, attackRank - 1];
            
            // create 7 square default if valid
            let KNIGHT = ["KNIGHT"];
            for (let i = 0; i <= 8; i++ ) {
                pushSquare(KNIGHT, filePosition[i], rankPosition[i]);
            } 
            pushAttackDirection(KNIGHT);
        }

        // ======================================= Bishop move ========================================= // 
        else if (pieceAttackId === '2' || pieceAttackId === '5' || pieceAttackId === '26' || pieceAttackId === '29') {
            // create diagonal move
            diagonal();  
        }
    
        // ======================================== Queen move ========================================= //  
        else if (pieceAttackId === '3' || pieceAttackId === '27') {
            // create diagonal, horizontal and vertical move
            horizontalVertical();
            diagonal();
        }

        // ========================================= King move ========================================= // 
        else if (pieceAttackId === '4' || pieceAttackId === '28') {
            // all king move
            const filePosition = [attackFile, attackFile, attackFile - 1, attackFile + 1, attackFile - 1, attackFile + 1, attackFile, attackFile -1, attackFile + 1];
            const rankPosition = [attackRank, attackRank - 1, attackRank - 1, attackRank - 1, attackRank, attackRank, attackRank + 1, attackRank + 1, attackRank + 1];
            
            // calculate valid square
            for (let i = 0; i <= 8; i++) 
            {
                // check if piece block the valid square
                if ( ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString())  && turn === 'white' ) || ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString())   && turn === 'black' ) )  
                {
                    continue;
                }

                // createAttackSquare(filePosition[i], rankPosition[i]);
                // return;
            }

        } 

        else  // ======================================= Pawn move =========================================== //
        {
            let PAWN = ["PAWN"];
            
            if (index >= 8 && index <= 15 ) // ================================= black pawn ======================================= // 
            {
                pushSquare(PAWN, attackFile - 1, attackRank + 1);
                pushSquare(PAWN, attackFile + 1, attackRank + 1);
            }
            
            else if (index >= 16 && index <= 23 ) // ======================================= White pawn ======================================== // 
            {
                pushSquare(PAWN, attackFile - 1, attackRank - 1);
                pushSquare(PAWN, attackFile + 1, attackRank - 1);
            }
            pushAttackDirection(PAWN);
            pushAttackDirection(PAWN);
        }

        // ================================ horizontal and vertical move ================================ //
        function horizontalVertical() {        
            let OP = true;
            
            // left move 
            L = [];
            let PIN_L = [];
            for (let i = 0 ; i <= attackFile + 1; i++){   
                const filePosition = (attackFile - i);
                const rankPosition = attackRank;
                
                if(isSelfPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && i !== 0){
                    pushSquare(L, filePosition, rankPosition);
                    pushSquare(PIN_L, filePosition, rankPosition);
                    break;
                }
                
                pushSquare(PIN_L, filePosition, rankPosition);
                
                if(isOpponentPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && OP){
                    L = PIN_L;
                    pushSquare(L, filePosition, rankPosition);
                    OP = false;
                }
                if(i === attackFile + 1) OP = true;
            }
            pushAttackDirection(L);
            pushPinDirection(PIN_L);
            
            // right move 
            R = [];
            let PIN_R = [];
            for (let i = 0; i <= (7 - attackFile) + 1; i++ ){
                const filePosition = (attackFile + i);
                const rankPosition = attackRank;
                
                if(isSelfPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && i !== 0){
                    pushSquare(R, filePosition, rankPosition);
                    pushSquare(PIN_R, filePosition, rankPosition);
                    break;
                }
                
                pushSquare(PIN_R, filePosition, rankPosition);
                
                if(isOpponentPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && OP){
                    R = PIN_R;
                    pushSquare(R, filePosition, rankPosition);
                    OP = false;
                }
                if(i === (7 - attackFile) + 1) OP = true;
            }
            pushAttackDirection(R);
            pushPinDirection(PIN_R);

            // up move
            U = [];
            let PIN_U = [];
            for (let i = 0; i <= attackRank + 1; i++ ){
                const filePosition = attackFile;
                const rankPosition = (attackRank - i);
                
                if(isSelfPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && i !== 0){
                    pushSquare(U, filePosition, rankPosition);
                    pushSquare(PIN_U, filePosition, rankPosition);
                    break;
                }
                
                pushSquare(PIN_U, filePosition, rankPosition);
                
                if(isOpponentPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && OP){
                    U = PIN_U;
                    pushSquare(U, filePosition, rankPosition);
                    OP = false;
                }
                if(i === attackRank + 1) OP = true;
            }
            pushAttackDirection(U);
            pushPinDirection(PIN_U);

            // down move 
            D = [];
            let PIN_D = [];
            for (let i = 0; i <= (7 - attackRank) + 1; i++){
                const filePosition = attackFile;
                const rankPosition = attackRank + i;
                
                if (isSelfPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && i !== 0){
                    pushSquare(D, filePosition, rankPosition);
                    pushSquare(PIN_D, filePosition, rankPosition);
                    break;
                }
                
                pushSquare(PIN_D, filePosition, rankPosition);
                
                if(isOpponentPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && OP){
                    D = PIN_D
                    pushSquare(D, filePosition, rankPosition);
                    OP = false;
                }
                if(i === (7 - attackRank) + 1) OP = true;
            }
            pushAttackDirection(D);
            pushPinDirection(PIN_D);
        
        }

        // ========================================== diagonal move ===================================== // 
        function diagonal() {
            let OP = true;

            // up left diagonal
            DUL  = [];
            let PIN_DUL = [];
            for (let i = 0; i <= attackFile + 1; i ++) {
                const filePosition = (attackFile - i);
                const rankPosition = (attackRank - i);
            
                if (isSelfPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && i !== 0){
                    pushSquare(DUL, filePosition, rankPosition);
                    pushSquare(PIN_DUL, filePosition, rankPosition);
                    break;
                }

                pushSquare(PIN_DUL, filePosition, rankPosition);

                if(isOpponentPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && OP){
                    DUL = PIN_DUL
                    pushSquare(DUL, filePosition, rankPosition);
                    OP = false;
                }
                if(i === attackFile + 1) OP = true;
            }
            pushAttackDirection(DUL);
            pushPinDirection(PIN_DUL);

            // up right diagonal  

            DUR  = [];
            let PIN_DUR = [];
            for (let i = 0; i <= (7 - attackFile) + 1; i++) {
                const filePosition = (attackFile + i);
                const rankPosition = (attackRank - i);
                
                if (isSelfPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && i !== 0){
                    pushSquare(DUR, filePosition, rankPosition);
                    pushSquare(PIN_DUR, filePosition, rankPosition);
                    break;
                }

                pushSquare(PIN_DUR, filePosition, rankPosition);

                if(isOpponentPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && OP){
                    DUR = PIN_DUR;
                    pushSquare(DUR, filePosition, rankPosition);
                    OP = false;
                }
                if (i === (7 - attackFile) + 1) OP = true;
            }
            pushAttackDirection(DUR);
            pushPinDirection(PIN_DUR);
            
            DDL  = [];
            let PIN_DDL = [];
            // down left diagonal
            for (let i = 0; i <= attackFile + 1; i++) {
                const filePosition = (attackFile - i);
                const rankPosition = (attackRank + i);
                
                if (isSelfPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && i !== 0){
                    pushSquare(DDL, filePosition, rankPosition);
                    pushSquare(PIN_DDL, filePosition, rankPosition);
                    break;
                }

                pushSquare(PIN_DDL, filePosition, rankPosition);
                
                if(isOpponentPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && OP){
                    DDL = PIN_DDL;
                    pushSquare(DDL, filePosition, rankPosition);
                    OP = false;
                }
                if (i === attackFile + 1) OP = true;
            }
            pushAttackDirection(DDL);
            pushPinDirection(PIN_DDL);
        
            DDR  = [];
            let PIN_DDR = [];
            // down right diagonal
            for (let i = 0; i <= (7 - attackFile) + 1; i++) {
                const filePosition = (attackFile + i);
                const rankPosition = (attackRank + i);
                
                if (isSelfPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && i !== 0){
                    pushSquare(DDR, filePosition, rankPosition);
                    pushSquare(PIN_DDR, filePosition, rankPosition);
                    break;
                }
                
                pushSquare(PIN_DDR, filePosition, rankPosition);
                
                if(isOpponentPiece(overlapBlack, overlapWhite, filePosition, rankPosition, turn) && OP){
                    DDR = PIN_DDR;
                    pushSquare(DDR, filePosition, rankPosition);
                    OP = false;
                }
                if (i === (7 - attackFile) + 1) OP = true;
            }
            pushAttackDirection(DDR);
            pushPinDirection(PIN_DDR);
        }
    }
    
    let re = {
        attackDirection: {
            black: blackAttackSquare, white: whiteAttackSquare
        },
        pinDirection: {
            black: blackPinDirection, white: whitePinDirection
        }
    }
    
    let test = "white";

    let op = turn === "white" ? 'black' : 'white';

    console.log("white pin direction: ", whitePinDirection);
    console.log("black pin direction: ", blackPinDirection);
    console.log("white attack direction: ", blackAttackSquare);
    console.log(re.pinDirection[op].length);

    return {
        attackDirection: {
            black: blackAttackSquare, white: whiteAttackSquare
        },
        pinDirection: {
            black: blackPinDirection, white: whitePinDirection
        }
    }
}