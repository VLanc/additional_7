module.exports = function solveSudoku(matrix) {
  // will use the Depth-first search algorithm using backtracking to solve 
  
  let findNext = (row, column) => {
    while (row <= 8) {
      while (++column <= 8) {
        if (matrix[row][column] === 0) return [row, column];
      }
      row++;
      column = -1;
    }
    
    return undefined;
  };

  let isValid = (row, column, i) => {
    for (let k = 0; k < 9; k++) {
      if (matrix[k][column] === i || matrix[row][k] === i) return false;
    }

    let unitY = row - row % 3;
    let unitX = column - column % 3;
    for (let k = 0; k < 3; k++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[unitY + k][unitX + j] === i) return false;
      }
    }

    return true;
  };

  let backtracking = (row, column) => {
    for (let i = 1; i <= 9; i++) {
      if (isValid(row, column, i)) {
        matrix[row][column] = i;
        let position = findNext(row, column);
        if (position === undefined || backtracking(position[0], position[1])) return true;
        matrix[row][column] = 0;
      }
    }
    return false;
  };

  let position = findNext(0, -1);
  if (position !== undefined) backtracking(position[0], position[1]);

  return matrix;
}