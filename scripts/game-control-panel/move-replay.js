import { calculateAttackSquare } from "../AttackSquare.js";
import { getCurrentPosition } from "../position.js";
import { turn, SWITCH_TURN } from "../piecesControl.js";
import { pieces } from "../pieces.js";
import { overlapBlack, overlapWhite } from "../position.js";

let pgnList = [];
let pgnLeft, pgnRight, pgnPairIndex;
let moveList = [[[], ["start"]]];
let currentMove = 0;
let position;

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
prevBtn.addEventListener("click", previous);
nextBtn.addEventListener("click", next);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    previous();
  } else if (event.key === "ArrowRight") {
    next();
  }
});

function createMoveList(move) {
  pgnList.push(move);
}

function highlightMovePair(currentRemove, currentAdd) {
  const movePair = document.querySelectorAll(".move-pair");
  movePair[currentRemove]?.classList.remove("move-pair-highlight");
  movePair[currentAdd]?.classList.add("move-pair-highlight");
}

function displayPgnContent(move) {
  createMoveList(move);

  if (pgnList.length % 2 !== 0) {
    createReplayComponent();
    pgnPairIndex.innerText = (pgnList.length + 1) / 2;
  }
  pgnList.length % 2 !== 0
    ? (pgnLeft.innerText = move)
    : (pgnRight.innerText = move);

  highlightMovePair(currentMove - 1, currentMove);
  currentMove++;
}

function createReplayComponent() {
  const pgnReplayWrap = document.querySelector(".move-replay-wrap"); // get move-replay-wrap element
  const pgnPairWrap = document.createElement("div"); // create move-pair-wrap
  pgnLeft = document.createElement("div"); // create move-pair
  pgnRight = document.createElement("div"); // create move-pair
  pgnPairIndex = document.createElement("div"); // create move-pair-index
  pgnPairWrap.classList.add("move-pair-wrap"); // add move-pair-wrap class to pgnPairWrap element
  pgnLeft.classList.add("move-pair"); // add "move-pair" class to left pgn
  pgnRight.classList.add("move-pair"); // add "move-pair" class to right pgn
  pgnPairIndex.classList.add("move-pair-index"); // add "move-pair-wrap" class to pgnPairWrap element.
  pgnReplayWrap.appendChild(pgnPairWrap);
  pgnPairWrap.appendChild(pgnPairIndex);
  pgnPairWrap.appendChild(pgnLeft);
  pgnPairWrap.appendChild(pgnRight);
}

function getPisition(fromPosition, toPosition, event, CAPTURE) {
  position = [[], []];
  position[0].push(fromPosition, toPosition);
  position[1].push(event);
  position[1].push(CAPTURE);
  moveList.push(position);
}

function previous() {
  replay("PREV");
}
function next() {
  replay("NEXT");
}

function replay(replayType) {
  if (replayType === "PREV" && currentMove !== 0) {
    const getEvent = moveList[currentMove][1][0];
    changePosition(replayType, getEvent);
    currentMove--;
  } else if (replayType === "NEXT" && currentMove + 1 !== moveList.length) {
    currentMove++;
    const getEvent = moveList[currentMove][1][0];
    changePosition(replayType, getEvent);
  }
}

function changePosition(replayType, event) {
  if (replayType === "PREV") {
    highlightMovePair(currentMove - 1, currentMove - 2);

    const getMoveInfo = [...moveList[currentMove]];
    if (event === "shortCastle") {
      if (getMoveInfo[1][1] === "white") {
        const kingElement = document.getElementById(getMoveInfo[0][0]);
        const rookElement = document.getElementById(getMoveInfo[0][1]);

        kingElement.style.transform = `translate(${400}px, ${700}px)`;
        rookElement.style.transform = `translate(${700}px, ${700}px)`;
        pieces[28].position.file = 4;
        pieces[28].position.rank = 7;
        pieces[31].position.file = 7;
        pieces[31].position.rank = 7;
        kingElement.setAttribute("position", "47");
        rookElement.setAttribute("position", "77");
      } else {
        const kingElement = document.getElementById(getMoveInfo[0][0]);
        const rookElement = document.getElementById(getMoveInfo[0][1]);

        kingElement.style.transform = `translate(${400}px)`;
        rookElement.style.transform = `translate(${700}px)`;
        pieces[4].position.file = 4;
        pieces[4].position.rank = 0;
        pieces[7].position.file = 7;
        pieces[7].position.rank = 0;
        kingElement.setAttribute("position", "40");
        rookElement.setAttribute("position", "70");
      }

      SWITCH_TURN(turn);
      getCurrentPosition();
      calculateAttackSquare();
      return;
    } else if (event === "longCastle") {
      if (getMoveInfo[1][1] === "white") {
        const kingElement = document.getElementById(getMoveInfo[0][0]);
        const rookElement = document.getElementById(getMoveInfo[0][1]);

        kingElement.style.transform = `translate(${400}px,${700}px)`;
        rookElement.style.transform = `translate(${0}px,${700}px)`;
        pieces[28].position.file = 4;
        pieces[28].position.rank = 7;
        pieces[24].position.file = 0;
        pieces[24].position.rank = 7;
        kingElement.setAttribute("position", "47");
        rookElement.setAttribute("position", "07");
      } else {
        const kingElement = document.getElementById(getMoveInfo[0][0]);
        const rookElement = document.getElementById(getMoveInfo[0][1]);

        kingElement.style.transform = `translate(${400}px,${0}px)`;
        rookElement.style.transform = `translate(${0}px,${0}px)`;
        pieces[4].position.file = 4;
        pieces[4].position.rank = 0;
        pieces[0].position.file = 0;
        pieces[0].position.rank = 0;
        kingElement.setAttribute("position", "40");
        rookElement.setAttribute("position", "00");
      }

      SWITCH_TURN(turn);
      getCurrentPosition();
      calculateAttackSquare();
      return;
    }

    const piece = document.querySelector(`[position="${getMoveInfo[0][1]}"]`);
    const pieceId = piece.id;
    const toPosition = getMoveInfo[0][0];
    const toFile = parseInt(toPosition[0]);
    const toRank = parseInt(toPosition[1]);

    piece.style.transform = `translate(${toFile * 100}px, ${toRank * 100}px)`;
    pieces[parseInt(pieceId)].position.file = toFile;
    pieces[parseInt(pieceId)].position.rank = toRank;
    piece.setAttribute("position", toPosition[0] + toPosition[1]);

    if (event === "capture") {
      const capturedPiece = getMoveInfo[1][1];
      const capturedPieceId = capturedPiece.id;
      const toPosition = getMoveInfo[0][1];

      capturedPiece.style.transform = `translate(${parseInt(getMoveInfo[0][1][0]) * 100}px, ${parseInt(getMoveInfo[0][1][1]) * 100}px)`;
      pieces[parseInt(capturedPieceId)].position.file = parseInt(toPosition[1]);
      pieces[parseInt(capturedPieceId)].position.rank = parseInt(toPosition[2]);
      capturedPiece.setAttribute("position", toPosition[0] + toPosition[1]);
    }
  } else if (replayType === "NEXT") {
    highlightMovePair(currentMove - 2, currentMove - 1);

    const getMoveInfo = [...moveList[currentMove]];
    if (event === "shortCastle") {
      if (getMoveInfo[1][1] === "white") {
        const kingElement = document.getElementById(getMoveInfo[0][0]);
        const rookElement = document.getElementById(getMoveInfo[0][1]);

        kingElement.style.transform = `translate(${600}px, ${700}px)`;
        rookElement.style.transform = `translate(${500}px, ${700}px)`;
        pieces[28].position.file = 6;
        pieces[28].position.rank = 7;
        pieces[31].position.file = 5;
        pieces[31].position.rank = 7;
        kingElement.setAttribute("position", "67");
        rookElement.setAttribute("position", "57");
      } else {
        const kingElement = document.getElementById(getMoveInfo[0][0]);
        const rookElement = document.getElementById(getMoveInfo[0][1]);

        kingElement.style.transform = `translate(${600}px)`;
        rookElement.style.transform = `translate(${500}px)`;
        pieces[4].position.file = 6;
        pieces[4].position.rank = 0;
        pieces[7].position.file = 5;
        pieces[7].position.rank = 0;
        kingElement.setAttribute("position", "60");
        rookElement.setAttribute("position", "50");
      }

      SWITCH_TURN(turn);
      getCurrentPosition();
      calculateAttackSquare();
      return;
    } else if (event === "longCastle") {
      if (getMoveInfo[1][1] === "white") {
        const kingElement = document.getElementById(getMoveInfo[0][0]);
        const rookElement = document.getElementById(getMoveInfo[0][1]);

        kingElement.style.transform = `translate(${200}px,${700}px)`;
        rookElement.style.transform = `translate(${300}px,${700}px)`;
        pieces[28].position.file = 2;
        pieces[28].position.rank = 7;
        pieces[24].position.file = 3;
        pieces[24].position.rank = 7;
        kingElement.setAttribute("position", "27");
        rookElement.setAttribute("position", "37");
      } else {
        const kingElement = document.getElementById(getMoveInfo[0][0]);
        const rookElement = document.getElementById(getMoveInfo[0][1]);

        kingElement.style.transform = `translate(${200}px,${0}px)`;
        rookElement.style.transform = `translate(${300}px,${0}px)`;
        pieces[4].position.file = 2;
        pieces[4].position.rank = 0;
        pieces[0].position.file = 3;
        pieces[0].position.rank = 0;
        kingElement.setAttribute("position", "20");
        rookElement.setAttribute("position", "30");
      }

      SWITCH_TURN(turn);
      getCurrentPosition();
      calculateAttackSquare();
      return;
    }

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
      const capturedPiece = getMoveInfo[1][1];
      const capturedPieceId = capturedPiece.id;
      const toPosition = getMoveInfo[0][1];

      capturedPiece.style.transform = `translate(${-1000}px, ${-1000}px)`;
      pieces[parseInt(capturedPieceId)].position.file = -1000;
      pieces[parseInt(capturedPieceId)].position.rank = -1000;
      capturedPiece.setAttribute(
        "position",
        `-${toPosition[0]}${toPosition[1]}`,
      );
    }
  }

  SWITCH_TURN(turn);
  getCurrentPosition();
  calculateAttackSquare();
}

const Replay = {
  displayPgnContent: displayPgnContent,
  getPosition: getPisition,
};

export default Replay;
