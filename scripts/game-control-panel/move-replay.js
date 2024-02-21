import { calculateAttackSquare } from "../AttackSquare.js";
import { getCurrentPosition } from "../position.js";
import { turn, SWITCH_TURN } from "../piecesControl.js";
import { pieces } from "../pieces.js";

let pgnList = [];
let pgnLeft, pgnRight, pgnPairIndex;
let moveList = [[[],["start"]]];
let currentMove = 0;
let position;

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
prevBtn.addEventListener("click", previous);
nextBtn.addEventListener("click", next);

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {
    previous();
  } else if (event.key === "ArrowRight") {
    next();
  }
});

function createMoveList(move){
  pgnList.push(move);  
}

function displayPgnContent (move){        
  createMoveList(move);
  
  if (pgnList.length % 2 !== 0){
    createReplayComponent();
    pgnPairIndex.innerText = (pgnList.length + 1) / 2;
  }
  
  pgnList.length % 2 !== 0 ? pgnLeft.innerText = move : pgnRight.innerText = move;
  currentMove++;
  console.log(currentMove);
}

function createReplayComponent() {
  const pgnReplayWrap = document.querySelector(".move-replay-wrap"); // get move-replay-wrap element
  
  const pgnPairWrap = document.createElement("div"); // create move-pair-wrap
  pgnLeft = document.createElement("div"); // create move-pair
  pgnRight = document.createElement("div"); // create move-pair
  pgnPairIndex = document.createElement("div"); // create move-pair-index
  
  pgnPairWrap.classList.add("move-pair-wrap"); // add move-pair-wrap class to pgnPairWrap element
  pgnLeft.classList.add("move-pair");
  pgnRight.classList.add("move-pair");
  pgnPairIndex.classList.add("move-pair-index");

  pgnReplayWrap.appendChild(pgnPairWrap);
  pgnPairWrap.appendChild(pgnPairIndex);
  pgnPairWrap.appendChild(pgnLeft);
  pgnPairWrap.appendChild(pgnRight);
}


function getPisition(fromPosition, toPosition, event, CAPTURE){
  position = [[],[]]
  position[0].push(fromPosition, toPosition);
  position[1].push(event);
  position[1].push(CAPTURE);
  moveList.push(position);  
  console.log(moveList);
}


function previous (){  
  replay("PREV");
}

function next (){
  replay("NEXT");
}


function replay(replayType){   
  console.log(moveList);

  
  if (replayType === "PREV" && currentMove !== 0) {
    const getEvent = moveList[currentMove][1][0];
    console.log("event: ", getEvent);
    changePosition(replayType, getEvent);
    
    currentMove--;
    console.log(currentMove);

  } else if (replayType === "NEXT" && currentMove + 1 !== moveList.length) {
    currentMove++;
    const getEvent = moveList[currentMove][1][0];
    console.log("event: ", getEvent);
    
    changePosition(replayType, getEvent);
  }
  console.log(currentMove , moveList.length)
}


function changePosition (replayType, event){
  if (replayType === "PREV") {
    const getMoveInfo = [...moveList[currentMove]];
    const piece = document.querySelector(`[position="${getMoveInfo[0][1]}"]`);
    const pieceId = piece.id;  
    const toPosition = getMoveInfo[0][0];
    const toFile = parseInt(toPosition[0]);
    const toRank = parseInt(toPosition[1]);
    
    piece.style.transform = `translate(${toFile * 100}px, ${toRank * 100}px)`;
    pieces[parseInt(pieceId)].position.file = toFile;
    pieces[parseInt(pieceId)].position.rank = toRank;
    piece.setAttribute("position", toPosition[0] + toPosition[1]);

    console.log(getMoveInfo[1][1]);
    if (event === "capture") {
      console.log("prev capture");
      console.log(getMoveInfo[1][1]);
      const capturedPiece = getMoveInfo[1][1]; 
      const capturedPieceId = capturedPiece.id;
      console.log("capture id: ", capturedPieceId);
      const toPosition = getMoveInfo[0][1]
      
      capturedPiece.style.transform = `translate(${parseInt(getMoveInfo[0][1][0]) * 100}px, ${parseInt(getMoveInfo[0][1][1]) * 100}px)`;
      pieces[parseInt(capturedPieceId)].position.file = parseInt(toPosition[1]);
      pieces[parseInt(capturedPieceId)].position.rank = parseInt(toPosition[2]);
      capturedPiece.setAttribute("position", toPosition[0] + toPosition[1]);
    }

    SWITCH_TURN(turn);    
    getCurrentPosition();
    calculateAttackSquare();        
  } else if (replayType === "NEXT"){    
    const getMoveInfo = [...moveList[currentMove]];
    const piece = document.querySelector(`[position="${getMoveInfo[0][0]}"]`);
    const pieceId = piece.id;
    const toPosition = getMoveInfo[0][1];
    const toFile = parseInt(toPosition[0]);
    const toRank = parseInt(toPosition[1]);

    piece.style.transform = `translate(${toFile * 100}px, ${toRank * 100}px)`;
    pieces[parseInt(pieceId)].position.file = toFile;
    pieces[parseInt(pieceId)].position.rank = toRank;
    piece.setAttribute("position", toPosition[0] + toPosition[1]);

    if (event === "capture") {
      console.log("prev capture");
      const capturedPiece = getMoveInfo[1][1];
      console.log("capturePiece", capturedPiece);
      // const capturedPiece =  document.querySelector(`[position="-${getMoveInfo[0][1]}"]`);
      const capturedPieceId = capturedPiece.id;
      console.log("capture id: ", capturedPieceId);
      const toPosition = getMoveInfo[0][1]
      
      capturedPiece.style.transform = `translate(${-1000}px, ${-1000}px)`;
      pieces[parseInt(capturedPieceId)].position.file = -1000;
      pieces[parseInt(capturedPieceId)].position.rank = -1000;      
      capturedPiece.setAttribute("position", `-${toPosition[0]}${toPosition[1]}`);
      console.log(capturedPiece)

      // position[1][0] = ["capture"];
    }

    SWITCH_TURN(turn);
    getCurrentPosition();
    calculateAttackSquare();    
  }
}

const Replay = {
  displayPgnContent: displayPgnContent,
  getPosition: getPisition
}

export default Replay;