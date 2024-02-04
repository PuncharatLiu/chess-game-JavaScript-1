let startFen = [  // base FEN position.
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

let whiteCastle = false;
let blackCastle = false;

export function generateFen(getFile, getRank, filePart, rankPart, turn, isCastle, en, take, pawnMove) {
    let pieceToMove = startFen[getRank][getFile]; // Get the piece from the first position
    startFen[rankPart][filePart] = pieceToMove; // Set the piece at the second position
    startFen[getRank][getFile] = 1; // Clear the piece from the first position
    turn === 'white' ? startFen[8] = ["b"] : startFen[8] = ["w"];  // swich turn "w" and "b"

    // if castle remove string
   if (isCastle && turn === 'black') {
        startFen[9][0] = [];
        whiteCastle = true;
        
    } else if (isCastle && turn === 'white') {
        startFen[9][1] = [];
        blackCastle = true;
    }

    if (whiteCastle && blackCastle) { // if both player castle replace with '-'
        startFen[9][0] = ['-'];
    }

    const halfMove = () => {
        if (!take && !pawnMove) {
            startFen[10][1]++;  // when piece move, nut pawn it increased to number.
        } else {
            startFen[10][1] = 0;  // if pawn move or capture even occur set half move to 0.
        }
    }
    halfMove();

    // track full move 
    const fullMove = () => { if (turn === 'white') {startFen[10][2]++} } // when player make a move increased the number.
    fullMove();

    let convertFen = JSON.parse(JSON.stringify(startFen)); // copy startFen to convertFen 
    let sum = 0; // defualt number, will be add later
    let convert = []; // store each rank array
    
    // sum the number of empty square
    for (let rank = 0; rank <= 7; rank++) {
        convert = []; // when finish row. reset 

        for (let file = 0; file <= 7; file++ ) {
            
            if (convertFen[rank][file] === 1) { // if select index is number. plus one
                sum++;

                if (file === 7 ) { convert.push(sum); } // if all select index is not char. push to convert
                
            } else { // if select index is char.
                convert.push()
                
                if (sum !== 0 ) { // if sum still squal to 0, don't push sum in convert[]
                    convert.push(sum);
                    convert.push(convertFen[rank][file]);
                    sum = 0;
                    console.log("convert", convert);

                } else if (file === 7) { // push char to convert[]
                    convert.push(convertFen[rank][file]);

                } else {
                    convert.push(convertFen[rank][file])

                }  
            }
        }

        sum = 0;
        convertFen[rank] = convert; // reassign convert[] to rank array.

    }

    const convertEnPassantPosition = () => { // convert file number to file string.
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
    if (en !== undefined) { convertEnPassantPosition(); } // if en passant positon defind call the function
    
    // Convert the startFen array to a FEN string
    let FEN = convertFen.slice(0, 8).map(rank => Array.isArray(rank) ? rank.join('') : rank).join('/') +
    ' ' + convertFen[8][0] +
    ' ' + convertFen[9].join('') +
    ' ' + convertFen[10][0] + ' ' + convertFen[10][1] + ' ' + convertFen[10][2];

    console.log("FEN", FEN);  // test 

    return FEN; 
}