import { pieces } from "./pieces.js";
import { validSquare } from "./validateSquare.js";

let getPieceId, getFile, getRank, getPiece;
let isSamePiece = "";
let startPosition = true;

export function handleClick(event){
    
    // when click same piece it unstate
    if (getPieceId === isSamePiece) {    
        // Remove existing highlighted squares
        const getHintSquare = document.querySelectorAll('.chess-piece.highlight');
        getHintSquare.forEach(function(div) {
            div.remove();
        });

        isSamePiece = "";
        startPosition = true;

        return;
    }
    
    if (startPosition) {
        getPieceId = event.target.id;
        getPiece = document.getElementById(getPieceId);
        // let selectedPiece = pieces[getPieceId];
        let selectedPiece = pieces[getPieceId];
            
        // get file and column 
        getFile = selectedPiece.position.x;
        getRank = selectedPiece.position.y;

        // generate and calculate valid square
        validSquare(getPieceId, getFile, getRank, startPosition, changePosition);
        isSamePiece = getPieceId;
        
    } else {
        // change the position 
        changePosition(event);
        startPosition = true;
    }

    
    // test
    console.log(getPieceId); 
    console.log('file ', getFile);
    console.log('column ', getRank );

}

function changePosition(){
    let squareToGo = event.target;
    let getPosition = squareToGo.style.transform;
    getPiece.style.transform = getPosition;

    console.log(getPosition);

}