import {
  Is,
  isSelfPiece,
  isOpponentPiece,
  pieces,
  overlapBlack,
  overlapWhite,
  getCurrentPosition,
  pawnMove,
  changePosition,
  shortCastleSquare,
  longCastlesquare,
  isBlackCastle,
  isWhiteCastle,
  enPassantState,
  handleEnPosition,
  enPassant,
  KingEvent
} from "../modules/index.js";

export function validSquare(
  getPieceId,
  fromPieceId,
  turn,
  getFile,
  getRank,
  pawnMove,
) {
  const kingEvent = new KingEvent(overlapBlack, overlapWhite);
  const getClickPiece = () => {
    const clickPiece = document.getElementById(getPieceId);
    const getClickPiecePosition = clickPiece.getAttribute("position");

    return getClickPiecePosition;
  };

  function createValidSquare(
    filePosition,
    rankPosition,
    twoSquare,
    inEnState,
    pawnId,
  ) {
    // create valid move
    const chessBoard = document.getElementById("chess-board");

    // check if valid square outside board
    if (
      filePosition * 100 > 700 ||
      filePosition * 100 < 0 ||
      rankPosition * 100 < 0 ||
      rankPosition * 100 > 700
    ) {
      return;
    }

    if (
      kingEvent.isPin().result &&
      getClickPiece() === kingEvent.isPin().stack[0]
    ) {
      const getPinnedPiece = document.querySelector(
        `[position="${kingEvent.isPin().stack[0]}"]`,
      );
      const pair = `${filePosition}${rankPosition}`;

      if (!kingEvent.isPin().getDirection.includes(pair)) {
        return;
      }
    }

    if (kingEvent.isCheck()?.result) {
      // check for check event
      if (
        !kingEvent.canPieceBlock(filePosition, rankPosition) &&
        kingEvent.isCheck().kingPo !== getClickPiece()
      ) {
        return;
      }
    }

    // create valid square
    const validSquare = document.createElement("div");

    validSquare.style.transform = `translate(${filePosition * 100}px, ${rankPosition * 100}px)`;
    validSquare.className = "valid-square";
    validSquare.id = `${filePosition} ${rankPosition}`;
    validSquare.addEventListener("click", function () {
      changePosition(twoSquare);
    });

    if (inEnState) {
      validSquare.addEventListener("click", function () {
        enPassant(pawnId);
      });
    }

    chessBoard.appendChild(validSquare);
  }

  // =============================== Rook move  =========================================== //
  if (Is.rook(getPieceId, fromPieceId)) {
    horizontalVertical();
  }

  // ===================================== Night Move =========================================== //
  else if (Is.knight(getPieceId, fromPieceId)) {
    // knight move in fire and rank position
    const filePosition = [
      getFile - 1,
      getFile + 1,
      getFile - 1,
      getFile + 1,
      getFile - 2,
      getFile - 2,
      getFile + 2,
      getFile + 2,
    ];
    const rankPosition = [
      getRank + 2,
      getRank + 2,
      getRank - 2,
      getRank - 2,
      getRank + 1,
      getRank - 1,
      getRank + 1,
      getRank - 1,
    ];

    // create 7 square default if valid
    for (let i = 0; i <= 7; i++) {
      if (
        (overlapWhite.includes(
          filePosition[i].toString() + rankPosition[i].toString(),
        ) &&
          turn === "white") ||
        (overlapBlack.includes(
          filePosition[i].toString() + rankPosition[i].toString(),
        ) &&
          turn === "black")
      ) {
        continue;
      }
      createValidSquare(filePosition[i], rankPosition[i]);
    }
  }

  // ======================================= Bishop move ========================================= //
  else if (Is.bishop(getPieceId, fromPieceId)) {
    // create diagonal move
    diagonal();
  }

  // ======================================== Queen move ========================================= //
  else if (Is.queen(getPieceId, fromPieceId)) {
    // create diagonal, horizontal and vertical move
    horizontalVertical();
    diagonal();
  }

  // ========================================= King move ========================================= //
  else if (Is.king(getPieceId, fromPieceId)) {
    // all king move
    const filePosition = [
      getFile,
      getFile - 1,
      getFile + 1,
      getFile - 1,
      getFile + 1,
      getFile,
      getFile - 1,
      getFile + 1,
    ];
    const rankPosition = [
      getRank - 1,
      getRank - 1,
      getRank - 1,
      getRank,
      getRank,
      getRank + 1,
      getRank + 1,
      getRank + 1,
    ];

    // check if beside king is empty
    let isEmptyWhiteRight = overlapWhite.includes(
      (getFile + 1).toString() + getRank.toString() &&
        (getFile + 2).toString() + getRank.toString(),
    );
    let isEmptyWhiteLeft = overlapWhite.includes(
      (getFile - 1).toString() + getRank.toString() &&
        (getFile - 2).toString() + getRank.toString() &&
        (getFile - 2).toString() + getRank.toString(),
    );
    let isEmptyBlackRight = overlapBlack.includes(
      (getFile + 1).toString() + getRank.toString() &&
        (getFile + 2).toString() + getRank.toString(),
    );
    let isEmptyBlackLeft = overlapBlack.includes(
      (getFile - 2).toString() + getRank.toString() &&
        (getFile - 2).toString() + getRank.toString() &&
        (getFile - 2).toString() + getRank.toString(),
    );

    if (!isEmptyWhiteRight && turn === "white" && !isWhiteCastle) {
      shortCastleSquare(getFile + 2, getRank);
    } else if (!isEmptyWhiteLeft && turn === "white" && !isWhiteCastle) {
      longCastlesquare(getFile - 2, getRank);
    }

    if (!isEmptyBlackRight && turn === "black" && !isBlackCastle) {
      shortCastleSquare(getFile + 2, getRank);
    } else if (!isEmptyBlackLeft && turn === "black" && !isBlackCastle) {
      longCastlesquare(getFile - 2, getRank);
    }

    // calculate valid square
    for (let i = 0; i <= 7; i++) {
      if (
        // check if piece block the valid square
        (overlapWhite.includes(
          filePosition[i].toString() + rankPosition[i].toString(),
        ) &&
          turn === "white") ||
        (overlapBlack.includes(
          filePosition[i].toString() + rankPosition[i].toString(),
        ) &&
          turn === "black")
      ) {
        continue;
      }

      if (kingEvent.canKingMove(filePosition[i], rankPosition[i])) {
        createValidSquare(
          filePosition[i],
          rankPosition[i],
          undefined,
          undefined,
          undefined,
          "king",
        );
      }
    }
  }

  // ======================================= Pawn move =========================================== //
  else {
    // ================================= black pawn ======================================= //
    if (Is.blackPawn(getPieceId, fromPieceId)) {
      let pawnRank = pieces[getPieceId].position.rank;
      // let pawnRank_fromEngine = pieces[fromPieceId].position.rank;

      // check if first move of black pawn
      if (
        pawnRank * 100 === 100 ||
        pieces[fromPieceId]?.position.rank * 100 === 100
      ) {
        // generate two valid square
        for (let i = 1; i <= 2; i++) {
          const filePosition = getFile;
          const rankPosition = getRank + i;

          let blackPawnCaptueRightSquare =
            (getFile + 1).toString() + (getRank + 1).toString();
          let blackPawnCaptueLeftSquare =
            (getFile - 1).toString() + (getRank + 1).toString();

          if (
            overlapWhite.includes(blackPawnCaptueLeftSquare) &&
            turn === "black"
          ) {
            createValidSquare(getFile - 1, getRank + 1);
          }
          if (
            overlapWhite.includes(blackPawnCaptueRightSquare) &&
            turn === "black"
          ) {
            createValidSquare(getFile + 1, getRank + 1);
          }

          if (
            isSelfPiece(
              overlapBlack,
              overlapWhite,
              filePosition,
              rankPosition,
              turn,
            )
          )
            break;
          if (
            isOpponentPiece(
              overlapBlack,
              overlapWhite,
              filePosition,
              rankPosition,
              turn,
            )
          )
            break;

          if (i === 1) {
            createValidSquare(filePosition, rankPosition);
            pawnMove = true;
          } else if (i === 2) {
            createValidSquare(filePosition, rankPosition, true);
            pawnMove = true;
          }
        }
      }

      // if not a first move, create one valid square
      else {
        const filePosition = getFile;
        const rankPosition = getRank + 1;

        let blackPawnCaptueRightSquare =
          (getFile + 1).toString() + (getRank + 1).toString();
        let blackPawnCaptueLeftSquare =
          (getFile - 1).toString() + (getRank + 1).toString();

        if (
          overlapWhite.includes(blackPawnCaptueLeftSquare) &&
          turn === "black"
        ) {
          createValidSquare(getFile - 1, getRank + 1);
        }
        if (
          overlapWhite.includes(blackPawnCaptueRightSquare) &&
          turn === "black"
        ) {
          createValidSquare(getFile + 1, getRank + 1);
        }

        if (
          isSelfPiece(
            overlapBlack,
            overlapWhite,
            filePosition,
            rankPosition,
            turn,
          )
        )
          return;
        if (
          isOpponentPiece(
            overlapBlack,
            overlapWhite,
            filePosition,
            rankPosition,
            turn,
          )
        )
          return;
        createValidSquare(filePosition, rankPosition);
        enPassantState();
        pawnMove = true;
      }
    }

    // ======================================= White pawn ======================================== //
    else {
      let pawnRank = pieces[getPieceId].position.rank;

      // check if first move of white pawn
      if (
        pawnRank * 100 === 600 ||
        pieces[fromPieceId]?.position.rank * 100 === 600
      ) {
        // create two valid square
        for (let i = 1; i <= 2; i++) {
          const filePosition = getFile;
          const rankPosition = getRank - i;

          let whitePawnCaptueRightSquare =
            (getFile + 1).toString() + (getRank - 1).toString();
          let whitePawnCaptueLeftSquare =
            (getFile - 1).toString() + (getRank - 1).toString();

          if (
            overlapBlack.includes(whitePawnCaptueLeftSquare) &&
            turn === "white"
          ) {
            createValidSquare(getFile - 1, getRank - 1);
          }
          if (
            overlapBlack.includes(whitePawnCaptueRightSquare) &&
            turn === "white"
          ) {
            createValidSquare(getFile + 1, getRank - 1);
          }

          if (
            isSelfPiece(
              overlapBlack,
              overlapWhite,
              filePosition,
              rankPosition,
              turn,
            )
          )
            break;
          if (
            isOpponentPiece(
              overlapBlack,
              overlapWhite,
              filePosition,
              rankPosition,
              turn,
            )
          )
            break;

          if (i === 1) {
            createValidSquare(filePosition, rankPosition);
            pawnMove = true;
          } else if (i === 2) {
            createValidSquare(filePosition, rankPosition, true);
            pawnMove = true;
          }
        }
      }

      // create one valid square
      else {
        const filePosition = getFile;
        const rankPosition = getRank - 1;

        let whitePawnCaptueRightSquare =
          (getFile + 1).toString() + (getRank - 1).toString();
        let whitePawnCaptueLeftSquare =
          (getFile - 1).toString() + (getRank - 1).toString();

        if (
          overlapBlack.includes(whitePawnCaptueLeftSquare) &&
          turn === "white"
        ) {
          createValidSquare(getFile - 1, getRank - 1);
        }
        if (
          overlapBlack.includes(whitePawnCaptueRightSquare) &&
          turn === "white"
        ) {
          createValidSquare(getFile + 1, getRank - 1);
        }

        if (
          isSelfPiece(
            overlapBlack,
            overlapWhite,
            filePosition,
            rankPosition,
            turn,
          )
        )
          return;
        if (
          isOpponentPiece(
            overlapBlack,
            overlapWhite,
            filePosition,
            rankPosition,
            turn,
          )
        )
          return;

        createValidSquare(filePosition, rankPosition);
        enPassantState();
        pawnMove = true;
      }
    }
  }

  // ================================ horizontal and vertical move ================================ //
  function horizontalVertical() {
    // left move
    for (let i = 1; i <= getFile; i++) {
      const filePosition = getFile - i;
      const rankPosition = getRank;

      if (
        isSelfPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
      createValidSquare(filePosition, rankPosition);
      if (
        isOpponentPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
    }
    // right move
    for (let i = 1; i <= 7 - getFile; i++) {
      const filePosition = getFile + i;
      const rankPosition = getRank;

      if (
        isSelfPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
      createValidSquare(filePosition, rankPosition);
      if (
        isOpponentPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
    }
    // up move
    for (let i = 1; i <= getRank; i++) {
      const filePosition = getFile;
      const rankPosition = getRank - i;

      if (
        isSelfPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
      createValidSquare(filePosition, rankPosition);
      if (
        isOpponentPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
    }
    // down move
    for (let i = 1; i <= 7 - getRank; i++) {
      const filePosition = getFile;
      const rankPosition = getRank + i;

      if (
        isSelfPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
      createValidSquare(filePosition, rankPosition);
      if (
        isOpponentPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
    }
  }

  // ========================================== diagonal move ===================================== //
  function diagonal() {
    // up left diagonal
    for (let i = 1; i <= getFile; i++) {
      const filePosition = getFile - i;
      const rankPosition = getRank - i;

      if (
        isSelfPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
      createValidSquare(filePosition, rankPosition);
      if (
        isOpponentPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
    }
    // up right diagonal
    for (let i = 1; i <= 7 - getFile; i++) {
      const filePosition = getFile + i;
      const rankPosition = getRank - i;

      if (
        isSelfPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
      createValidSquare(filePosition, rankPosition);
      if (
        isOpponentPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
    }
    // down left diagonal
    for (let i = 1; i <= getFile; i++) {
      const filePosition = getFile - i;
      const rankPosition = getRank + i;

      if (
        isSelfPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
      createValidSquare(filePosition, rankPosition);
      if (
        isOpponentPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
    }

    // down right diagonal
    for (let i = 1; i <= 7 - getFile; i++) {
      const filePosition = getFile + i;
      const rankPosition = getRank + i;

      if (
        isSelfPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
      createValidSquare(filePosition, rankPosition);
      if (
        isOpponentPiece(
          overlapBlack,
          overlapWhite,
          filePosition,
          rankPosition,
          turn,
        )
      )
        break;
    }
  }
}

