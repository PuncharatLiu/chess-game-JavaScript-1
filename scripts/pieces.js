const pieces = [
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

export { pieces };

const blackPawnDefualtPosition = [
    {defaultPosition: {file: 0, rank: 1}},
    {defaultPosition: {file: 1, rank: 1}},
    {defaultPosition: {file: 2, rank: 1}},
    {defaultPosition: {file: 3, rank: 1}},
    {defaultPosition: {file: 4, rank: 1}},
    {defaultPosition: {file: 5, rank: 1}},
    {defaultPosition: {file: 6, rank: 1}},
    {defaultPosition: {file: 7, rank: 1}},
]

const whitePawnDefualtPosition = [
    {defaultPosition: {file: 0, rank: 6}},
    {defaultPosition: {file: 1, rank: 6}},
    {defaultPosition: {file: 2, rank: 6}},
    {defaultPosition: {file: 3, rank: 6}},
    {defaultPosition: {file: 4, rank: 6}},
    {defaultPosition: {file: 5, rank: 6}},
    {defaultPosition: {file: 6, rank: 6}},
    {defaultPosition: {file: 7, rank: 6}},

]

export { blackPawnDefualtPosition };
export { whitePawnDefualtPosition };