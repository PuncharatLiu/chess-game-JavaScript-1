let moveList = [];
let moveLeft, moveRight, movePairIndex;

function moveReplay() {
  function createMoveList(move){
    moveList.push(move);  
  }

  function displayReplayContent (move){        
    createMoveList(move);
    
    if (moveList.length % 2 !== 0){
      createReplayComponent();
      movePairIndex.innerText = (moveList.length + 1) / 2;
    } 

    moveList.length % 2 !== 0 ? moveLeft.innerText = move : moveRight.innerText = move;
  }

  function createReplayComponent() {
    const moveReplayWrap = document.querySelector(".move-replay-wrap"); // get move-replay-wrap element
    
    const movePairWrap = document.createElement("div"); // create move-pair-wrap
    moveLeft = document.createElement("div"); // create move-pair
    moveRight = document.createElement("div"); // create move-pair
    movePairIndex = document.createElement("div"); // create move-pair-index
    
    movePairWrap.classList.add("move-pair-wrap"); // add move-pair-wrap class to movePairWrap element
    moveLeft.classList.add("move-pair");
    moveRight.classList.add("move-pair");
    movePairIndex.classList.add("move-pair-index");

    moveReplayWrap.appendChild(movePairWrap);
    movePairWrap.appendChild(movePairIndex);
    movePairWrap.appendChild(moveLeft);
    movePairWrap.appendChild(moveRight);
  }

  return {
    displayReplayContent: displayReplayContent
  }
}

export default moveReplay;