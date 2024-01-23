let classToGo, classToMove;
let squareID;
let startPosition = true;
let squareToMove;
let squareToGo;
let lastTwoClass;


function pieceControl() {
    movePiece();
}

function changePosition(squareToMove) {
    squareToGo.classList.add(classToMove);
}

function movePiece(){
    if (startPosition) {
        getID();
        squareToMove = document.getElementById(squareID);
        classToMove = squareToMove.classList;
        lastTwoClass = Array.from(classToMove).slice(-2);
        startPosition = false;
        console.log(lastTwoClass);

    } else {
        getID();
        squareToGo = document.getElementById(squareID);
        squareToGo.classList.add(...lastTwoClass);
        squareToMove.classList.remove(...lastTwoClass);
        startPosition = true;
    }
}

function getID(){
    squareID = event.target.id;
}
