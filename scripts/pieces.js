const pieces = [
    {type: 'rook', color:'black', position: {x: 0, y: 0}},
    {type: 'knight', color:'black', position: {x: 1, y: 0}},
    {type: 'bishop', color:'black', position: {x: 2, y: 0}},
    {type: 'queen', color:'black', position: {x: 3, y: 0}},
    {type: 'king', color:'black', position: {x: 4, y: 0}},
    {type: 'bishop', color:'black', position: {x: 5, y: 0}},
    {type: 'knight', color:'black', position: {x: 6, y: 0}},
    {type: 'rook', color:'black', position: {x: 7, y: 0}},
    {type: 'pawn', color:'black', position: {x: 0, y: 1}},
    {type: 'pawn', color:'black', position: {x: 1, y: 1}},
    {type: 'pawn', color:'black', position: {x: 2, y: 1}},
    {type: 'pawn', color:'black', position: {x: 3, y: 1}},
    {type: 'pawn', color:'black', position: {x: 4, y: 1}},
    {type: 'pawn', color:'black', position: {x: 5, y: 1}},
    {type: 'pawn', color:'black', position: {x: 6, y: 1}},
    {type: 'pawn', color:'black', position: {x: 7, y: 1}},
    {type: 'pawn', color:'white', position: {x: 0, y: 6}},
    {type: 'pawn', color:'white', position: {x: 1, y: 6}},
    {type: 'pawn', color:'white', position: {x: 2, y: 6}},
    {type: 'pawn', color:'white', position: {x: 3, y: 6}},
    {type: 'pawn', color:'white', position: {x: 4, y: 6}},
    {type: 'pawn', color:'white', position: {x: 5, y: 6}},
    {type: 'pawn', color:'white', position: {x: 6, y: 6}},
    {type: 'pawn', color:'white', position: {x: 7, y: 6}},
    {type: 'rook', color:'white', position: {x: 0, y: 7}},
    {type: 'knight', color:'white', position: {x: 1, y: 7}},
    {type: 'bishop', color:'white', position: {x: 2, y: 7}},
    {type: 'queen', color:'white', position: {x: 3, y: 7}},
    {type: 'king', color:'white', position: {x: 4, y: 7}},
    {type: 'bishop', color:'white', position: {x: 5, y: 7}},
    {type: 'knight', color:'white', position: {x: 6, y: 7}},
    {type: 'rook', color:'white', position: {x: 7, y: 7}},
    
];

export { pieces };

const blackPawnDefualtPosition = [
    {defaultPosition: {rank: 0, file: 1}},
    {defaultPosition: {rank: 1, file: 1}},
    {defaultPosition: {rank: 2, file: 1}},
    {defaultPosition: {rank: 3, file: 1}},
    {defaultPosition: {rank: 4, file: 1}},
    {defaultPosition: {rank: 5, file: 1}},
    {defaultPosition: {rank: 6, file: 1}},
    {defaultPosition: {rank: 7, file: 1}},
]

const whitePawnDefualtPosition = [
    {defaultPosition: {rank: 0, file: 6}},
    {defaultPosition: {rank: 1, file: 6}},
    {defaultPosition: {rank: 2, file: 6}},
    {defaultPosition: {rank: 3, file: 6}},
    {defaultPosition: {rank: 4, file: 6}},
    {defaultPosition: {rank: 5, file: 6}},
    {defaultPosition: {rank: 6, file: 6}},
    {defaultPosition: {rank: 7, file: 6}},

]

export { blackPawnDefualtPosition };
export { whitePawnDefualtPosition };