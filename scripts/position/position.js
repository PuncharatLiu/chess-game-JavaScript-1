import { pieces, getPieceId } from "../modules/index.js";

export let overlapBlack = [];
export let overlapWhite = [];
export let whitePieceIndex = [];
export let blackPieceIndex = [];

export function changeDefualtPosition(
  getFilePosition,
  getRankPosition,
  filePart,
  rankPart,
) {
  pieces[getPieceId].position.file = getFilePosition;
  pieces[getPieceId].position.rank = getRankPosition;

  let getPieceElement = document.getElementById(getPieceId);
  getPieceElement.setAttribute("position", filePart + rankPart);

  overlapWhite = [];
  overlapBlack = [];

  getCurrentPosition();
}

export function getCurrentPosition() {
  overlapWhite = [];
  overlapBlack = [];

  for (let i = 16; i <= 31; i++) {
    let pair =
      pieces[i].position.file.toString() + pieces[i].position.rank.toString();
    overlapWhite.push(pair);

    let getPiece = document.querySelector(`[position="${pair}"]`);
    let getId = getPiece?.id;
    whitePieceIndex.push(getId);
  }

  for (let i = 0; i <= 15; i++) {
    let pair =
      pieces[i].position.file.toString() + pieces[i].position.rank.toString();
    overlapBlack.push(pair);

    let getPiece = document.querySelector(`[position="${pair}"]`);
    let getId = getPiece?.id;
    blackPieceIndex.push(getId);
  }
}

export function clearPosition(overlapBlack, overlapWhite) {
  overlapBlack = [];
  overlapWhite = [];
}

export function overlap() {
  overlapBlack = [];
  overlapWhite = [];
  return {
    overlapBlack,
    overlapWhite,
  };
}

