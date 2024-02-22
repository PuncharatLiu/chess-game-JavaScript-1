import { removeValidMove, turn } from "./piecesControl.js";
import { pieces } from "./pieces.js";
import { getCurrentPosition } from "./position.js";
import { playWithEngine } from "./piecesControl.js";
import { SWITCH_TURN } from "./piecesControl.js";
import { overlapBlack, overlapWhite } from "./position.js";
import { clearPosition } from "./position.js";
import { overlap } from "./position.js";
import { playerSide } from "./piecesControl.js";
import { generateFen } from "./generateFen.js";
import { sendMoveToEngine } from "./main.js";
import Replay from "./game-control-panel/move-replay.js";
import PGN from "./PGN.js";

export let isWhiteCastle = false;
export let isBlackCastle = false;

// create short castle square for black and white
export function shortCastleSquare(filePosition, rankPosition) {
  const chessBoard = document.getElementById("chess-board");
  const validSquare = document.createElement("div");
  validSquare.style.transform = `translate(${filePosition * 100}px, ${rankPosition * 100}px)`;
  validSquare.className = "valid-square";
  validSquare.id = `${filePosition} ${rankPosition}`;

  validSquare.addEventListener("click", function (event) {
    shortCastle(event);
  });

  chessBoard.appendChild(validSquare);
}

export function longCastlesquare(filePosition, rankPosition) {
  const chessBoard = document.getElementById("chess-board");
  const validSquare = document.createElement("div");
  validSquare.style.transform = `translate(${filePosition * 100}px, ${rankPosition * 100}px)`;
  validSquare.className = "valid-square";
  validSquare.id = `${filePosition} ${rankPosition}`;

  validSquare.addEventListener("click", function (event) {
    longCastle(event);
  });

  chessBoard.appendChild(validSquare);
}

// short castle for black and white
export function shortCastle() {
  const pgn = new PGN(overlapBlack, overlapWhite);

  let getWhiteRook = document.getElementById("31"); // get white rook element
  let getWhiteKing = document.getElementById("28"); // get white element

  let getBlackRook = document.getElementById("7"); // get black rook elment
  let getBlackKing = document.getElementById("4"); // get black king element

  if (turn === "white") {
    getWhiteRook.style.transform = `translate(${500}px, ${700}px)`;
    getWhiteRook.setAttribute("position", "57");
    getWhiteKing.style.transform = `translate(${600}px, ${700}px)`;
    getWhiteKing.setAttribute("position", "67");
    pieces[31].position.file = 5;
    pieces[31].position.rank = 7;
    pieces[28].position.file = 6;
    pieces[28].position.rank = 7;
    isWhiteCastle = true;
    overlap();
    console.log("is clear; ", overlapWhite);
    getCurrentPosition();
    removeValidMove();
    if (playWithEngine) {
      if (playerSide()) {
        generateFen(4, 7, 6, 7, "white", isWhiteCastle);
        sendMoveToEngine(
          generateFen(7, 7, 5, 7, "white", isWhiteCastle),
          "player",
        );
      } else {
        generateFen(4, 7, 6, 7, "white", isWhiteCastle);
        sendMoveToEngine(
          generateFen(7, 7, 5, 7, "white", isWhiteCastle),
          "engine",
        );
      }
    } else {
      generateFen(4, 7, 6, 7, "white", isWhiteCastle);
      sendMoveToEngine(
        generateFen(7, 7, 5, 7, "white", isWhiteCastle),
        "player",
      );
    }
    SWITCH_TURN("white");
    console.log("rook castle", overlapWhite);

    Replay.displayPgnContent(pgn.pgn("shortCastle"));
    Replay.getPosition(28, 31, "shortCastle", "white");
  } else if (turn === "black") {
    getBlackRook.style.transform = `translate(${500}px, ${0}px)`;
    getBlackRook.setAttribute("position", "50");
    getBlackKing.style.transform = `translate(${600}px, ${0}px)`;
    getBlackKing.setAttribute("position", "60");
    pieces[7].position.file = 5;
    pieces[7].position.rank = 0;
    pieces[4].position.file = 6;
    pieces[4].position.rank = 0;
    isBlackCastle = true;
    overlap();
    getCurrentPosition();
    removeValidMove();
    if (playWithEngine) {
      if (playerSide()) {
        generateFen(4, 0, 6, 0, "black", isBlackCastle);
        sendMoveToEngine(
          generateFen(7, 0, 5, 0, "black", isBlackCastle),
          "player",
        );
      } else {
        generateFen(4, 0, 6, 0, "black", isBlackCastle);
        sendMoveToEngine(
          generateFen(7, 0, 5, 0, "white", isWhiteCastle),
          "engine",
        );
      }
    } else {
      generateFen(4, 0, 6, 0, "black", isBlackCastle);
      sendMoveToEngine(
        generateFen(7, 0, 5, 0, "black", isBlackCastle),
        "player",
      );
    }
    SWITCH_TURN("black");
    Replay.displayPgnContent(pgn.pgn("shortCastle"));
    Replay.getPosition(4, 7, "shortCastle", "black");
  }
}

export function longCastle() {
  const pgn = new PGN(overlapBlack, overlapWhite);

  let getWhiteRook = document.getElementById("24"); // get white rook element
  let getWhiteKing = document.getElementById("28"); // get white king element

  let getBlackRook = document.getElementById("0"); // get black rook element
  let getBlackKing = document.getElementById("4"); // get black king element

  if (turn === "white") {
    getWhiteRook.style.transform = `translate(${300}px, ${700}px)`;
    getWhiteRook.setAttribute("position", "37");
    getWhiteKing.style.transform = `translate(${200}px, ${700}px)`;
    getWhiteKing.setAttribute("position", "27");
    pieces[24].position.file = 3;
    pieces[24].position.rank = 7;
    pieces[28].position.file = 2;
    pieces[28].position.rank = 7;
    isWhiteCastle = true;
    overlap();
    getCurrentPosition();
    removeValidMove();
    generateFen(4, 7, 2, 7, "black", isWhiteCastle);
    generateFen(0, 7, 3, 7, "black", isWhiteCastle);
    SWITCH_TURN("white");

    Replay.displayPgnContent(pgn.pgn("longCastle"));
    Replay.getPosition(28, 24, "longCastle", "white");
  } else if (turn === "black") {
    getBlackRook.style.transform = `translate(${300}px, ${0}px)`;
    getBlackRook.setAttribute("position", "30");
    getBlackKing.style.transform = `translate(${200}px, ${0}px)`;
    getBlackKing.setAttribute("position", "20");
    pieces[0].position.file = 3;
    pieces[0].position.rank = 0;
    pieces[4].position.file = 2;
    pieces[4].position.rank = 0;
    isBlackCastle = true;
    overlap();
    getCurrentPosition();
    removeValidMove();
    generateFen(4, 0, 2, 0, "white", isBlackCastle);
    generateFen(0, 0, 3, 0, "white", isBlackCastle);
    SWITCH_TURN("black");

    Replay.displayPgnContent(pgn.pgn("longCastle"));
    Replay.getPosition(4, 0, "longCastle", "black");

    return;
  }

  getCurrentPosition();
}

