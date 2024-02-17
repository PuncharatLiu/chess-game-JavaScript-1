import { handleEnPosition } from "./enPassant.js";
import { pieces } from "./pieces.js";
import { validSquare } from "./handleValidMove.js";
import { capture } from "./capture.js";
import { calculateAttackSquare } from "./AttackSquare.js";
import KingEvent from "./handleKingEvent.js";
import { generateFen } from "./generateFen.js";
import {sendMoveToEngine} from "./main.js"

export let take = false;
export let pawnMove = false;
export function TAKE(bool){return take = bool;}

export let getPieceId;
export let getFile;
export let getRank
let getPiece, pieceIdBackup;
let isSamePiece = "";

export let turn = 'white';
export function SWITCH_TURN(color) {turn = color === "white" ? "black" : "white";}
let playerTurn;
let invertTurn;
invertTurn = turn === 'white' ? invertTurn = 'black' : invertTurn = 'white'; 
let storeFR;
export let playWithEngine = false;
function playerSide() {return turn === 'white';}

export function handleClick(event, squareToGoFromEngine){
    if (playWithEngine){
        if (playerSide()) {
            pieceIdBackup = event.target.id;
            playerTurn = event.target.classList.contains(turn);
        } else {
            pieceIdBackup = event.id;
            playerTurn = event.classList.contains(turn);
        }
    } else { // controll for white and black
        pieceIdBackup = event.target.id;
        playerTurn = event.target.classList.contains(turn);
    }

    // when click same piece it unstate
    if (pieceIdBackup === isSamePiece) {    
        removeValidMove();
        return;
    } 
    if (playerTurn) {
        handlePlay(event, squareToGoFromEngine);
    }
}

function handlePlay(event, squareToGoFromEngine) {
    removeValidMove();
    if (playWithEngine){
        if (playerSide()) getPieceId = event.target.id;
        else getPieceId = event.id;
    } 
    else getPieceId = event.target.id;

    getPiece = document.getElementById(getPieceId);
    
    // let selectedPiece = pieces[getPieceId];
    let selectedPiece = pieces[getPieceId];
            
    // get file and column 
    getFile = selectedPiece.position.file;
    getRank = selectedPiece.position.rank;
    
    // generate and calculate valid square
    validSquare(getPieceId, undefined, turn, getFile, getRank, pawnMove);
    
    isSamePiece = getPieceId; 

    if (playWithEngine) {
        if (!playerSide()) {
            changePosition(undefined, squareToGoFromEngine);
        }
    }
}

let getValidSquareID;
export let getFilePosition;
export let getRankPosition;
export function changePosition(twoSquare, squareToGoFromEngine)
{ 
    let squareToGo, getPosition, getSquareToGoFromEngine;

    if (playWithEngine) {
        if (playerSide()) {
            squareToGo = event.target; // get valid square element    
            getValidSquareID = squareToGo.id; 
        } else {
            getSquareToGoFromEngine = document.getElementById(`${squareToGoFromEngine[0]} ${squareToGoFromEngine[1]}`);
            getValidSquareID = getSquareToGoFromEngine.id;
        }
    } else {
        squareToGo = event.target; // get valid square element    
        getValidSquareID = squareToGo.id; 
    }
        
    let [filePart, rankPart] = getValidSquareID.split(" "); // saparate file and rank
    getFilePosition = parseInt(filePart); // convert to number
    getRankPosition = parseInt(rankPart);
        
    // change position
    if (playWithEngine){
        if (playerSide()) { getPosition = squareToGo.style.transform;}
        else { getPosition = getSquareToGoFromEngine.style.transform;}
    } 
    else {getPosition = squareToGo.style.transform;}
    
    getPiece.style.transform = getPosition;

    // when move delete 'tw'
    const getAllPawn = document.querySelectorAll('[tw]');
    getAllPawn.forEach(element => {
        element.removeAttribute('tw');
    });

    if (twoSquare) { getPiece.setAttribute("tw", "tw"); }  // mark that tw

    capture(getFilePosition, getRankPosition, filePart, rankPart);   // handle piece capture
    removeValidMove(); // remove valid square
 
    let keepTurn = turn
    turn === "white" ? turn = "black" : turn = "white";  // change player turn

    if (playWithEngine){
        if (!playerSide()){ 
            let FEN = generateFen(getFile, getRank, getFilePosition, getRankPosition, keepTurn, undefined, handleEnPosition(), take, pawnMove);
            sendMoveToEngine(FEN);
        } else {
            generateFen(getFile, getRank, getFilePosition, getRankPosition, keepTurn, undefined, handleEnPosition(), take, pawnMove);    
        }
    } else {
        let FEN = generateFen(getFile, getRank, getFilePosition, getRankPosition, keepTurn, undefined, handleEnPosition(), take, pawnMove);
        sendMoveToEngine(FEN);
    }

    calculateAttackSquare();

    const kingEvent = new KingEvent();
    // console.log(kingEvent.isCheck()?.result && kingEvent.isCheckMate());

    take = false;
    pawnMove = false;
}

export function removeValidMove() {
    // Remove existing highlighted squares
    const getValidSquare = document.querySelectorAll('.valid-square');
    
    // remove all valid square
    getValidSquare.forEach(function(div) {
        div.remove();
    });

    isSamePiece = ""; // set to default
    
}