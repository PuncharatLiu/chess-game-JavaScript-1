import { getPieceId, getFile, getRank, getRankPosition } from "./main.js";
import { createValidSquare } from "./createValidMove.js";

export function handleEnPosition() {
    const checkForEnPosition = () => {
        if (getPieceId >= 8 && getPieceId <= 15 && getRankPosition === 3) {
            const getLeftWPawn = document.querySelector(`[position="${getFile - 1}${3}"]`);
            const getRightWPawn = document.querySelector(`[position="${getFile + 1}${3}"]`);
            const getCurrentPawn = document.getElementById(getPieceId);

            if (getLeftWPawn?.classList.contains('white', 'pawn') && getCurrentPawn?.hasAttribute('tw')) {
                return `${getFile}${6}`;

            } 
            else if (getRightWPawn?.classList.contains('white', 'pawn') && getCurrentPawn?.hasAttribute('tw')) {
                return `${getFile}${6}`;
            }
        } else if (getPieceId >= 15 && getPieceId <= 23 && getRankPosition === 4) {
            const getLeftBPawn = document.querySelector(`[position="${getFile - 1}${4}"]`);
            const getRightBPawn = document.querySelector(`[position="${getFile + 1}${4}"]`);
            const getCurrentPawn = document.getElementById(getPieceId);

            if (getLeftBPawn?.classList.contains('black', 'pawn') && getCurrentPawn?.hasAttribute('tw')) {
                return `${getFile}${3}`;
            } else if (getRightBPawn?.classList.contains('black', 'pawn') && getCurrentPawn?.hasAttribute('tw')) {
                return `${getFile}${3}`;
            }
        }
    }

    return checkForEnPosition();
}

let isEnPassant = false;
export function enPassantState(twoSquare){
    if (!isEnPassant) {
        if (getPieceId >= 16 && getPieceId <= 23 && getRank === 3) {
            const leftBPiece = document.querySelector(`[position="${getFile - 1}${getRank}"]`);
            const rightBPiece = document.querySelector(`[position="${getFile + 1}${getRank}"]`);
            
            const isLeftBPawn = leftBPiece?.classList.contains('black', 'pawn');
            const isRightBPawn = leftBPiece?.classList.contains('black', 'pawn');
            const isTwLpawn = leftBPiece?.hasAttribute('tw');
            const isTwRpawn = rightBPiece?.hasAttribute('tw');
            const lPawnId = leftBPiece?.id;
            const rPawnId = rightBPiece?.id; 

            if (isLeftBPawn && isTwLpawn) {
                console.log('get In twl', getFile, getRank);
                createValidSquare(getFile - 1, getRank - 1, undefined, true, lPawnId);
                en = `${getFile - 1}${getRank - 1}`;
            }
            if (isRightBPawn && isTwRpawn) {
                createValidSquare(getFile + 1, getRank - 1, undefined, true, rPawnId);
                en = `${getFile + 1}${getRank - 1}`;
            }
        }
        else if (getPieceId >= 8 && getPieceId <= 15 && getRank === 4) {
            const leftWPiece = document.querySelector(`[position="${getFile - 1}${getRank}"]`);
            const rightWPiece = document.querySelector(`[position="${getFile + 1}${getRank}"]`);
            
            const isLeftWPawn = leftWPiece?.classList.contains('white', 'pawn');
            const isRightWPawn = leftWPiece?.classList.contains('white', 'pawn');
            const isTwLpawn = leftWPiece?.hasAttribute('tw');
            const isTwRpawn = rightWPiece?.hasAttribute('tw');
            const lPawnId = leftWPiece?.id;
            const rPawnId = rightWPiece?.id;

            if (isLeftWPawn && isTwLpawn) {
                createValidSquare(getFile - 1, getRank + 1, undefined, true, lPawnId);
                en = `${getFile - 1}${getRank + 1}`; 
            } 
            if (isRightWPawn && isTwRpawn) {
                createValidSquare(getFile + 1, getRank + 1, undefined, true, rPawnId);
                en = `${getFile + 1}${getRank + 1}`;
            }
        }
    }
}

export function enPassant(pawnId) {
    const getPawnEle = document.getElementById(pawnId);
    getPawnEle.style.transform = `translate(${-1000}px, ${-1000}px)`;
    getPawnEle.setAttribute('position', 'taken');
    
    if (getPawnEle.classList.contains('black', 'pawn')) {
        pieces[getPieceId].position.rank = (pieces[pawnId].position.rank) - 1;     
    } else {
        pieces[getPieceId].position.rank = (pieces[pawnId].position.rank) + 1;     
    }
    
    pieces[getPieceId].position.file = pieces[pawnId].position.file;
    pieces[pawnId].position.file = -100;
    pieces[pawnId].position.rank = -100;
    

    console.log('piece', pieces);

    changeDefualtPosition();
    getCurrentPosition();

    isEnPassant = true;
    
}