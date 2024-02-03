// let startFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let startFen = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["w"],
    ["KQ", "kq"],
    ["-", 0, 1]
];

 

console.log("outside fen", startFen);


let whiteCastle = false;
let blackCastle = false;

export function generateFen(getFile, getRank, filePart, rankPart, turn, isCastle, en, take, pawnMove) {
    console.log('fen', getFile, getRank, filePart, rankPart);
    
    let pieceToMove = startFen[getRank][getFile]; // Get the piece from the first position
    startFen[rankPart][filePart] = pieceToMove; // Set the piece at the second position
    startFen[getRank][getFile] = 1; // Clear the piece from the first position

    // swich turn "w" and "b"
    turn === 'white' ? startFen[8] = ["w"] : startFen[8] = ["b"]; 

    // castle
   if (isCastle && turn === 'black') {
        startFen[9][0] = [];
        whiteCastle = true;
        
    } 
    
    else if (isCastle && turn === 'white') {
        startFen[9][1] = [];
        blackCastle = true;
    }

    if (whiteCastle && blackCastle) {
        startFen[9][0] = ['-'];
    }

    const halfMove = () => {
        if (!take && !pawnMove) {
            startFen[10][1]++;
        } else {
            startFen[10][1] = 0;
        }
    }
    halfMove();

    const fullMove = () => { if (turn === 'white') {startFen[10][2]++} }
    fullMove();

    let convertFen = JSON.parse(JSON.stringify(startFen));

    console.log("startFen", startFen);
    console.log("convertFen", convertFen);

    let sum = 0;
    let convert = [];
    
    // sum the number of empty square
    for (let rank = 0; rank <= 7; rank++) {
        convert = [];
        for (let file = 0; file <= 7; file++ ) {
            
            if (convertFen[rank][file] === 1) {
                sum++;

                if (file === 7 ) {
                    convert.push(sum);
                }
            } else {
                convert.push()
                
                if (sum !== 0 ) {
                    convert.push(sum);
                    convert.push(convertFen[rank][file]);
                    sum = 0;
                    console.log("convert", convert);

                } else if (file === 7) {
                    convert.push(convertFen[rank][file]);
                } 
                else {
                    convert.push(convertFen[rank][file])

                }  
            }
        }
        sum = 0;
        convertFen[rank] = convert;
    }

    console.log("en", en);

    const convertEnPassantPosition = () => {
        let fileOfEnPassantPosition = en[0];
        

        switch(fileOfEnPassantPosition) {
            case "0":
                fileOfEnPassantPosition = "a";
                break;
            case "1":
                fileOfEnPassantPosition = "b";
                break;
            case "2":
                fileOfEnPassantPosition = "c";
                break;
            case "3":
                fileOfEnPassantPosition = "d";
                break;
            case "4":
                fileOfEnPassantPosition = "e"
                break;
            case "5":
                fileOfEnPassantPosition = "f";
                break;
            case "6":
                fileOfEnPassantPosition = "g";
                break;
            case "7":
                fileOfEnPassantPosition = "h";
                break;
            default:
                break;

        }
        
        const enPassantPosition = fileOfEnPassantPosition + en[1];
        convertFen[10][0] = [enPassantPosition];

    } 
    if (en !== undefined) { convertEnPassantPosition(); }

    
   
    console.log("full fen", convertFen);
    
    // Convert the startFen array to a FEN string
    let FEN = convertFen.slice(0, 8).map(rank => Array.isArray(rank) ? rank.join('') : rank).join('/') +
    ' ' + convertFen[8][0] +
    ' ' + convertFen[9].join('') +
    ' ' + convertFen[10][0] + ' ' + convertFen[10][1] + ' ' + convertFen[10][2];


    console.log('FEN', FEN);

    // Convert the modified array back to FEN string
    let modifiedFen = convertFen.map(row => row.join('')).join('/');

    console.log("Modified FEN:", modifiedFen);


    return modifiedFen;
}
