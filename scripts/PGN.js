import { Is } from "./pieces.js";
import { getPieceId } from "./piecesControl.js";

class PGN {
  constructor(file, rank) {
    this.file = file;
    this.rank = rank;
    this.pgnPair = [];
    this.pawnEle = document.getElementById(getPieceId);
    this.pawnFile = this.pawnEle.getAttribute("position");
  }

  pgn(event, bool) {
    const majorPiece = ["R", "N", "B", "Q", "K"];
    const isMajor = majorPiece.includes(this.pieceNotation())

    if (event === "capture" && bool) {
      if (isMajor){
        console.log("take: ", this.pieceNotation() + "x" + this.pgnFile(this.file) + this.pgnRank(this.rank));            
        
        return this.pieceNotation() + "x" + this.pgnFile(this.file) + this.pgnRank(this.rank);

      } else {
        console.log("take: ", this.pgnFile(parseInt(this.pawnFile[0])) + "x" + this.pgnFile(this.file) + this.pgnRank(this.rank));          

        return this.pgnFile(parseInt(this.pawnFile[0])) + "x" + this.pgnFile(this.file) + this.pgnRank(this.rank);

      }

    } else {
      
      if (isMajor) {
        console.log("move: ", this.pieceNotation() + this.pgnFile(this.file) + this.pgnRank(this.rank));
        return this.pieceNotation() + this.pgnFile(this.file) + this.pgnRank(this.rank);  

      } else {
        console.log("move: ", this.pgnFile(this.file) + this.pgnRank(this.rank));
        return this.pgnFile(this.file) + this.pgnRank(this.rank);

      }

    }
  }

  pgnFile(file) {
    switch (file) {
      case 0:
        return "a";
      case 1:
        return "b";
      case 2:
        return "c";        
      case 3:
        return "d";        
      case 4:
        return "e";        
      case 5:
        return "f";        
      case 6:
        return "g";        
      case 7:
        return "h";
      default:
        break;
    }
  }

  pgnRank(rank) {
    switch (rank) {
      case 0:
        return "8";
      case 1:
        return "7";      
      case 2:
        return "6";     
      case 3:
        return "5";      
      case 4:
        return "4";      
      case 5:
        return "3";      
      case 6:
        return "2";      
      case 7:
        return "1";      
      default:
        break;
    }
  }

  pieceNotation() {
    if (Is.rook(getPieceId)) {
      return "R";
    } else if (Is.knight(getPieceId)) {
      return "N";
    } else if (Is.bishop(getPieceId)) {
      return "B";
    } else if (Is.queen(getPieceId)) {
      return "Q";
    } else if (Is.king(getPieceId)) {
      return "K";
    } else {
      return this.pgnFile(parseInt(this.pawnFile[0]));
    }
  }
}

export default PGN;
