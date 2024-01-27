// import { pieces } from "./pieces.js";
// // import { validSquare } from "./validateSquare.js";

// let getPieceId, getFile, getRank, getPiece;
// let isSamePiece = "";
// let startPosition = true;

// function handleClick(event){
    
//     // when click same piece it unstate
//     if (getPieceId === isSamePiece) {    
//         removeValidMove();
//         return;
//     }

//     if (startPosition) {
//         getPieceId = event.target.id;
//         getPiece = document.getElementById(getPieceId);
//         // let selectedPiece = pieces[getPieceId];
//         let selectedPiece = pieces[getPieceId];
            
//         // get file and column 
//         getFile = selectedPiece.position.x;
//         getRank = selectedPiece.position.y;

//         // generate and calculate valid square
//         validSquare(getPieceId, getFile, getRank, startPosition);
//         isSamePiece = getPieceId;
        
//     } else {
//         console.log('change positon already');
//         validSquare();
//         // change the position 
//         changePosition(event);
        
//         startPosition = true;
//     }

    
//     // test
//     console.log(getPieceId); 
//     console.log('file ', getFile);
//     console.log('column ', getRank );

// }

// function changePosition(event){
//     let squareToGo = event.target;
//     let getPosition = squareToGo.style.transform;
//     getPiece.style.transform = getPosition;

//     console.log(getPosition);

// }

// function removeValidMove() {
//     // Remove existing highlighted squares
//     const getValidSquare = document.querySelectorAll('.chess-piece.highlight');
//     console.log(getValidSquare);
//     getValidSquare.forEach(function(div) {
//         div.remove();
//     });

//     isSamePiece = "";
//     // startPosition = true;

    

// }