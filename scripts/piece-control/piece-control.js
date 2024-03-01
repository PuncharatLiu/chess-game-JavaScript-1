import {
  handleEnPosition,
  pieces,
  validSquare,
  capture,
  calculateAttackSquare,
  KingEvent,
  generateFen,
  sendMoveToEngine,
  PGN,
  Replay,
  overlapBlack,
  overlapWhite
} from "../modules/index.js";

import {
  turn,
  take,
  pawnMove,
  getPieceId,
  getFile,
  getRank,
  playWithEngine,
  setTurn,
  setTake,
  setPawnMove,
  setPieceId,
  setFile,
  setRank,
  playerSide,
  mode,
  checkMode
} from "../modules/index.js";

// const urlParams = new URLSearchParams(window.location.search);
// const mode = urlParams.get("mode");

checkMode();

let getPiece, pieceIdBackup;
let isSamePiece = "";
let playerTurn;
let hasRun = false;

export function removeValidMove() {  
  const getValidSquare = document.querySelectorAll(".valid-square");
  getValidSquare.forEach(function (div) {
    div.remove();
  });
  isSamePiece = ""; // set to default
}

if (!playerSide() && !hasRun && mode === "pwc"){
  const startFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  sendMoveToEngine(startFEN, "player");
  hasRun = true;
}

export function handleClick(event, squareToGoFromEngine) {
  if (playWithEngine) {
    if (playerSide()) {
      pieceIdBackup = event.target.id;
      playerTurn = event.target.classList.contains(turn);
    } else {
      pieceIdBackup = event.id;
      playerTurn = event.classList.contains(turn);
    }
  } else {
    // controll for white and black
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
  if (playWithEngine) {
    if (playerSide()) setPieceId(event.target.id);    
    else setPieceId(event.id);
  } else setPieceId(event.target.id);

  getPiece = document.getElementById(getPieceId);

  // let selectedPiece = pieces[getPieceId];
  let selectedPiece = pieces[getPieceId];

  // get file and column
  // getFile = selectedPiece.position.file;
  // getRank = selectedPiece.position.rank;

  setFile(selectedPiece.position.file);
  setRank(selectedPiece.position.rank);

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
let getFilePosition;
export let getRankPosition;

export function changePosition(twoSquare, squareToGoFromEngine) {
  const getPieceEle = document.getElementById(getPieceId);
  let getAttri = getPieceEle.getAttribute("position");

  let squareToGo, getPosition, getSquareToGoFromEngine;

  if (playWithEngine) {
    if (playerSide()) {
      squareToGo = event.target; // get valid square element
      getValidSquareID = squareToGo.id;
    } else {
      getSquareToGoFromEngine = document.getElementById(
        `${squareToGoFromEngine[0]} ${squareToGoFromEngine[1]}`,
      );
      getValidSquareID = getSquareToGoFromEngine.id;
    }
  } else {
    squareToGo = event.target; // get valid square element
    getValidSquareID = squareToGo.id;
  }

  let [filePart, rankPart] = getValidSquareID.split(" "); // saparate file and rank
  getFilePosition = parseInt(filePart); // convert to number
  getRankPosition = parseInt(rankPart);

  let CAPTURE = document.querySelector(`[position="${filePart}${rankPart}"]`);

  // change position
  if (playWithEngine) {
    if (playerSide()) {
      getPosition = squareToGo.style.transform;
    } else {
      getPosition = getSquareToGoFromEngine.style.transform;
    }
  } else {
    getPosition = squareToGo.style.transform;
  }

  getPiece.style.transform = getPosition;

  const getAllPawn = document.querySelectorAll("[tw]"); //when move delete 'tw'

  getAllPawn.forEach((element) => {
    element.removeAttribute("tw");
  });

  if (twoSquare) {
    getPiece.setAttribute("tw", "tw");
  }

  const captureResult = capture(
    getFilePosition,
    getRankPosition,
    filePart,
    rankPart,
  );

  removeValidMove(); // remove valid square

  const pgn = new PGN(
    getFilePosition,
    getRankPosition,
    overlapBlack,
    overlapWhite,
  );
  let keepTurn = turn;
  let moveCheck;

  // turn === "white" ? (turn = "black") : (turn = "white"); // change player turn
  setTurn (turn);

  if (playWithEngine) {
    if (!playerSide()) {
      let FEN = generateFen(
        getFile,
        getRank,
        getFilePosition,
        getRankPosition,
        keepTurn,
        undefined,
        handleEnPosition(),
        take,
        pawnMove,
      );
      sendMoveToEngine(FEN, "player");
    } else {
      let FEN = generateFen(
        getFile,
        getRank,
        getFilePosition,
        getRankPosition,
        keepTurn,
        undefined,
        handleEnPosition(),
        take,
        pawnMove,
      );
      sendMoveToEngine(FEN, "engine");
    }
  } else {
    let FEN = generateFen(
      getFile,
      getRank,
      getFilePosition,
      getRankPosition,
      keepTurn,
      undefined,
      handleEnPosition(),
      take,
      pawnMove,
    );

    sendMoveToEngine(FEN, "player");
  }

  handleReplayEvent();
  function handleReplayEvent() {
    calculateAttackSquare();

    // take = false;
    setTake(false);
    setPawnMove(false);
    // pawnMove = false;

    const kingEvent = new KingEvent();
    const attack = kingEvent.isCheck()?.result;
    const pair = `${filePart}${rankPart}`;

    if (attack) {
      if (kingEvent.isCheckmate()) {
        moveCheck = "checkmate";        
        alert("Game Over");
      }
    }

    if (captureResult && !attack) {
      // capture but not check
      Replay.displayPgnContent(pgn.pgn("capture", getAttri));
      Replay.getPosition(getAttri, pair, "capture", CAPTURE);
    } else if (attack && captureResult === true) {
      // capture with checkmate
      if (moveCheck === "checkmate") {
        Replay.displayPgnContent(pgn.pgn("captureWithMate", getAttri));
        Replay.getPosition(getAttri, pair, "capture", CAPTURE);
        return;
      }
      // capture with check
      Replay.displayPgnContent(pgn.pgn("captureWithCheck", getAttri));
      Replay.getPosition(getAttri, pair, "capture", CAPTURE);
    } else if (
      attack &&
      captureResult === undefined &&
      moveCheck !== "checkmate"
    ) {
      // only check
      Replay.displayPgnContent(pgn.pgn("check"));
      Replay.getPosition(getAttri, pair, "move", CAPTURE);
    } else if (captureResult === undefined && !attack) {
      // just move
      Replay.displayPgnContent(pgn.pgn("", getAttri));
      Replay.getPosition(getAttri, pair, "move", CAPTURE);
    } else if (moveCheck === "checkmate") {
      Replay.displayPgnContent(pgn.pgn("checkmate", getAttri));
      Replay.getPosition(getAttri, pair, "move", CAPTURE);
    }
  }
}
