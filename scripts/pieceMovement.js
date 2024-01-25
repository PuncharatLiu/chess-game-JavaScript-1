import { pieces } from "./pieces.js";
// import { validSquare } from "./validateSquare.js";

let getPieceId, getFile, getColumn, position, getPiece;
export function handleClick(event){
    let startPosition = true; 
    
    if (startPosition) {
        getPieceId = event.target.id;
        getPiece = document.getElementById(getPieceId);
        // let selectedPiece = pieces[getPieceId];
        let selectedPiece = pieces[getPieceId];
        
        // get file and column 
        getFile = selectedPiece.position.x;
        getColumn = selectedPiece.position.y;

        
        validSquare();
        startPosition = false;

    } else {
        changePosition();
        startPosition = true;
    }

    
    // test
    console.log(getPieceId); 
    console.log('file ', getFile);
    console.log('column ', getColumn );

}


function changePosition(){
    let squareToGo = event.target;
    let getPosition = squareToGo.style.transform;
    getPiece.style.transform = getPosition;

    console.log(getPosition);

}


function validSquare(){
    // Black Rook valid move  
    if (getPieceId === '0' || getPieceId === '7' ) {
        const chessBoard = document.getElementById('chess-board');
        let numberOfLeftMove = getFile - 1;
        let numberOfRightMove = getFile + 1;
        let numberOfUpMove = getColumn - 1;
        let numberOfDownMove = getColumn + 1;
        // left move 
        for (numberOfLeftMove ; numberOfLeftMove >= 0; numberOfLeftMove--) {
            const chessPiece = document.createElement('div');
            // move diretion of black rook
            chessPiece.style.transform = `translate(${(numberOfLeftMove) * 100}px, ${(getColumn) * 100}px)`;
            chessPiece.className = 'chess-piece highlight' ;
            chessBoard.appendChild(chessPiece);
            
            console.log('create select ');
        }
        // right move 
        for (numberOfRightMove; numberOfRightMove <= 7; numberOfRightMove++ ) {
            const chessPiece = document.createElement('div');

            chessPiece.style.transform = `translate(${(numberOfRightMove) * 100}px, ${(getColumn) * 100}px)`;
            chessPiece.className = 'chess-piece highlight' ;
            chessBoard.appendChild(chessPiece);
            
            console.log('create select ');
        } 
        // up move
        for (numberOfUpMove; numberOfUpMove >= 0; numberOfUpMove-- ) {
            const chessPiece = document.createElement('div');

            chessPiece.style.transform = `translate(${(getFile) * 100}px, ${(numberOfUpMove) * 100}px)`;
            chessPiece.className = 'chess-piece highlight' ;
            chessBoard.appendChild(chessPiece);
            
            console.log('create select ');
        }
        // down move 
        for (numberOfDownMove; numberOfDownMove <= 7; numberOfDownMove++) {
            const chessPiece = document.createElement('div');
            
            chessPiece.style.transform = `translate(${(getFile) * 100}px, ${(numberOfDownMove) * 100}px)`;
            chessPiece.className = 'chess-piece highlight' ;
            chessPiece.id = "hint-move";
            chessPiece.addEventListener('click', changePosition);

            chessBoard.appendChild(chessPiece);
            
            console.log('create select ');
            // console.log(position);
        }
    }
}