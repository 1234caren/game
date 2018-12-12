var board = [];
var width = 70;
var height = 41;
var cells = width * height;
var running = 1;
var delay = 1;
var colorValues;

jQuery(document).ready(function() {
	Board();
	createBoard();
	activateBoard();
	runIt();
});
function Board() {
	board = [];
	//console.log(cells);
	for (var i = 0; i < (cells); i++) {
		// add new elements to the end of an array, and return the new length.
		board.push(0);
		//console.log(i);
	}
};

function createBoard() {
	// This method eliminates the secondary elements, also any text inside the container.
	jQuery('.container').empty();
	// length returns the length of a string
	for (var i = 0; i < board.length; i++) {
		if (board[i] == 0) {
			var newCell = '<div class="cell" id=' + i + '></div>';
			// add each div with its id
			jQuery('.container').append(newCell);
		}
	}
};
function runGeneration() {

	var newBoard = [];
	for (var i = 0; i < (cells); i++) {
		newBoard.push(0);
		var check = cellCheck(i);
		if (board[i] == 1) {
			jQuery('#' + i).addClass('old');
		} else {
			jQuery('#' + i).removeClass('old');
			jQuery('#' + i).addClass('alive');
		}
		//mantiene viva  si tiene 2 o 3 vecinos vivos, vieja celula
		if (board[i] == 1 && (check == 3 || check == 2)) {
			newBoard[i] = 1;
		}
		//da vida a la celula muerta si hay exactamente 3 vecinos
		if (board[i] == 0 && check == 3) {
			newBoard[i] = 1;
		}
	}

	
	// Check if all the cells are dead. if they are, it stops.
	for (var i = 0; i < cells; i++) {
		if (board[i] == 1) {
			break;
		}
		if (i == cells - 1) {
			running = 0;
			removeControl();
			activateBoard();
		}
	}
	return newBoard;
};

function drawBoard(passedBoard) {
	for (var i = 0; i < (cells); i++) {
		if (passedBoard[i] == 0) {
			// remove the live class to all the divs and the old class to clean the board
			jQuery('#' + i).removeClass('alive');
			jQuery('#' + i).removeClass('old');
		} else {
			//add class alive
			jQuery('#' + i).addClass('alive');
		}
	}
};
function activateBoard() {
	control();
	jQuery('.cell').click(function() {
		// obtiene el valor del atributo solo para el elemento elemento clickeado.
		var cellId = jQuery(this).attr('id');
		//
		if (board[cellId] == 0) {
			// alive to the clicked div.
			board[cellId] = 1;
		}
		jQuery(this).toggleClass('alive');
		// console.log(cellId);
	});

};
function control(){
	jQuery('.reset').click(function() {	
		Board();
		drawBoard(board);
		removeControl();	
		activateBoard();
	});

	jQuery('.run').click(function() {
		running = 1;
		runIt();
		removeControl();	
		activateBoard();
	});

	jQuery('.stop').click(function() {
		running = 0;
		removeControl();	
		activateBoard();
	});

	jQuery('.next').click(function(){
		running = 1;
		runItnext();
		removeControl();
		activateBoard();
		delay = 150;
	});
};

function removeControl() {
	jQuery('.run').off();
	jQuery('.reset').off();
	jQuery('.stop').off();
	jQuery('.next').off();
	jQuery('.heart').off();
	jQuery('.cell').off();
};
function runIt() {
	if (running == 1) {
		setTimeout(function() {
			board = runGeneration();
			drawBoard(board);
			setTimeout(function() {runIt();},delay);
		},0);
	}
};
function runItnext() {
	if (running == 1) {
		board = runGeneration();
		drawBoard(board);
	}
};

function cellCheck(i) {

	var count = 0;
	var borderCell = 0;

	// rules left, right, top, bottom.
	// check that the top row goes up to the bottom
	if (i >= 0 && i <= (width - 1)) {
		borderCell = 1;
		var dif = width - i;
		if (board[cells - dif] == 1) {
			count++;
		}
		if (i != 0 && board[cells - dif - 1] == 1) {
			count++;
			
		}
		if (i != (width - 1) && board[cells - dif + 1] == 1) {
			count++;
		}
		if (i != 0 && board[i + width - 1] == 1) {
			count++;
		}
		if (board[i + width] == 1) {
			count++;
		}
		if (i != (width - 1) && board[i + width + 1] == 1) {
			count++;
		}
		if (i != 0 && board[i - 1] == 1) {
			count++;
		}
		if (i != (width - 1) && board[i + 1] == 1) {
			count++;
		}
	}
	
	// check that the bottom row that goes to the top row
	if (i >= (cells - width) && i <= (cells - 1)) {
		borderCell = 1;
		var dif = i + width - cells;
		if (board[dif] == 1) {
			count++;
		}
		if (i != (cells - width) && board[dif - 1] == 1) {
			count++;
		}
		if (i != (cells - 1) && board[dif + 1] == 1) {
			count++;
		}
		if (i != (cells - width) && board[i - width - 1] == 1) {
			count++;
		}
		if (board[i - width] == 1) {
			count++;
		}
		if (i != (cells - 1) && board[i - width + 1] == 1) {
			count++;
		}
		if (i != (cells - width) && board[i - 1] == 1) {
			count++;
		}
		if (i != (cells - 1) && board[i + 1] == 1) {
			count++;
		}

	}
	//check if there are cells in the right edge (turning to the left)
	if (((i + 1) % width) == 0) {
		borderCell = 1;
		if (board[i - width + 1] == 1) {
			count++;
		}
		if (i != (cells - 1) && board[i + 1] == 1) {
			count++;
		}
		if (i == (cells - 1) && board[0] == 1) {
			count++;
		}
		if (i > width && board[i - (2 * width) + 1] == 1) {
			count++;
		}
		if (i == width - 1 && board[(cells - width)] == 1) {
			count++;
		}
		if (i != (width - 1) && i != (cells - 1) && board[i - width] == 1) {
			count++;
		}

		if (i != (cells - 1) && i != (width - 1) && board[i + width] == 1) {
			count++;
		}
		if (i != (cells - 1) && i != (width - 1) && board[i + width - 1] == 1) {
			count++;
		}
		if (i != (cells - 1) && i != (width - 1) && board[i - 1] == 1) {
			count++;
		}
		if (i != (width - 1) && i != (cells - 1) &&board[i - width - 1] == 1) {
			count++;
		}
		if (i == (width - 1) && board[cells - width - 1] == 1) {
			count++;
		}

	}
	//check if there are cells in the left edge (turning to the right)
	if (((i) % width) == 0 || i == 0) {
		borderCell = 1;

		
		//left
		if (board[i + width - 1] == 1) {
			count++;
		}
		if (i != (cells - width) && board[i + (width * 2) - 1] == 1) {
			count++;
		}
		// lower right
		if (i == (cells - width) && board[width - 1] == 1) {
			count++;
		}
		
		//upper left
		if (i >= width && board[i - 1] == 1) {
			count++;
		}
		//upper left
		if (i == 0 && board[cells - 1] == 1) {
			count++;
		}
		// check the cell directly above and the normals
		if (i != (width + 1) && i != (cells - width) && board[i - width] == 1) {
			count++;
		}
		// check the cell directly below for all cells except 0
		// or the lower left cell
		if (i != (cells - width - 1) && i != 0 && board[i + width] == 1) {
			count++;
		}
		//check the cell on the right
		if (i != 0 && i != (cells - width) && board[i - width + 1] == 1) {
			count++;
		}
		//check the cell on the right
		if (i != 0 && i != (cells - width) && board[i + 1] == 1) {
			count++;
		}
		//Check the cell in the lower right.
		if (i != (cells - width + 1) && i != 0 && board[i + width + 1] == 1) {
			count++;
		}
		console.log(count);
	}
	//rules
	if (borderCell == 0) {
		if (board[i - width] == 1) {
			count++;
		}
		if (board[i - width - 1] == 1) {
			count++;
		}
		if (board[i - width + 1] == 1) {
			count++;
		}
		if (board[i - 1] == 1) {
			count++;
		}
		if (board[i + 1] == 1) {
			count++;
		}
		if (board[i + width] == 1) {
			count++;
		}
		if (board[i + width - 1] == 1) {
			count++;
		}
		if (board[i + width + 1] == 1) {
			count++;
		}
	}
	return count;
}