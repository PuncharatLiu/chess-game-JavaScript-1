// // =================================================================================================== // 
// // ===================================== PIECE MOVEMENT ============================================== //
// // =================================================================================================== //

// let overlapBlack = [];
// let overlapWhite = [];

// let getPieceId, getFile, getRank, getPiece, pieceIdBackup;
// let isSamePiece = "";
// let startPosition = true;
// let whitePiece = ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
// let blackPiece = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
// let turn = 'white'
// let playerTurn;

// function movePiece(event){
//     pieceIdBackup = event.target.id;
//     playerTurn = event.target.classList.contains(turn);
//     // when click same piece it unstate
//     if (pieceIdBackup === isSamePiece) {    
//         removeValidMove();
//         return;
//     } 
//     if (playerTurn) {
//         handlePlay();
//     }
  
//     // test
//     console.log(getPieceId); 
//     console.log('file ', getFile);
//     console.log('rank ', getRank );

// }

// function handlePlay() {
//     removeValidMove();
//     getPieceId = event.target.id;
//     getPiece = document.getElementById(getPieceId);
//     console.log('getPieceId ', getPieceId);
    
//     // let selectedPiece = pieces[getPieceId];
//     let selectedPiece = pieces[getPieceId];
            
//     // get file and column 
//     getFile = selectedPiece.position.file;
//     getRank = selectedPiece.position.rank;
//     // generate and calculate valid square
//     validSquare();
//     isSamePiece = getPieceId; 
// }

// function changePosition(){
//     removeValidMove();
    
//     let squareToGo = event.target;
//     let getValidSquareID = squareToGo.id;
//     let [filePart, rankPart] = getValidSquareID.split(" ");
//     let getFilePosition = parseInt(filePart);
//     let getRankPosition = parseInt(rankPart);
//     let getPosition = squareToGo.style.transform;
//     getPiece.style.transform = getPosition;


    
   
//     changeDefualtPosition(getFilePosition, getRankPosition);
//     capture(filePart, rankPart, squareToGo);
//     console.log(pieces);
//     turn === "white" ? turn = "black" : turn = "white";

//     // test
//     console.log("file and rank", getFilePosition, getRankPosition);
//     console.log(squareToGo);

// }

// function removeValidMove() {
//     // Remove existing highlighted squares
//     const getValidSquare = document.querySelectorAll('.valid-square');
//     console.log(getValidSquare);
//     getValidSquare.forEach(function(div) {
//         div.remove();
//     });

//     isSamePiece = "";
//     startPosition = true;
// }

// let take = false;
// function changeDefualtPosition(getFilePosition, getRankPosition, pieceAttribute, piece) {
//     if (take) {
//         let element = document.querySelector(`[position="${getFilePosition}${getRankPosition}"]`)
//         let getTakenId = element.id
//         // set position to -1 (it will never same of exists positon)
//         pieces[getTakenId].position[0] = -1;
//         pieces[getTakenId].position[1] = -1;
        

//         // set to false to prepare for next take.
//         take = false;
//     } else {
//         pieces[getPieceId].position.file = getFilePosition;
//         pieces[getPieceId].position.rank = getRankPosition;
//     }

//     // change position attribute 
//     pieceAttribute = (getFilePosition).toString() + (getRankPosition).toString();
//     console.log("piece attribute", pieceAttribute)
//     getPiece.setAttribute('position', pieceAttribute);


//     overlapWhite = [];
//     overlapBlack = [];

//     getCurrentPosition();

//     console.log("overlapblack", overlapBlack);
//     console.log("overlapwhite", overlapWhite);
    
//     let element = document.querySelector(`[position="${getFilePosition}${getRankPosition}"]`)
//     let getTakenId = element.id
//     console.log("tanke id ", getTakenId);
// }

// function getCurrentPosition() {

//     for (let i = 16; i <= 31; i++) {
//         let pair = (pieces[i].position.file).toString() + (pieces[i].position.rank).toString();
//         overlapWhite.push(pair);

//     }

//     for (let i = 0; i <= 15; i++) {
//         let pair = (pieces[i].position.file).toString() + (pieces[i].position.rank).toString();
//         overlapBlack.push(pair);
//     }
// }