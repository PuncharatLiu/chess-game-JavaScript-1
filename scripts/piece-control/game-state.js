export let take = false;
export let pawnMove = false;
export let getPieceId;
export let getFile;
export let getRank;
export let turn = "white";
export let playWithEngine = false;
// export let playAs = '';
export let invertTurn;
invertTurn = turn === "white" ? (invertTurn = "black") : (invertTurn = "white");

const urlParams = new URLSearchParams(window.location.search);
export const mode = urlParams.get("mode");

export const setTurn = (prevTurn) => {
  turn = prevTurn === "white" ? "black" : "white";
  invertTurn = turn === "white" ? "black" : "white";
}

export const setPlayWithEngine = (newValue) => {
  playWithEngine = newValue;
}

export const setTake = (newValue) => {
  take = newValue;
}

export const setPawnMove = (newValue) => {
  pawnMove = newValue;
}

export const setPieceId = (newValue) => {
  getPieceId = newValue;
}

export const setFile = (newValue) => {
  getFile = newValue;
}

export const setRank = (newValue) => {
 getRank = newValue;
}

export function playerSide() {
  return turn === "white";
}