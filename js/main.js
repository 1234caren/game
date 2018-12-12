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
		//añade nuevos elementos al final de una matriz, y devuelve la nueva longitud.
		board.push(0);
		console.log(i);
	}
};

function createBoard() {
	//Este metodo elimina los elementos secundarios,tambien cualquier texto dentro del container.
	jQuery('.container').empty();
	//length devuelve la longitud de una cadena 
	for (var i = 0; i < board.length; i++) {
		if (board[i] == 0) {
			var newCell = '<div class="cell" id=' + i + '></div>';
			//agrego cada div con su id
			jQuery('.container').append(newCell);
		}
	}
};
function runGeneration() {

	var newBoard = [];
	for (var i = 0; i < (cells); i++) {
		newBoard.push(0);
		//acordarme aca
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

	//Comprueba si todas las células estan muertas. si lo estan se detiene.
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
			//elimina clase viva a todos los div y la clase vieja para limpiar el tablero
			jQuery('#' + i).removeClass('alive');
			jQuery('#' + i).removeClass('old');
		} else {
			//agrego clase viva
			jQuery('#' + i).addClass('alive');
		}
	}
};
function activateBoard() {
	control();
	jQuery('.cell').click(function() {
		//obtiene el valor del atributo solo para el primer elemento clickeado. 
		var cellId = jQuery(this).attr('id');
		//
		if (board[cellId] == 0) {
			//vivo al div clickeado.
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
	// reglas izquierda, derecha , superior , inferior.
	//comprueba que la fila superior vaya hacia arriba hasta la parte inferior
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
	//comprueba que la fila inferior que va hacia la fila superior
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
	//comprueba si hay celdas en el borde derecho (girando hacia la izquierda)
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
	//comprueba si hay celdas en el borde izquierdo (girando hacia la derecha)
	if (((i) % width) == 0 || i == 0) {
		borderCell = 1;

		//izquierda
		if (board[i + width - 1] == 1) {
			count++;
		}
		if (i != (cells - width) && board[i + (width * 2) - 1] == 1) {
			count++;
		}
		//inferior derecha
		if (i == (cells - width) && board[width - 1] == 1) {
			count++;
		}
		//superior izquierda
		if (i >= width && board[i - 1] == 1) {
			count++;
		}
		//superior izquierda
		if (i == 0 && board[cells - 1] == 1) {
			count++;
		}
		//comprueba la celda directamente arriba y las normales
		if (i != (width + 1) && i != (cells - width) && board[i - width] == 1) {
			count++;
		}
		// comprueba la celda directamente debajo para todas las celdas excepto 0
		// o la celda inferior izquierda
		if (i != (cells - width - 1) && i != 0 && board[i + width] == 1) {
			count++;
		}
		//comprueba la celda a la derecha 
		if (i != 0 && i != (cells - width) && board[i - width + 1] == 1) {
			count++;
		}
		//comprueba la celda a la derecha 
		if (i != 0 && i != (cells - width) && board[i + 1] == 1) {
			count++;
		}
		//comprueba la celda en la parte inferior derecha.
		if (i != (cells - width + 1) && i != 0 && board[i + width + 1] == 1) {
			count++;
		}
		console.log(count);
	}
	//reglas
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
};