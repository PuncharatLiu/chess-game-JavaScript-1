import { calculateAttackSquare } from "./AttackSquare.js";
import { turn } from "./piecesControl.js";

class KingEvent {
    constructor(overlapBlack, overlapWhite) {
        this.direction = calculateAttackSquare();
        this.opponentDirection = turn === "white" ? 'black' : 'white';
        this.kingPosition = turn === "white" ? overlapWhite[12] : overlapBlack[4];
    }    

    isCheck(){
        for (let direc = 0; direc < this.direction.attackDirection[this.opponentDirection].length; direc++){
            let getDirection = this.direction.attackDirection[this.opponentDirection][direc];

            if (getDirection?.includes(this.kingPosition)) {
                return true;
            }
        }
    }

    isPin(){
        let stack = [];
        dr: for (let direc = 0; direc < this.direction.pinDirection[this.opponentDirection].length; direc++) {
            let getDirection = this.direction.pinDirection[this.opponentDirection][direc];
            
            for (let square = 2; square < this.direction.pinDirection[this.opponentDirection][direc].length; square++) {
                let getSquare = this.direction.pinDirection[this.opponentDirection][direc][square];
                let getPiece = document.querySelector(`[position="${getSquare}"]`);
                let emptySquare = getPiece === null;
                let opponentPiece = getPiece?.classList.contains(this.opponentDirection);
                let selfPiece = getPiece?.classList.contains(turn);
                let notKing = getSquare !== this.kingPosition;

                if (!getDirection.includes(this.kingPosition)){
                    continue dr;
                }

                if (opponentPiece) {    // if see opponent, check next direction.
                    continue dr;

                } else if (selfPiece && notKing) {  // if see self piece but not king, ubdate the stack.
                    stack.push(getSquare);
                    console.log(stack)

                } else if (emptySquare) {   // if empty, skip.
                    continue;

                } else if (getSquare === this.kingPosition){ // id see self king, return true.
                    if (stack.length === 1){
                        
                        // debug
                        console.log("pin!");
                        
                        let result = true;
                        return {result, stack};
                    }
                    console.log("stack: ", stack)
                }
            }            
        }
        return false;
    }

    canKingMove(filePosition, rankPosition){
        const pair = `${filePosition}${rankPosition}`;

        dr: for (let direc = 0; direc < this.direction.attackDirection[this.opponentDirection].length; direc++){
            let getDirection = this.direction.attackDirection[this.opponentDirection][direc].slice(2);

            if (getDirection.includes(pair)) {
                return false;
            }
        }
        return true;
    }
}

export default KingEvent;