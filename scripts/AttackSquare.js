import { getCurrentPosition } from "./main.js";
import { overlapBlack, overlapWhite } from "./main.js";

export function calculateAttackSquare()
{
    // getCurrentPosition();

    let pieceAttackId, attackFile, attackRank;
    let allPosition = overlapBlack.concat(overlapWhite); // merge black and white position
    let blackAttackSquare; // store black attack square
    let whiteAttackSquare; // store white attack square
    let index = 0;
    let getAttackSquare;
    let turn;

    function createAttackSquare(filePosition, rankPosition, direction) 
    {
        // check if attack square outside board 
        if ((filePosition * 100) > 700 || (filePosition * 100) < 0 || (rankPosition * 100) < 0 || (rankPosition * 100 ) > 700) 
        {
            return;
        } 

        let blackPawn = [8, 9, 10, 11, 12, 13, 14, 15];
        let whitePawn = [16, 17, 18, 19, 20, 21, 22, 23];

        // get black attack square
        if (0 <= index && index <= 15) 
        {
            getAttackSquare = filePosition.toString()+rankPosition.toString();
            
            switch (index) // black attack square
            {
                case 0: // rook l
                    switch (direction) 
                    {
                        case "l": // rook left move
                            blackAttackSquare[0][0].push(getAttackSquare);    
                            break;
                        case "r":
                            blackAttackSquare[0][1].push(getAttackSquare);
                            break;
                        case "u":
                            blackAttackSquare[0][2].push(getAttackSquare);
                            break;
                        case "d":
                            blackAttackSquare[0][3].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 1: // knight l
                    blackAttackSquare[1].push(getAttackSquare);
                    break;
                case 2: // bishop l
                    switch (direction) 
                    {
                        case "dul":
                            blackAttackSquare[2][0].push(getAttackSquare);
                            break;
                        case "dur":
                            blackAttackSquare[2][1].push(getAttackSquare);
                            break;
                        case "ddl": 
                            blackAttackSquare[2][2].push(getAttackSquare);
                            break;
                        case "ddr":
                            blackAttackSquare[2][3].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 3: // queen l 
                    switch (direction) 
                    {
                        case "dul":
                            blackAttackSquare[3][0].push(getAttackSquare);
                            break;
                        case "dur":
                            blackAttackSquare[3][1].push(getAttackSquare);
                            break;
                        case "ddl": 
                            blackAttackSquare[3][2].push(getAttackSquare);
                            break;
                        case "ddr":
                            blackAttackSquare[3][3].push(getAttackSquare);
                            break;
                        case "l":
                            blackAttackSquare[3][4].push(getAttackSquare);
                            break;
                        case "r":
                            blackAttackSquare[3][5].push(getAttackSquare);
                            break;
                        case "u":
                            blackAttackSquare[3][6].push(getAttackSquare);
                            break;
                        case "d":
                            blackAttackSquare[3][7].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 5: // bishop r
                    switch (direction) 
                    {
                        case "dul":
                            blackAttackSquare[4][0].push(getAttackSquare);
                            break;
                        case "dur":
                            blackAttackSquare[4][1].push(getAttackSquare);
                            break;
                        case "ddl": 
                            blackAttackSquare[4][2].push(getAttackSquare);
                            break;
                        case "ddr":
                            blackAttackSquare[4][3].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 6: // knight r
                    blackAttackSquare[5].push(getAttackSquare);
                    break;
                case 7: // rook r
                    switch (direction) 
                    {
                        case "l": // left move
                            blackAttackSquare[6][0].push(getAttackSquare);    
                            break;
                        case "r": // right move
                            blackAttackSquare[6][1].push(getAttackSquare);
                            break;
                        case "u": // up move
                            blackAttackSquare[6][2].push(getAttackSquare);
                            break;
                        case "d": // down move
                            blackAttackSquare[6][3].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 4: // king
                    blackAttackSquare[7].push(getAttackSquare);
                    break;
                case blackPawn[ index - 8 ] : // pawn
                    blackAttackSquare[8].push(getAttackSquare);
                    break;
                default:
                    break;
            }
        } 
        // get white attack square
        else if (16 <= index && index <= 31) 
        {
            getAttackSquare = filePosition.toString()+rankPosition.toString();
            
            switch (index) // white attack square
            {
                case 24:
                    switch (direction) 
                    {
                        case "l": // rook left move
                            whiteAttackSquare[0][0].push(getAttackSquare);    
                            break;
                        case "r":
                            whiteAttackSquare[0][1].push(getAttackSquare);
                            break;
                        case "u":
                            whiteAttackSquare[0][2].push(getAttackSquare);
                            break;
                        case "d":
                            whiteAttackSquare[0][3].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 25:
                    whiteAttackSquare[1].push(getAttackSquare);
                    break;
                case 26:
                    switch (direction) 
                    {
                        case "dul":
                            whiteAttackSquare[2][0].push(getAttackSquare);
                            break;
                        case "dur":
                            whiteAttackSquare[2][1].push(getAttackSquare);
                            break;
                        case "ddl": 
                            whiteAttackSquare[2][2].push(getAttackSquare);
                            break;
                        case "ddr":
                            whiteAttackSquare[2][3].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 27:
                    switch (direction) 
                    {
                        case "dul":
                            whiteAttackSquare[3][0].push(getAttackSquare);
                            break;
                        case "dur":
                            whiteAttackSquare[3][1].push(getAttackSquare);
                            break;
                        case "ddl": 
                            whiteAttackSquare[3][2].push(getAttackSquare);
                            break;
                        case "ddr":
                            whiteAttackSquare[3][3].push(getAttackSquare);
                            break;
                        case "l":
                            whiteAttackSquare[3][4].push(getAttackSquare);
                            break;
                        case "r":
                            whiteAttackSquare[3][5].push(getAttackSquare);
                            break;
                        case "u":
                            whiteAttackSquare[3][6].push(getAttackSquare);
                            break;
                        case "d":
                            whiteAttackSquare[3][7].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 29:
                    switch (direction) 
                    {
                        case "dul":
                            whiteAttackSquare[4][0].push(getAttackSquare);
                            break;
                        case "dur":
                            whiteAttackSquare[4][1].push(getAttackSquare);
                            break;
                        case "ddl": 
                            whiteAttackSquare[4][2].push(getAttackSquare);
                            break;
                        case "ddr":
                            whiteAttackSquare[4][3].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 30:
                    whiteAttackSquare[5].push(getAttackSquare);
                    break;
                case 31:
                    switch (direction) 
                    {
                        case "l": // rook left move
                            whiteAttackSquare[6][0].push(getAttackSquare);    
                            break;
                        case "r":
                            whiteAttackSquare[6][1].push(getAttackSquare);
                            break;
                        case "u":
                            whiteAttackSquare[6][2].push(getAttackSquare);
                            break;
                        case "d":
                            whiteAttackSquare[6][3].push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 28:
                    whiteAttackSquare[7].push(getAttackSquare);
                    break;
                case whitePawn[index - 16] : // all pawn go in 7 array
                    whiteAttackSquare[8].push(getAttackSquare);
                    break;
                default:
                    break;
            }
        }
    }

    console.log("black attack square", blackAttackSquare);
    console.log("white attact square", whiteAttackSquare);
    blackAttackSquare = [[[], [], [], []], [], [[], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], []], [], [[], [], [], []], [], []];
    whiteAttackSquare = [[[], [], [], []], [], [[], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], []], [], [[], [], [], []], [], []];

    // give piece id
    for (index = 0; index <= 31; index++ ) 
    {
        (index >= 0 && index <= 15) ? turn = 'black' : turn = 'white';
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
                // if ( ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'white') || ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString()) && turn === 'black' ) )  {
                //     continue;
                // }
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
            for (let i = 0; i <= 7; i++) 
            {
                // check if piece block the valid square
                if ( ( overlapWhite.includes(filePosition[i].toString() + rankPosition[i].toString())  && turn === 'white' ) || ( overlapBlack.includes(filePosition[i].toString() + rankPosition[i].toString())   && turn === 'black' ) )  
                {
                    continue;
                }

                createAttackSquare(filePosition[i], rankPosition[i]);
            }

        } 

        else  // ======================================= Pawn move =========================================== //
        {
            if (index >= 8 && index <= 15 ) // ================================= black pawn ======================================= // 
            {
                createAttackSquare(attackFile - 1, attackRank + 1);
                createAttackSquare(attackFile + 1, attackRank + 1);
            }
            
            else if (index >= 16 && index <= 23 ) // ======================================= White pawn ======================================== // 
            {
                createAttackSquare(attackFile - 1, attackRank - 1);
                createAttackSquare(attackFile + 1, attackRank - 1);   
            }
        }

        // ================================ horizontal and vertical move ================================ //
        function horizontalVertical() {        
            // left move 
            for (let i = 1 ; i <= attackFile; i++) 
            {
                const filePosition = (attackFile - i);
                const rankPosition = attackRank;
                let foundSelfpiece = false;
                if (foundSelfpiece) { break }
                if  ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'white' ) || 
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'black' ) 
                    )  
                {
                    createAttackSquare(filePosition, rankPosition, "l");
                    foundSelfpiece = true;
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "l");

                if  ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'white' ) ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'black' ) 
                    ) 
                {
                    break;
                }
            }
            // right move 
            for (let i = 1; i <= (7 - attackFile); i++ ) 
            {
                const filePosition = (attackFile + i);
                const rankPosition = attackRank;
                if  ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'white' ) ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'black' ) 
                    )  
                {
                    createAttackSquare(filePosition, rankPosition, "r");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "r");

                if ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'black') 
                    ) 
                {
                    break;
                }
            } 
            // up move
            for (let i = 1; i <= attackRank; i++ ) 
            {
                const filePosition = attackFile;
                const rankPosition = (attackRank - i);
                if  (
                     ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'white') ||
                     ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'black') 
                    )  
                {
                    createAttackSquare(filePosition, rankPosition, "u");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "u");

                if ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'black') 
                    ) 
                {
                    break;
                }
            }
            // down move 
            for (let i = 1; i <= (7 - attackRank); i++) 
            {
                const filePosition = attackFile;
                const rankPosition = (attackRank + i);
                if  (
                     ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'white') ||
                     ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'black') 
                    )  
                {
                    createAttackSquare(filePosition, rankPosition, "d");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "d");

                if ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() )  && turn === 'black') 
                    ) 
                {
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
            
                if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString())  && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString())  && turn === 'black') )  {
                    createAttackSquare(filePosition, rankPosition, "dul");
                    break;    
                } 
                createAttackSquare(filePosition, rankPosition, "dul");
                
                if ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString())  && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString())  && turn === 'black') 
                    ) {
                    break;
                }
            }
            // up right diagonal  
            for (let i = 1; i <= (7 - attackFile); i++) {
                const filePosition = (attackFile + i);
                const rankPosition = (attackRank - i);
                
                if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString())  && turn === 'black') )  {
                    createAttackSquare(filePosition, rankPosition, "dur");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "dur");

                if ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString())  && turn === 'white' ) ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString())  && turn === 'black') 
                    ) {
                    break;
                }
            }
            // down left diagonal
            for (let i = 1; i <= attackFile; i++) {
                const filePosition = (attackFile - i);
                const rankPosition = (attackRank + i);
                if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString())  && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString())  && turn === 'black' ) )  {
                    createAttackSquare(filePosition, rankPosition, "ddl");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "ddl");

                if ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString())  && turn === 'white' ) ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString())  && turn === 'black') 
                    ) {
                    break;
                }
            }
        
            // down right diagonal
            for (let i = 1; i <= (7 - attackFile); i++) {
                const filePosition = (attackFile + i);
                const rankPosition = (attackRank + i);
                if ( ( overlapWhite.includes(filePosition.toString() + rankPosition.toString())  && turn === 'white') || ( overlapBlack.includes(filePosition.toString() + rankPosition.toString())  && turn === 'black') )  {
                    createAttackSquare(filePosition, rankPosition, "ddr");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "ddr");
                
                if ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString())  && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString())  && turn === 'black') 
                    ) {
                    break;
                }
            }
        }
    }

    // test
    console.log('black attack square', blackAttackSquare);
    console.log("white attack square", whiteAttackSquare);

    return blackAttackSquare, whiteAttackSquare;
}

