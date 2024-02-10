import { handleClick } from "./main.js";   
import { checkCastleEvenForEngine } from "./main.js";

export function handleEngineResponse (bestMove) {
   engineResponse();

   function convertEngineBestMove(index) {
    let strFilePosition;
    switch (bestMove.bestMove[index]) {
        case "a":
            strFilePosition = "0"
            break;
        case "b":
            strFilePosition = "1";
            break;
        case "c":
            strFilePosition = "2";
            break;
        case "d":
            strFilePosition = "3";
            break;
        case "e":
            strFilePosition = "4";
            break;
        case "f":
            strFilePosition = "5";
            break;``
        case "g":
            strFilePosition = "6";
            break;
        case "h":
            strFilePosition = "7";
            break;
        default:
            break;
    }

        return strFilePosition;
    }

    function engineResponse() {
        const fromSquare = convertEngineBestMove(0) + ((8 - parseInt(bestMove.bestMove[1])).toString());
        const toSquare = convertEngineBestMove(2) + ((8 - parseInt(bestMove.bestMove[3])).toString());

        const fromPiece = document.querySelector(`[position="${fromSquare}"]`);
        const fromPieceId = fromPiece.id;
        
        if (checkCastleEvenForEngine(bestMove)) { return; }
        
        handleClick(fromPiece, toSquare);
        
    }
}
