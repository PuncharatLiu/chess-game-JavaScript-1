export function attackDirectionStorage(){
    const attackDirection = {
        rook: 
        {
            white: 
            {
                left: 
                {
                    leftMove: [],
                    rightMove: [],
                    upMove: [],
                    downMove: []
                },
                right: 
                {
                    leftMove: [],
                    rightMove: [],
                    upMove: [],
                    downMove: []
                }
            },
            black: 
            {
                left: 
                {
                    leftMove: [],
                    rightMove: [],
                    upMove: [],
                    downMove: []
                },
                right: 
                {
                    leftMove: [],
                    rightMove: [],
                    upMove: [],
                    downMove: []
                }
            }
        },
        knight: 
        {
                white: { left: { moves: ["exclude"] }, right: { moves: ["exclude"] } },
                black: { left: { moves: ["exclude"] }, right: { moves: ["exclude"] } }
        },
        bishop: 
        {
            white: 
            {
                left: 
                {
                    diagonalUpLeft: [],
                    diagonalUpRigth: [],
                    diagonalDownLeft: [],
                    diagonalDownRight: []
                },
                right: 
                {
                    diagonalUpLeft: [],
                    diagonalUpRigth: [],
                    diagonalDownLeft: [],
                    diagonalDownRight: []
                }
            },

            black: 
            {
                left: 
                {
                    diagonalUpLeft: [],
                    diagonalUpRigth: [],
                    diagonalDownLeft: [],
                    diagonalDownRight: []
                },

                right: 
                {
                    diagonalUpLeft: [],
                    diagonalUpRigth: [],
                    diagonalDownLeft: [],
                    diagonalDownRight: []
                }
            }
        },
        queen: 
        {
            white: 
            {
                diagonalUpLeft: [],
                diagonalUpRigth: [],
                diagonalDownLeft: [],
                diagonalDownRight: [],
                leftMove: [],
                rightMove: [],
                upMove: [],
                downMove: []   
            },

            black: 
            {
                diagonalUpLeft: [],
                diagonalUpRigth: [],
                diagonalDownLeft: [],
                diagonalDownRight: [],
                leftMove: [],
                rightMove: [],
                upMove: [],
                downMove: []   
            }
            
        },
        king: { 
            white: { move: ["exclude"] },
            black: { move: ["exclude"] } 
        },
        pawn: { 
            white: { move: ["exclude"] },
            black: {move: ["exclude"]} 
        } 
    };

    return attackDirection;
}