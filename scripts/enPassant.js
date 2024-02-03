import { getPieceId, getFile, getRankPosition } from "./main.js";

export function handleEnPosition() {
    const checkForEnPosition = () => {
        if (getPieceId >= 8 && getPieceId <= 15 && getRankPosition === 3) {
            const getLeftWPawn = document.querySelector(`[position="${getFile - 1}${3}"]`);
            const getRightWPawn = document.querySelector(`[position="${getFile + 1}${3}"]`);
            const getCurrentPawn = document.getElementById(getPieceId);

            if (getLeftWPawn?.classList.contains('white', 'pawn') && getCurrentPawn?.hasAttribute('tw')) {
                return `${getFile}${6}`;

            } 
            else if (getRightWPawn?.classList.contains('white', 'pawn') && getCurrentPawn?.hasAttribute('tw')) {
                return `${getFile}${6}`;
            }
        } else if (getPieceId >= 15 && getPieceId <= 23 && getRankPosition === 4) {
            const getLeftBPawn = document.querySelector(`[position="${getFile - 1}${4}"]`);
            const getRightBPawn = document.querySelector(`[position="${getFile + 1}${4}"]`);
            const getCurrentPawn = document.getElementById(getPieceId);

            if (getLeftBPawn?.classList.contains('black', 'pawn') && getCurrentPawn?.hasAttribute('tw')) {
                return `${getFile}${3}`;
            } else if (getRightBPawn?.classList.contains('black', 'pawn') && getCurrentPawn?.hasAttribute('tw')) {
                return `${getFile}${3}`;
            }
        }
    }

    return checkForEnPosition();
}