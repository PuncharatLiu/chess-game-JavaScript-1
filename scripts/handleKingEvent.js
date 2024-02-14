import { calculateAttackSquare } from "./AttackSquare.js";
import { overlapBlack, overlapWhite } from "./position.js";
import { turn } from "./main.js";

let direction = calculateAttackSquare();
let opponentDirection = turn === "white" ? 'black' : 'white';
const kingPosition = turn === "white" ? overlapWhite[28] : overlapBlack[4];

export function isCheck(){
    for(let direc = 0; direc < direction.attackDirection[opponentDirection].length; direc++){
        let getDirection = direction.attackDirection[opponentDirection][direc];
                
    }
}

