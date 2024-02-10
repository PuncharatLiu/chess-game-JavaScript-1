import { calculateAttackSquare } from "./AttackSquare.js"
import { overlapBlack, overlapWhite } from "./main.js";
import { turn } from "./main.js";

export function getAttackDirectionFromObject() {
    const attack_direction = calculateAttackSquare();
    const getAttackDirection = {
        white: [
            attack_direction.rook.white.left.leftMove,
            attack_direction.rook.white.left.rightMove,
            attack_direction.rook.white.left.upMove,
            attack_direction.rook.white.left.downMove,
            attack_direction.bishop.white.left.diagonalDownLeft,
            attack_direction.bishop.white.left.diagonalDownRight,
            attack_direction.bishop.white.left.diagonalUpLeft,
            attack_direction.bishop.white.left.diagonalUpRigth,
            attack_direction.knight.white.left.moves,
            attack_direction.queen.white.diagonalDownLeft,
            attack_direction.queen.white.diagonalDownRight,
            attack_direction.queen.white.diagonalUpLeft,
            attack_direction.queen.white.diagonalUpRigth,
            attack_direction.queen.white.leftMove,
            attack_direction.queen.white.rightMove,
            attack_direction.queen.white.upMove,
            attack_direction.queen.white.downMove,
            attack_direction.bishop.white.right.diagonalDownLeft,
            attack_direction.bishop.white.right.diagonalDownRight,
            attack_direction.bishop.white.right.diagonalUpLeft,
            attack_direction.bishop.white.right.diagonalUpRigth,
            attack_direction.knight.white.right.moves,
            attack_direction.rook.white.right.downMove,
            attack_direction.rook.white.right.upMove,
            attack_direction.rook.white.right.leftMove,
            attack_direction.rook.white.right.rightMove,
            attack_direction.pawn.white.move
        ],
        black: [
            attack_direction.rook.black.left.leftMove,
            attack_direction.rook.black.left.rightMove,
            attack_direction.rook.black.left.upMove,
            attack_direction.rook.black.left.downMove,
            attack_direction.bishop.black.left.diagonalDownLeft,
            attack_direction.bishop.black.left.diagonalDownRight,
            attack_direction.bishop.black.left.diagonalUpLeft,
            attack_direction.bishop.black.left.diagonalUpRigth,
            attack_direction.knight.black.left.moves,
            attack_direction.queen.black.diagonalDownLeft,
            attack_direction.queen.black.diagonalDownRight,
            attack_direction.queen.black.diagonalUpLeft,
            attack_direction.queen.black.diagonalUpRigth,
            attack_direction.queen.black.leftMove,
            attack_direction.queen.black.rightMove,
            attack_direction.queen.black.upMove,
            attack_direction.queen.black.downMove,
            attack_direction.bishop.black.right.diagonalDownLeft,
            attack_direction.bishop.black.right.diagonalDownRight,
            attack_direction.bishop.black.right.diagonalUpLeft,
            attack_direction.bishop.black.right.diagonalUpRigth,
            attack_direction.knight.black.right.moves,
            attack_direction.rook.black.right.downMove,
            attack_direction.rook.black.right.upMove,
            attack_direction.rook.black.right.leftMove,
            attack_direction.rook.black.right.rightMove,
            attack_direction.pawn.black.move
        ]
    }
    return getAttackDirection
}

export function whatEventOccur() {
    const _getAttackDirection = getAttackDirectionFromObject();
    const directionOf = turn === "white" ? "black" : "white";
    const kingPosition = turn === "white" ? overlapWhite[12] : overlapBlack[4];
    const opponent = turn === "white" ? "black" : "white";
    let isPieceBlock = false;
    let atDirection;
    
    
    
    direction: for (let piece = 0; piece < _getAttackDirection[directionOf].length; piece++) {
        let countBlank = 0;
        for (let dr = 0; dr < _getAttackDirection[directionOf][piece].length; dr++) {                
            atDirection = _getAttackDirection[directionOf][piece];
            
            if (_getAttackDirection[directionOf][piece].includes(kingPosition)) {
                if (document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr]}"]`)?.classList.contains(opponent)) 
                {
                    continue direction;
                } 

                else if 
                (
                    (
                        document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr]}"]`)?.classList.contains(turn) ||
                        document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr]}"]`) === null 
                    ) &&
                    (
                        _getAttackDirection[directionOf][piece][dr].toString() !== kingPosition ||
                        isPieceBlock 
                    ) &&
                    !_getAttackDirection[directionOf][piece].includes("exclude")
                )
                {
                    if (document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr]}"]`)?.classList.contains(turn))
                    {
                        isPieceBlock = true;
                    }
                    if (document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr]}"]`) === null){
                        countBlank++;
                        console.log("countBlank++; ", countBlank)
                        if 
                        (
                            document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr]}"]`) !== null &&
                            _getAttackDirection[directionOf][piece][dr]?.toString() !== kingPosition
                        ){
                            console.log("count black: ", countBlank )
                            countBlank = 0;
                        }
                    }

                    if 
                    (
                        document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr + 1]}"]`)?.classList.contains(opponent) ||
                        (
                            document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr + 1]}"]`)?.classList.contains(turn) &&
                            _getAttackDirection[directionOf][piece][dr + 1].toString() !== kingPosition
                        )
                    ){
                        continue direction;
                    }

                    else if 
                    (
                        document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr + 1]}"]`) === null
                        && !_getAttackDirection[directionOf][piece][dr + 1]?.toString() === kingPosition
                    ){
                        continue;
                    }

                    else if 
                    (
                        _getAttackDirection[directionOf][piece][dr + 1]?.toString() === kingPosition &&
                        countBlank !== _getAttackDirection[directionOf][piece].indexOf(kingPosition)
                    )
                    {
                        console.log("pin occur");
                        return {
                            occurEvent: "pin",
                            atDirection: atDirection,
                            pinedPiece: document.querySelector(`[position="${_getAttackDirection[directionOf][piece][dr]}"]`)
                        }
                    }
                }
                else if (_getAttackDirection[directionOf][piece][dr].toString() === kingPosition)  
                {
                    if (_getAttackDirection[directionOf][piece].includes("exclude"))
                    {
                        console.log("check with pawn or knight");
                        return {
                            occurEvent: "check with pawn or knight",
                        }
                    } else 
                    {
                        console.log("check")
                        return { 
                            occurEvent: "check",
                            atDirection: atDirection
                        }
                    }
                }
            }
        }
    } 
}

export function isAttackSquare(filePosition, rankPosition, ) {
    const getAttackDirection = getAttackDirectionFromObject();
    const concatFileRank = `${filePosition}${rankPosition}`;
    if (turn === "white") {
        for (let i = 0; i < getAttackDirection.black.length; i++ ) {
            for (let j = 0; j < getAttackDirection.black[i].length; j++) {
                if (getAttackDirection.black[i][j] === concatFileRank ) {
                    console.log("there block square!!!!!!!!!!");
                    return true;
                }
            }
        }
    }
    return false;
    
}