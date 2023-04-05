import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/



function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard(chanceLightStartsOn));

  function cellStartsOn(chance) {
    return Math.random() < chance;
  }

  function createBoard(chanceLightStartsOn) {
    let initialBoard = [];
    for (let x = 0; x < nrows; x++) {
      let row = [];
      for (let y = 0; y < ncols; y++) {
        row.push(cellStartsOn(chanceLightStartsOn));
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon(board) {
    for (const row of board) {
      for (const cell of row) {
        if (cell) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };


      const copy = oldBoard.map((row) => row.slice());

      flipCell(y, x, copy);
      flipCell(y + 1, x, copy);
      flipCell(y - 1, x, copy);
      flipCell(y, x + 1, copy);
      flipCell(y, x - 1, copy);

      return copy;
    });
  }
  const isGameWon = hasWon(board);

  // Render the game board
  const renderBoard = () => {
    return (
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <Cell
                  key={`${y}-${x}`}
                  isLit={cell}
                  flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                />
              ))}
            </tr>
          ))}
        </tbody>
    );
  };

  return (
    <table className="Board">
      {isGameWon ? <h2 className="Board-winning">You won!</h2> : renderBoard()}
    </table>
  );

}

export default Board;
