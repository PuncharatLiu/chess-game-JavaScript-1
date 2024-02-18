import {Is} from "./pieces.js"
import {getPieceId} from "./piecesControl.js";

class PGN {
  constructor() {
    this.convertFile = "";
    this.convertRank = "";
    this.position = "";
    this.strPiece = "";
  }

  convertPosition(file, rank) {
    switch (file) {
      case 0:
        this.convertFile = "a";
        break;
      case 1:
        this.convertFile = "b";
        break;
      case 2:
        this.convertFile = "c";
        break;
      case 3:
        this.convertFile = "d";
        break;
      case 4:
        this.convertFile = "e";
        break;
      case 5:
        this.convertFile = "f";
        break;
      case 6:
        this.convertFile = "g";
        break;
      case 7:
        this.convertFile = "h";
        break;
      default:
        break;
    }

    switch(rank){
      case 0:
        this.convertRank = "8";
        break;
      case 1:
        this.convertRank = "7";
        break;
      case 2:
        this.convertRank = "6";
        break;
      case 3:
        this.convertRank = "5";
        break;
      case 4:
        this.convertRank = "4";
        break;
      case 5:
        this.convertRank = "3";
        break;
      case 6:
        this.convertRank = "2";
        break;
      case 7:
        this.convertRank = "1";
        break;
      default:
        break;
    }
    
    this.positon = this.convertFile + this.convertRank;
  }

  pieceNotation(){  
    if (Is.rook(getPieceId)){
      this.strPiece = "R";
    } else if (Is.knight(getPieceId)){
      this.strPiece = "N"
    } else if (Is.bishop(getPieceId)){
      this.strPiece = "B";
    } else if (Is.queen(getPieceId)){
      this.strPiece = "Q";
    } else if (Is.king(getPieceId)){
      this.strPiece = "K"
    }

    console.log("notation: ", this.strPiece + this.positon);
  }
}

export default PGN;
