import { getCurrentPosition } from "./main.js";

export function calculateAttackSquare(blackPosition, whitePosition){
    // getCurrentPosition();

    let pieceAttackId, attackFile, attackRank;
    let allPosition = blackPosition.concat(whitePosition); // merge black and white position
    let blackAttackSquare = []; // store black attack square
    let whiteAttackSquare = []; // store white attack square
    let index = 0;

    function createAttackSquare(filePosition, rankPosition) {

        // check if attack square outside board 
        if ((filePosition * 100) > 700 || (filePosition * 100) < 0 || (rankPosition * 100) < 0 || (rankPosition * 100 ) > 700) {
            return;

        } 
        // get black attack square
        if ( 0 <= index && index <= 15  ) {
            let getAttackSquare = filePosition.toString()+rankPosition.toString();
            blackAttackSquare.push(getAttackSquare);

        } 
        // get white attack square
        else if (15 <= index && index <= 31) {
            let getAttackSquare = filePosition.toString()+rankPosition.toString();
            whiteAttackSquare.push(getAttackSquare);

        }
    }

    // give piece id
    for (index = 0; index <= 31; index++ ) {
        pieceAttackId = (index).toString();
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
            const filePosition = [attackFile - 1, attackFile + 1, attackFile - 1, attackFile + 1, attackFile - 2, attackFile - 2, attackFile + 2, attackFile + 2];
            const rankPosition = [attackRank + 2, attackRank + 2, attackRank - 2, attackRank - 2, attackRank + 1, attackRank - 1, attackRank + 1, attackRank - 1];
            
            // create 7 square default if valid
            for (let i = 0; i <= 7; i++ ) {
                if ( ( whitePosition.includes(filePosition[i].toString() + rankPosition[i].toString()) ) || ( blackPosition.includes(filePosition[i].toString() + rankPosition[i].toString()) ) )  {
                    continue;
                }
                createAttackSquare(filePosition[i], rankPosition[i]);
            } 
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
            const filePosition = [attackFile, attackFile - 1, attackFile + 1, attackFile - 1, attackFile + 1, attackFile, attackFile -1, attackFile + 1];
            const rankPosition = [attackRank - 1, attackRank - 1, attackRank - 1, attackRank, attackRank, attackRank + 1, attackRank + 1, attackRank + 1];
            
            // calculate valid square
            for (let i = 0; i <= 7; i++) {
                // check if piece block the valid square
                if ( ( whitePosition.includes(filePosition[i].toString() + rankPosition[i].toString()) ) || ( blackPosition.includes(filePosition[i].toString() + rankPosition[i].toString())  ) )  {
                    continue;
                }

                createAttackSquare(filePosition[i], rankPosition[i]);
            }

        } 

        // ======================================= Pawn move =========================================== //
        else {

            // ================================= black pawn ======================================= // 
            if (pieceAttackId >= 8 && pieceAttackId <= 15 ) {
                createAttackSquare(attackFile - 1, attackRank + 1);
                createAttackSquare(attackFile + 1, attackRank + 1); 
            }
            
            // ======================================= White pawn ======================================== // 
            else {
                createAttackSquare(attackFile - 1, attackRank - 1);
                createAttackSquare(attackFile + 1, attackRank - 1);
            }
        }

        // ================================ horizontal and vertical move ================================ //
        function horizontalVertical() {        
            // left move 
            for (let i = 1 ; i <= attackFile; i++) {
                const filePosition = (attackFile - i);
                const rankPosition = attackRank;
                if ( ( whitePosition.includes(filePosition.toString() + rankPosition.toString() ) ) || ( blackPosition.includes(filePosition.toString() + rankPosition.toString() ) ) )  {
                    break;
                }
                createAttackSquare(filePosition, rankPosition);

                if ( 
                    ( whitePosition.includes(filePosition.toString() + rankPosition.toString() ) ) ||
                    ( blackPosition.includes(filePosition.toString() + rankPosition.toString() ) ) 
                    ) {
                    break;
                }
            }
            // right move 
            for (let i = 1; i <= (7 - attackFile); i++ ) {
                const filePosition = (attackFile + i);
                const rankPosition = attackRank;
                if ( ( whitePosition.includes(filePosition.toString() + rankPosition.toString() ) ) || ( blackPosition.includes(filePosition.toString() + rankPosition.toString()) ) )  {
                    break;
                }
                createAttackSquare(filePosition, rankPosition);

                if ( 
                    ( whitePosition.includes(filePosition.toString() + rankPosition.toString() ) ) ||
                    ( blackPosition.includes(filePosition.toString() + rankPosition.toString() ) ) 
                    ) {
                    break;
                }
            } 
            // up move
            for (let i = 1; i <= attackRank; i++ ) {
                const filePosition = attackFile;
                const rankPosition = (attackRank - i);
                if ( ( whitePosition.includes(filePosition.toString() + rankPosition.toString() ) ) || ( blackPosition.includes(filePosition.toString() + rankPosition.toString() ) ) )  {
                    break;
                }
                createAttackSquare(filePosition, rankPosition);

                if ( 
                    ( whitePosition.includes(filePosition.toString() + rankPosition.toString() ) ) ||
                    ( blackPosition.includes(filePosition.toString() + rankPosition.toString() ) ) 
                    ) {
                    break;
                }
            }
            // down move 
            for (let i = 1; i <= (7 - attackRank); i++) {
                const filePosition = attackFile;
                const rankPosition = (attackRank + i);
                if ( ( whitePosition.includes(filePosition.toString() + rankPosition.toString() ) )|| ( blackPosition.includes(filePosition.toString() + rankPosition.toString() ) ) )  {
                    break;
                }
                createAttackSquare(filePosition, rankPosition);

                if ( 
                    ( whitePosition.includes(filePosition.toString() + rankPosition.toString())) ||
                    ( blackPosition.includes(filePosition.toString() + rankPosition.toString())) 
                    ) {
                    break;
                }
            }
        
        }

        // ========================================== diagonal move ===================================== // 
        function diagonal() {
            // up left diagonal
            for (let i = 1; i <= attackFile; i ++) {
                const filePosition = (attackFile - i);
                const rankPosition = (attackRank - i);
            
                if ( ( whitePosition.includes(filePosition.toString() + rankPosition.toString())) || ( blackPosition.includes(filePosition.toString() + rankPosition.toString())) )  {
                    break;
                } 
                createAttackSquare(filePosition, rankPosition);
                
                if ( 
                    ( whitePosition.includes(filePosition.toString() + rankPosition.toString())) ||
                    ( blackPosition.includes(filePosition.toString() + rankPosition.toString())) 
                    ) {
                    break;
                }
            }
            // up right diagonal  
            for (let i = 1; i <= (7 - attackFile); i++) {
                const filePosition = (attackFile + i);
                const rankPosition = (attackRank - i);
                
                if ( ( whitePosition.includes(filePosition.toString() + rankPosition.toString())) || ( blackPosition.includes(filePosition.toString() + rankPosition.toString()) ) )  {
                    break;
                }
                createAttackSquare(filePosition, rankPosition);

                if ( 
                    ( whitePosition.includes(filePosition.toString() + rankPosition.toString())  ) ||
                    ( blackPosition.includes(filePosition.toString() + rankPosition.toString())  ) 
                    ) {
                    break;
                }
            }
            // down left diagonal
            for (let i = 1; i <= attackFile; i++) {
                const filePosition = (attackFile - i);
                const rankPosition = (attackRank + i);
                if ( ( whitePosition.includes(filePosition.toString() + rankPosition.toString()) ) || ( blackPosition.includes(filePosition.toString() + rankPosition.toString())  ) )  {
                    break;
                }
                createAttackSquare(filePosition, rankPosition);

                if ( 
                    ( whitePosition.includes(filePosition.toString() + rankPosition.toString()) ) ||
                    ( blackPosition.includes(filePosition.toString() + rankPosition.toString()) ) 
                    ) {
                    break;
                }
            }
        
            // down right diagonal
            for (let i = 1; i <= (7 - attackFile); i++) {
                const filePosition = (attackFile + i);
                const rankPosition = (attackRank + i);
                if ( ( whitePosition.includes(filePosition.toString() + rankPosition.toString())) || ( blackPosition.includes(filePosition.toString() + rankPosition.toString()) ) )  {
                    break;
                }
                createAttackSquare(filePosition, rankPosition);
                
                if ( 
                    ( whitePosition.includes(filePosition.toString() + rankPosition.toString()) ) ||
                    ( blackPosition.includes(filePosition.toString() + rankPosition.toString()) ) 
                    ) {
                    break;
                }
            }
        }
    }

    // test
    console.log('black attack square', blackAttackSquare);
    console.log("white attack square", whiteAttackSquare);
}

