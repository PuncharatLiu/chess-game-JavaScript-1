import { Is } from "./pieces.js";
import { getPieceId } from "./piecesControl.js";
import KingEvent from "./handleKingEvent.js"

class PGN {
  constructor(file, rank, overlapBlack, overlapWhite) {
    this.file = file;
    this.rank = rank;
    this.pgnPair = [];    
    this.kingEvent = new KingEvent(overlapBlack, overlapWhite);
  }


  pgn(event, fileBackUp) {
    const majorPiece = ["R", "N", "B", "Q", "K"];
    const isMajor = majorPiece.includes(this.pieceNotation())
    let pawnFile
    
    if (fileBackUp) {pawnFile = parseInt(fileBackUp[0])};

    switch(event){
      case "capture":
        if (isMajor){
          return this.pieceNotation() + "x" + this.pgnFile(this.file) + this.pgnRank(this.rank);
        } else {          
          return this.pgnFile(parseInt(pawnFile)) + "x" + this.pgnFile(this.file) + this.pgnRank(this.rank);
        }
      case "check":
        if (isMajor){          
          return this.pieceNotation() + this.pgnFile(this.file) + this.pgnRank(this.rank) + "+"
        } else {          
          return this.pgnFile(this.file) + this.pgnRank(this.rank) + "+";
        }
      case "captureWithCheck":        
        if (isMajor){
          return this.pieceNotation() + "x" + this.pgnFile(this.file) + this.pgnRank(this.rank) + "+";
        } else {          
          return "x" + this.pgnFile(this.file) + this.pgnRank(this.rank) + "+";
        }
      case "shortCastle":
        return "O-O";
      default:
        if (isMajor){          
          return this.pieceNotation() + this.pgnFile(this.file) + this.pgnRank(this.rank);   
        } else {          
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
      return this.pgnFile(parseInt(this.fileBackUp));
    }
  } 
}

export default PGN;
