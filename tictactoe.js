var game = {
	activePlayer : "O",
	winConditions: [
			['s1','s2','s3'],
			['s4','s5','s6'],
			['s7','s8','s9'],
			['s1','s4','s7'],
			['s2','s5','s8'],
			['s3','s6','s9'],
			['s1','s5','s9'],
			['s3','s5','s7']
		],
	victory : false,

	start : function() {
		board.createBoard();
	},

	toggleActive : function(){
		if(this.activePlayer == "X"){
			this.activePlayer = "O";
		}
		else{
			this.activePlayer = "X";
		}
		board.xdiv.classList.toggle('hidden');
		board.odiv.classList.toggle('hidden');
	},

	checkVictory : function(){
		this.winConditions.forEach(this.checkThreeSquare);
		if(this.victory){
			this.win();
		}
	},

	checkThreeSquare : function(squareA){
		if(board[squareA[0]].innerHTML != ' ' && board[squareA[0]].innerHTML == board[squareA[1]].innerHTML && board[squareA[1]].innerHTML == board[squareA[2]].innerHTML){
			game.victory = squareA;
		}
	},

	win : function(){
		this.victory.forEach(function(ele){
			board[ele].className = "square win";
		})
		var victoryToken = board[this.victory[0]].innerHTML;
		alert(victoryToken + " has won!\nClick OK to play again");
	}
};

var board = {
		length: 9,
		createBoard : function() {
			var container = document.createElement("div");
			container.setAttribute('class','container');
			for (i = 1; i <= this.length; i++) {
				var square = document.createElement("div");
				square.setAttribute("class","square");
				square.setAttribute("onClick","makeMove(this)")
				square.id = "square" + i;
				square.textContent = " ";
				container.appendChild(square);
			}
			board.xdiv = document.createElement("div");
			board.xdiv.setAttribute('class', 'Xdiv turn hidden');
			board.xdiv.innerHTML = "X";
			board.odiv = document.createElement("div");
			board.odiv .setAttribute('class', 'Odiv turn');
			board.odiv .innerHTML = "O";
			document.body.appendChild(board.xdiv);
			document.body.appendChild(board.odiv);
			document.body.appendChild(container);
			board.s1 = document.getElementById("square1");
			board.s2 = document.getElementById("square2");
			board.s3 = document.getElementById("square3");
			board.s4 = document.getElementById("square4");
			board.s5 = document.getElementById("square5");
			board.s6 = document.getElementById("square6");
			board.s7 = document.getElementById("square7");
			board.s8 = document.getElementById("square8");
			board.s9 = document.getElementById("square9");
		},
	};

function makeMove(element){
	if(element.innerHTML == " "){	
		element.textContent =  game.activePlayer;
		game.toggleActive();
		game.checkVictory();
	}
}
document.addEventListener('DOMContentLoaded',game.start);