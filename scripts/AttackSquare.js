import { getCurrentPosition, changeDefualtPosition } from "./main.js";
import { overlapBlack, overlapWhite } from "./main.js";
import { attackDirectionStorage } from "./attackDirection.js";


export function calculateAttackSquare()
{
    // getCurrentPosition();
    let pieceAttackId, attackFile, attackRank;
    let allPosition = overlapBlack.concat(overlapWhite); // merge black and white position
    let index = 0;
    let getAttackSquare;
    let turn;
    let attack_direction = attackDirectionStorage();

    console.log(overlapWhite, overlapBlack);

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
                case 0:                                                                         // black left rook 
                    switch (direction) 
                    {
                        case "l": // rook left move
                            // blackAttackSquare[0][0].push(getAttackSquare);    
                            attack_direction.rook.black.left.leftMove.push(getAttackSquare);
                            break;
                        case "r":
                            attack_direction.rook.black.left.rightMove.push(getAttackSquare);
                            break;
                        case "u":
                            attack_direction.rook.black.left.upMove.push(getAttackSquare);
                            break;
                        case "d":
                            attack_direction.rook.black.left.downMove.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 1:                                                                         // black left knight
                    attack_direction.knight.black.left.moves.push(getAttackSquare);
                    break;
                case 2: // bishop l
                    switch (direction) 
                    {
                        case "dul":
                            attack_direction.bishop.black.left.diagonalUpLeft.push(getAttackSquare);
                            break;
                        case "dur":
                            attack_direction.bishop.black.left.diagonalUpRigth.push(getAttackSquare);
                            break;
                        case "ddl": 
                            attack_direction.bishop.black.left.diagonalDownLeft.push(getAttackSquare);
                            break;
                        case "ddr":
                            attack_direction.bishop.black.left.diagonalDownRight.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 3: // queen l 
                    switch (direction) 
                    {
                        case "dul":
                            attack_direction.queen.black.diagonalUpLeft.push(getAttackSquare);
                            break;
                        case "dur":
                            attack_direction.queen.black.diagonalUpRigth.push(getAttackSquare);
                            break;
                        case "ddl": 
                            attack_direction.queen.black.diagonalDownLeft.push(getAttackSquare);
                            break;
                        case "ddr":
                            attack_direction.queen.black.diagonalDownRight.push(getAttackSquare);
                            break;
                        case "l":
                            attack_direction.queen.black.leftMove.push(getAttackSquare);
                            break;
                        case "r":
                            attack_direction.queen.black.rightMove.push(getAttackSquare);
                            break;
                        case "u":
                            attack_direction.queen.black.upMove.push(getAttackSquare);
                            break;
                        case "d":
                            attack_direction.queen.black.downMove.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 5: // bishop r
                    switch (direction) 
                    {
                        case "dul":
                            attack_direction.bishop.black.right.diagonalUpLeft.push(getAttackSquare);
                            break;
                        case "dur":
                            attack_direction.bishop.black.right.diagonalUpRigth.push(getAttackSquare);
                            break;
                        case "ddl": 
                        attack_direction.bishop.black.right.diagonalDownLeft.push(getAttackSquare);
                            break;
                        case "ddr":
                            attack_direction.bishop.black.right.diagonalDownRight.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 6: // knight r
                    attack_direction.knight.black.right.moves.push(getAttackSquare);
                    break;
                case 7: // rook r
                    switch (direction) 
                    {
                        case "l": // left move
                            attack_direction.rook.black.right.leftMove.push(getAttackSquare);
                            break;
                        case "r": // right move
                        attack_direction.rook.black.right.rightMove.push(getAttackSquare);
                            break;
                        case "u": // up move
                        attack_direction.rook.black.right.upMove.push(getAttackSquare);
                            break;
                        case "d": // down move
                        attack_direction.rook.black.right.downMove.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 4: // king
                    attack_direction.king.black.move.push(getAttackSquare);
                    break;
                case blackPawn[ index - 8 ] : // pawn
                    attack_direction.pawn.black.move.push(getAttackSquare);
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
                case 24:                                                             // white left rook
                    switch (direction) 
                    {
                        case "l": // rook left move
                            attack_direction.rook.white.left.leftMove.push(getAttackSquare);
                            break;
                        case "r":
                            attack_direction.rook.white.left.rightMove.push(getAttackSquare);
                            break;
                        case "u":
                            attack_direction.rook.white.left.upMove.push(getAttackSquare);
                            break;
                        case "d":
                            attack_direction.rook.white.left.downMove.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 25:
                    attack_direction.knight.white.left.moves.push(getAttackSquare);
                    break;
                case 26:
                    switch (direction) 
                    {
                        case "dul":
                            attack_direction.bishop.white.left.diagonalUpLeft.push(getAttackSquare);
                            break;
                        case "dur":
                            attack_direction.bishop.white.left.diagonalUpRigth.push(getAttackSquare);
                            break;
                        case "ddl": 
                            attack_direction.bishop.white.left.diagonalDownLeft.push(getAttackSquare);
                            break;
                        case "ddr":
                            attack_direction.bishop.white.left.diagonalDownRight.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 27:
                    switch (direction) 
                    {
                        case "dul":
                            attack_direction.queen.white.diagonalUpLeft.push(getAttackSquare);
                            break;
                        case "dur":
                            attack_direction.queen.white.diagonalUpRigth.push(getAttackSquare);
                            break;
                        case "ddl": 
                            attack_direction.queen.white.diagonalDownLeft.push(getAttackSquare);
                            break;
                        case "ddr":
                            attack_direction.queen.white.diagonalDownRight.push(getAttackSquare);
                            break;
                        case "l":
                            attack_direction.queen.white.leftMove.push(getAttackSquare);
                            break;
                        case "r":
                            attack_direction.queen.white.rightMove.push(getAttackSquare);
                            break;
                        case "u":
                            attack_direction.queen.white.upMove.push(getAttackSquare);
                            break;
                        case "d":
                            attack_direction.queen.white.downMove.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 29:
                    switch (direction) 
                    {
                        case "dul":
                            attack_direction.bishop.white.right.diagonalUpLeft.push(getAttackSquare);
                            break;
                        case "dur":
                            attack_direction.bishop.white.right.diagonalUpRigth.push(getAttackSquare);
                            break;
                        case "ddl": 
                            attack_direction.bishop.white.right.diagonalDownLeft.push(getAttackSquare);
                            break;
                        case "ddr":
                            attack_direction.bishop.white.right.diagonalDownRight.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 30:
                    attack_direction.knight.white.right.moves.push(getAttackSquare);
                    break;
                case 31:                                                                // white right rook
                    switch (direction) 
                    {
                        case "l": // rook left move
                            attack_direction.rook.white.right.leftMove.push(getAttackSquare); 
                            break;
                        case "r":
                            attack_direction.rook.white.right.rightMove.push(getAttackSquare);
                            break;
                        case "u":
                            attack_direction.rook.white.right.upMove.push(getAttackSquare);
                            break;
                        case "d":
                            attack_direction.rook.white.right.downMove.push(getAttackSquare);
                            break;
                        default:
                            break;
                    }
                    break;
                case 28: // white king
                    attack_direction.king.white.move.push(getAttackSquare);
                    break;
                case whitePawn[index - 16] : // all pawn go in 7 array
                    attack_direction.pawn.white.move.push(getAttackSquare);
                    break;
                default:
                    break;
            }
        }
    }

    
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
            const filePosition = [attackFile, attackFile - 1, attackFile + 1, attackFile - 1, attackFile + 1, attackFile - 2, attackFile - 2, attackFile + 2, attackFile + 2];
            const rankPosition = [attackRank, attackRank + 2, attackRank + 2, attackRank - 2, attackRank - 2, attackRank + 1, attackRank - 1, attackRank + 1, attackRank - 1];
            
            // create 7 square default if valid
            for (let i = 0; i <= 8; i++ ) {
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
            for (let i = 0 ; i <= attackFile + 1; i++) 
            {
                const filePosition = (attackFile - i);
                const rankPosition = attackRank;
                if  ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() ) && i !== 0 && turn === 'white' ) || 
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() ) && i !== 0 && turn === 'black' ) 
                    )  
                {
                    createAttackSquare(filePosition, rankPosition, "l");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "l");
            }
            // right move 
            for (let i = 0; i <= (7 - attackFile) + 1; i++ ) 
            {
                const filePosition = (attackFile + i);
                const rankPosition = attackRank;
                if  ( 
                    ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() ) && i !== 0 && turn === 'white' ) ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() ) && i !== 0 && turn === 'black' ) 
                    )  
                {
                    createAttackSquare(filePosition, rankPosition, "r");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "r");

            } 
            // up move
            for (let i = 0; i <= attackRank + 1; i++ ) 
            {
                const filePosition = attackFile;
                const rankPosition = (attackRank - i);
                if  (
                     ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() ) && i !== 0 && turn === 'white') ||
                     ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() ) && i !== 0 && turn === 'black') 
                    )  
                {
                    createAttackSquare(filePosition, rankPosition, "u");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "u");

            }
            // down move 
            for (let i = 0; i <= (7 - attackRank) + 1; i++) 
            {
                const filePosition = attackFile;
                const rankPosition = attackRank + i;
                if  (
                     ( overlapWhite.includes(filePosition.toString() + rankPosition.toString() ) && i !== 0 && turn === 'white') ||
                     ( overlapBlack.includes(filePosition.toString() + rankPosition.toString() ) && i !== 0 && turn === 'black') 
                    )  
                {
                    createAttackSquare(filePosition, rankPosition, "d");
                    // console.log("break");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "d");
                                
            }
        
        }

        // ========================================== diagonal move ===================================== // 
        function diagonal() {
            // up left diagonal
            for (let i = 0; i <= attackFile + 1; i ++) {
                const filePosition = (attackFile - i);
                const rankPosition = (attackRank - i);
            
                if (( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && i !== 0 && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && i !== 0 && turn === 'black') 
                ){
                    createAttackSquare(filePosition, rankPosition, "dul");
                    break;    
                } 
                createAttackSquare(filePosition, rankPosition, "dul");
                
            }
            // up right diagonal  
            for (let i = 0; i <= (7 - attackFile) + 1; i++) {
                const filePosition = (attackFile + i);
                const rankPosition = (attackRank - i);
                
                if (( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && i !== 0 && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && i !== 0 && turn === 'black') 
                    ){
                    createAttackSquare(filePosition, rankPosition, "dur");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "dur");

            }
            // down left diagonal
            for (let i = 0; i <= attackFile + 1; i++) {
                const filePosition = (attackFile - i);
                const rankPosition = (attackRank + i);
                if (( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && i !== 0 && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && i !== 0 && turn === 'black' ) 
                    ){
                    createAttackSquare(filePosition, rankPosition, "ddl");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "ddl");

            }
        
            // down right diagonal
            for (let i = 0; i <= (7 - attackFile) + 1; i++) {
                const filePosition = (attackFile + i);
                const rankPosition = (attackRank + i);
                if (( overlapWhite.includes(filePosition.toString() + rankPosition.toString()) && i !== 0 && turn === 'white') ||
                    ( overlapBlack.includes(filePosition.toString() + rankPosition.toString()) && i !== 0 && turn === 'black') 
                    ){
                    createAttackSquare(filePosition, rankPosition, "ddr");
                    break;
                }
                createAttackSquare(filePosition, rankPosition, "ddr");
                
            }
        }
    }

    console.log("attack square: ", attack_direction);
    // changeDefualtPosition();
    return attack_direction
}

