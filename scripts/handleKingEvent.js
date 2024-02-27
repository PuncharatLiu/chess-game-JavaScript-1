import { calculateAttackSquare } from "./AttackSquare.js";
import { turn } from "./piecesControl.js";
import { overlapBlack, overlapWhite } from "./position.js";

class KingEvent {
  constructor(/*overlapBlack, overlapWhite*/) {
    this.direction = calculateAttackSquare();
    this.opponentDirection = turn === "white" ? "black" : "white";
    this.kingPosition = turn === "white" ? overlapWhite[12] : overlapBlack[4];
    this.opOverlap = turn === "white" ? overlapBlack : overlapWhite;
  }

  isCheck() {
    // check if check event occur
    for (
      let direc = 0;
      direc < this.direction.attackDirection[this.opponentDirection].length;
      direc++
    ) {
      let getDirection =
        this.direction.attackDirection[this.opponentDirection][direc];

      if (getDirection?.includes(this.kingPosition)) {
        let result = true;
        let kingPo = this.kingPosition;
        let event = "ckeck";
        return { result, kingPo, event };
      }
    }
  }

  isPin() {
    // check if pin event occur
    let stack = []; // store pinned piece

    dr: for (
      let direc = 0;
      direc < this.direction.pinDirection[this.opponentDirection].length;
      direc++
    ) {
      let getDirection =
        this.direction.pinDirection[this.opponentDirection][direc];

      for (
        let square = 2;
        square <
        this.direction.pinDirection[this.opponentDirection][direc].length;
        square++
      ) {
        let getSquare =
          this.direction.pinDirection[this.opponentDirection][direc][square];
        let getPiece = document.querySelector(`[position="${getSquare}"]`);
        let emptySquare = getPiece === null;
        let opponentPiece = getPiece?.classList.contains(
          this.opponentDirection,
        );
        let selfPiece = getPiece?.classList.contains(turn);
        let notKing = getSquare !== this.kingPosition;

        if (!getDirection.includes(this.kingPosition)) {
          continue dr;
        }

        if (opponentPiece) {
          // if see opponent, check next direction.
          continue dr;
        } else if (selfPiece && notKing) {
          // if see self piece but not king, ubdate the stack.
          stack.push(getSquare);
        } else if (emptySquare) {
          // if empty, skip.
          continue;
        } else if (getSquare === this.kingPosition) {
          // id see self king, return true.
          if (stack.length === 1) {
            let result = true;
            return { result, stack, getDirection };
          }
        }
      }
    }
    return false;
  }

  canKingMove(filePosition, rankPosition) {
    // check if valid king escape move
    const pair = `${filePosition}${rankPosition}`;

    dr: for (
      let direc = 0;
      direc < this.direction.attackDirection[this.opponentDirection].length;
      direc++
    ) {
      let getDirection =
        this.direction.attackDirection[this.opponentDirection][direc].slice(2); // not get first two

      if (getDirection.includes(pair)) {
        return false;
      }
    }
    return true;
  }

  canPieceBlock(filePosition, rankPosition) {
    const pair = `${filePosition}${rankPosition}`;

    for (
      let direc = 0;
      direc < this.direction.attackDirection[this.opponentDirection].length;
      direc++
    ) {
      const getDirection =
        this.direction.attackDirection[this.opponentDirection][direc];

      if (
        getDirection.includes(this.kingPosition) &&
        getDirection.includes(pair)
      ) {
        return true;
      }
    }
    return false;
  }

  isCheckmate() {
    const opponentAtkDirections =
      this.direction.attackDirection[this.opponentDirection];
    const selfAtkDirections = this.direction.attackDirection[turn];
    const protectDirections =
      this.direction.protectDirection[this.opponentDirection];
    const kingEscapes = this.direction.kingEscape[turn].flat();
    const pawnBlock = this.direction.pawnBlock[turn].flat();
    console.log(
      "kingProtect: ",
      this.direction.protectDirection[this.opponentDirection],
    );
    let countKingEscape = 0;

    for (const opDirection of opponentAtkDirections) {
      for (const kingEscape of kingEscapes) {
        if (opDirection.slice(2).includes(kingEscape)) {
          countKingEscape++;
          console.log("countKingEscape: ", countKingEscape);
        }
      }
    }

    for (const selfDirection of selfAtkDirections) {
      for (const protectDirection of protectDirections) {
        for (const protectSquare of protectDirection.slice(1)) {
          if (
            !selfDirection.includes("PAWN") &&
            selfDirection.includes(protectSquare) &&
            protectSquare !== this.kingPosition
          ) {
            console.log(
              "Not mate there's piece block!: ",
              selfDirection,
              protectSquare,
            );
            return false;
          } else if (selfDirection.includes("PAWN")) {
            for (const pawnAtkSquare of selfDirection) {
              if (this.opOverlap.includes(pawnAtkSquare)) {
                console.log("Not mate pawn can capture!");
                return false;
              }
            }
          } else {
            for (const pawnBlockSquare of pawnBlock) {
              if (protectDirection.includes(pawnBlockSquare)) {
                console.log("Not mate pawn can block!!!");
                return false;
              }
            }
          }
        }
      }
    }

    if (countKingEscape === kingEscapes.length) {
      console.log("No escape square");
      return true;
    }
    return false;
  }
}
export default KingEvent;
