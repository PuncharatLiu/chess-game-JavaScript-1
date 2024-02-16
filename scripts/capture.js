import { TAKE, turn } from "./piecesControl.js";
import { overlapBlack, overlapWhite, changeDefualtPosition } from "./position.js";
import { pieces } from "./pieces.js";

export function capture(getFilePosition, getRankPosition, filePart, rankPart) {
    const storeFR = filePart + rankPart;
    // console.log(storeFR);
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

                // take = true;
                TAKE(true);
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

                // take = true;
                TAKE(true);
            }
        }
    }
    changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart);
}