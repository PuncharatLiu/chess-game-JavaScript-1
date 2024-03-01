import {
  setTake,
  turn,
  overlapBlack,
  overlapWhite,
  changeDefualtPosition,
  pieces,
  PGN
} from "../modules/index.js";

export function capture(getFilePosition, getRankPosition, filePart, rankPart) {
  const storeFR = filePart + rankPart;
  const pgn = new PGN();

  // console.log(storeFR);
  if (turn === "white") {
    if (overlapBlack.includes(storeFR)) {
      let getEnemyPosition = document.querySelector(
        `[position="${filePart}${rankPart}"]`,
      );
      let getEnemyId = getEnemyPosition.id;

      let getEnemyElement = document.getElementById(getEnemyId);
      getEnemyElement.setAttribute("position", "taken");

      if (getEnemyPosition) {
        getEnemyPosition.style.transform = `translate(${-1000}px, ${-1000}px)`;

        pieces[getEnemyId].position.file = -1000;
        pieces[getEnemyId].position.rank = -1000;
        changeDefualtPosition(
          getFilePosition,
          getRankPosition,
          filePart,
          rankPart,
        );
        setTake(true);
        return true;
      }
    }
  } else {
    if (overlapWhite.includes(storeFR)) {
      let getEnemyPosition = document.querySelector(
        `[position="${filePart}${rankPart}"]`,
      );
      let getEnemyId = getEnemyPosition.id;

      let getEnemyElement = document.getElementById(getEnemyId);
      getEnemyElement.setAttribute("position", "taken");

      if (getEnemyPosition) {
        getEnemyPosition.style.transform = `translate(${-1000}px, ${-1000}px)`;

        pieces[getEnemyId].position.file = -1000;
        pieces[getEnemyId].position.rank = -1000;
        changeDefualtPosition(
          getFilePosition,
          getRankPosition,
          filePart,
          rankPart,
        );

        // take = true;
        setTake(true);
        //pgn.capture(true);

        return true;
      }
    }
  }
  changeDefualtPosition(getFilePosition, getRankPosition, filePart, rankPart);
}
