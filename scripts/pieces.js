export const pieces = [ // pieces materails
    {type: 'rook', color:'black', position: {file: 0, rank: 0}},
    {type: 'knight', color:'black', position: {file: 1, rank: 0}},
    {type: 'bishop', color:'black', position: {file: 2, rank: 0}},
    {type: 'queen', color:'black', position: {file: 3, rank: 0}},
    {type: 'king', color:'black', position: {file: 4, rank: 0}},
    {type: 'bishop', color:'black', position: {file: 5, rank: 0}},
    {type: 'knight', color:'black', position: {file: 6, rank: 0}},
    {type: 'rook', color:'black', position: {file: 7, rank: 0}},
    {type: 'pawn', color:'black', position: {file: 0, rank: 1}},
    {type: 'pawn', color:'black', position: {file: 1, rank: 1}},
    {type: 'pawn', color:'black', position: {file: 2, rank: 1}},
    {type: 'pawn', color:'black', position: {file: 3, rank: 1}},
    {type: 'pawn', color:'black', position: {file: 4, rank: 1}},
    {type: 'pawn', color:'black', position: {file: 5, rank: 1}},
    {type: 'pawn', color:'black', position: {file: 6, rank: 1}},
    {type: 'pawn', color:'black', position: {file: 7, rank: 1}},
    {type: 'pawn', color:'white', position: {file: 0, rank: 6}},
    {type: 'pawn', color:'white', position: {file: 1, rank: 6}},
    {type: 'pawn', color:'white', position: {file: 2, rank: 6}},
    {type: 'pawn', color:'white', position: {file: 3, rank: 6}},
    {type: 'pawn', color:'white', position: {file: 4, rank: 6}},
    {type: 'pawn', color:'white', position: {file: 5, rank: 6}},
    {type: 'pawn', color:'white', position: {file: 6, rank: 6}},
    {type: 'pawn', color:'white', position: {file: 7, rank: 6}},
    {type: 'rook', color:'white', position: {file: 0, rank: 7}},
    {type: 'knight', color:'white', position: {file: 1, rank: 7}},
    {type: 'bishop', color:'white', position: {file: 2, rank: 7}},
    {type: 'queen', color:'white', position: {file: 3, rank: 7}},
    {type: 'king', color:'white', position: {file: 4, rank: 7}},
    {type: 'bishop', color:'white', position: {file: 5, rank: 7}},
    {type: 'knight', color:'white', position: {file: 6, rank: 7}},
    {type: 'rook', color:'white', position: {file: 7, rank: 7}},
    
];

export const isSelfPiece = (    // check self overlap
    overlapBlack,
    overlapWhite,
    filePosition,
    rankPosition,
    turn
    ) => {
        if ((filePosition * 100) > 700 || (filePosition * 100) < 0 || (rankPosition * 100) < 0 || (rankPosition * 100 ) > 700) {
            return;
        }
        let pair = `${filePosition}${rankPosition}`;
    return (
        (overlapWhite.includes(pair) && turn === 'white') ||
        (overlapBlack.includes(pair) && turn === 'black' ) 
        )
}

export const isOpponentPiece = (    // check opponent overlap
    overlapBlack,
    overlapWhite,
    filePosition,
    rankPosition,
    turn
    ) => {
        if ((filePosition * 100) > 700 || (filePosition * 100) < 0 || (rankPosition * 100) < 0 || (rankPosition * 100 ) > 700) {
            return;
        }
        
        const pair = `${filePosition}${rankPosition}`;
        const kingPosition = turn === "white" ? overlapBlack[4] : overlapWhite[12];

    return (
        (overlapWhite.includes(pair) && turn === 'black' && kingPosition !== pair) ||
        (overlapBlack.includes(pair) && turn === 'white' && kingPosition !== pair) 
    )
}

export const Is = { // to check what is click piece
    rook: function(getPieceId, fromPieceId) { // white and black rook
        return (
            getPieceId === '0' || getPieceId === '7' || getPieceId === '24' || getPieceId === '31' ||
            fromPieceId === '0' || fromPieceId === "7" || fromPieceId === "24" || fromPieceId === "31"
        );
    },
    knight: function(getPieceId, fromPieceId) {
        return (
            getPieceId === '1' || getPieceId === '6' || getPieceId === '25' || getPieceId === '30' ||
            fromPieceId === "1" || fromPieceId === "6" ||  fromPieceId === "25" || fromPieceId === "30"
        );
    },
    bishop: function(getPieceId, fromPieceId) {
        return (
            getPieceId === '2' || getPieceId === '5' || getPieceId === '26' || getPieceId === '29' ||
            fromPieceId === "2" || fromPieceId === "5" || fromPieceId === "26" || fromPieceId === "29"
        );
    },
    queen: function(getPieceId, fromPieceId) {
        return (
            getPieceId === '3' || getPieceId === '27' ||
            fromPieceId === "3" || fromPieceId === "27"
        );
    },
    king: function(getPieceId, fromPieceId) {
        return (
            getPieceId === '4' || getPieceId === '28' ||
            fromPieceId === "4" || fromPieceId === "28"
        );
    },
    blackPawn: function(getPieceId, fromPieceId) {
        return (
            (getPieceId >= 8 && getPieceId <= 15) || (parseInt(fromPieceId) >= 8 && parseInt(fromPieceId) <= 15)
        );
    }
}