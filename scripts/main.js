
function renderPieces(){
	
	


	const startPieces = [r, n, b, q, k, b, n, r, p, p, p, p, p, p, p, p, P, P, P, P, P, P, P, P, R, N, B, Q, K, B, N, R];
	
	for (let i = 0; i < startPieces.length; i++) {

		document.write(i);
		
		// const pieces = document.createElement('piece');
		// let getPiecesElement = document.querySelector(pieces);
		// let pieceWithClass = getPiecesElement.style.backgroundImage = startPieces[i];
		// cgBoard.appendChild(pieceWithClass);
		
	}
}

renderPieces();

