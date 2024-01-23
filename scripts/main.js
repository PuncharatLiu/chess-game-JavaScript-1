let classToGo, classToMove;
let squareID;
let startPosition = true;
let squareToMove;
let squareToGo;
let lastTwoClass;



function pieceControl(index) {
    movePiece();
}

function movePiece(){
    let isPiece
    if (startPosition) {
        // get id from clicked square.
        getID();
        
        // get element from id.
        squareToMove = document.getElementById(squareID);
        
        // to check if the square contain a piece.
        isPiece = squareToMove.classList.contains("piece");

        // if clicked square contain piece, do the procress.
        if (isPiece) {
            // get a list of class of "squareToMove" and store in "classToMove".
            classToMove = squareToMove.classList;
            
            // I need only last two class (piece, black-pawn ....)
            lastTwoClass = Array.from(classToMove).slice(-2);
            
            // do the next procress.
            startPosition = false;
            
        }
        
        // test 
        console.log(isPiece);
        console.log(lastTwoClass);

    } else {
        getID();
        squareToGo = document.getElementById(squareID);
        isPiece = squareToGo.classList.contains("piece");

        if (isPiece) {
            // get all class
            classToGo = squareToGo.classList;
            // get last two class
            lastTwoClassOfSquareToGo = Array.from(classToGo).slice(-2);
            // remove last two class first before add new class.
            squareToGo.classList.remove(...lastTwoClassOfSquareToGo);
            squareToGo.classList.add(...lastTwoClass);
            // remove class of "squareToMove" to remove picec.
            squareToMove.classList.remove(...lastTwoClass);
            // back to the first procress
            startPosition = true;
        
        // if that square not contain a picec don't remove class
        } else {
            squareToGo.classList.add(...lastTwoClass);
            squareToMove.classList.remove(...lastTwoClass);
            startPosition = true;  
        }
    }
}

function getID(){
    squareID = event.target.id;
}

function checkValidSquare(){

}
