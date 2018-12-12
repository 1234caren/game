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