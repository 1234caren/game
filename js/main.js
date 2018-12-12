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