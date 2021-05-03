var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var keyDirect;
var numOfMonster;
var timeLimit;
var colorBall5;
var colorBall15;
var colorBall25;
var numBall5;
var numBall15;
var numBall25;
var monsterArray;
var monstersImage;
var life=5;
var food_before_monster;


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});
function Stop() {
	window.clearInterval(interval);   
	Start(firstEating,firstTime,numOfMonster);

};
   function clearI(){
	  window.clearInterval(interval);
   }
function Start(balls,time,monster,color5,color15,color25) {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 837;
	var food_remain = balls;
	var pacman_remain = 1;
	start_time = new Date();
	timeLimit=time;
	colorBall5=color5;
	colorBall15=color15;
	colorBall25=color25;
	numBall5=0.6*food_remain;
	numBall15=0.3*food_remain;
	numBall25=0.1*food_remain;
	numOfMonster=monster;
	allMonsters= new Array();
	monstersImage=new Array();
	monstersImage[0]=new Image();
	monstersImage[1]=new Image();
	monstersImage[2]=new Image();
	monstersImage[3]=new Image();
	monstersImage[0].src='picture/M_blue.png';
	monstersImage[1].src='picture/M_yellow.png';
	monstersImage[2].src='picture/M_pink.png';
	monstersImage[3].src='picture/M_red.png';
	var monsterCount=0;
	food_before_monster=new Array();
	for (var x=0;x<4;x++){
		food_before_monster[x]=0;
	}
	for (var i = 0; i < 31; i++) {
		board[i] = new Array();
		//27X31
		for (var j = 0; j < 26; j++) {
			if ((i == 0)|| (j == 0)||
				(j == 25)|| (i == 30)||
				((i==2||i==3)&&(j==2||j==3
				||j==4||j==5||j==6||j==7||j==8
				||j==9||j==10||j==11||j==13
				||j==14||j==16||j==17||j==18
				||j==19||j==20||j==21||j==22
				||j==23||j==24||j==25))||
				((i==4)&&(j==7||j==8||j==13
				||j==14||j==19||j==20))||
				((i==5||i==6)&&(j==1||j==2
				||j==4||j==5||j==7||j==8
				||j==10||j==11||j==12||j==13
				||j==14||j==15||j==16||j==17
				||j==19||j==20||j==22||j==23
				||j==25||j==26))||
				((i==7)&&(j==4||j==5||j==23||j==22))||
				((i==8||i==9)&&(j==2||j==3||j==4
				||j==5||j==7||j==8||j==9||j==10
				||j==11||j==13||j==14||j==16||j==17
				||j==18||j==19||j==20||j==22||j==23
				||j==24||j==25))||((i==10)&&(j==13||j==14))
				||((i==11||i==12||i==14||i==15)
				&&(j==1||j==2||j==3||j==4
				||j==5||j==7||j==8||j==10||j==11||j==12
				||j==13||j==14||j==15||j==16||j==17||j==19
				||j==20||j==22||j==23||j==24||j==25||j==26))
				||((i==13)&&(j==1||j==2||j==3||j==4||j==5
				||j==7||j==8||j==19||j==20||j==22||j==23||j==24
				||j==25||j==26))||((i==16)&&(j==10||j==17))||
				((i==19)&&(j==1||j==2||j==3||j==4||j==5
				||j==7||j==8||j==19||j==20||j==22||j==23
				||j==24||j==25||j==26))||((i==17||i==18)&&(j==1||j==2||j==3||j==4
				||j==5||j==7||j==8||j==10||j==11||j==12
				||j==15||j==16||j==17||j==19
				||j==20||j==22||j==23||j==24||j==25||j==26))||
				((i==20||i==21)&&(j==1||j==2||j==3||j==4
				||j==5||j==7||j==8||j==9||j==10||j==11||j==13||j==14
				||j==16||j==17||j==18||j==19||j==20||
				j==22||j==23||j==24||j==25||j==26))||
				((i==22)&&(j==7||j==8||j==13||j==14||j==19||j==20))
				||((i==23||i==24)&&(j==2||j==3||j==4||j==5
				||j==7||j==8||j==10||j==11||j==12
				||j==13||j==14||j==15||j==16||j==17||j==19
				||j==20||j==22||j==23||j==24||j==25))||
				((i==26||i==27||i==28)&&(j==2||j==3||j==4||j==5
				||j==7||j==8||j==9||j==10||j==11||j==13||j==14
				||j==16||j==17||j==18||j==19||j==20||
				j==22||j==23||j==24||j==25))||((i==29)&&(j==13||j==14))
				) {
				
				board[i][j] = 4;
			} 
			else if(((i==1&&j==1)||(i==29&&j==24)||(i==1&&j==24)||(i==29&&j==1))&&(numOfMonster>monsterCount))
			{
				board[i][j]=monsterCount+10;
				allMonsters[monsterCount]=new Object();
				allMonsters[monsterCount].i=i;
				allMonsters[monsterCount].j=j;
				monsterCount++;
			}
			else {
				var randomNum = Math.random();
				if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt && pacman_remain>0) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		foodPosition();
		food_remain--;
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);

}


function foodPosition(){
	var emptyCell = findRandomEmptyCell(board);
	i=emptyCell[0];
	j=emptyCell[1];
	if (numBall5>0){
		numBall5--;
		board[i][j] = 5;
	}
	else if(numBall15>0)
	{
		numBall15--;
		board[i][j] = 15;
	}
	else if(numBall25>0)
	{
		numBall25--;
		board[i][j] = 25;
	}
		
}
function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 26 + 1);
	var j = Math.floor(Math.random() *31 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 26 + 1);
		j = Math.floor(Math.random() * 31 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function monsterPosition(){
	for (var k=0;k<numOfMonster;k++){
		pos_i=allMonsters[k].i;
		pos_j=allMonsters[k].j;
		board[pos_i][pos_j]=0;
		bestMove=bestMoveMonster(pos_i,pos_j);
		if (bestMove=="up"){
			//food_before_monster[k]=board[pos_i][pos_j-1];
			allMonsters[k].j--;
			board[pos_i][pos_j-1]=k+10;
		}
		else if (bestMove=="right"){
			//food_before_monster[k]=board[pos_i+1][pos_j];
			allMonsters[k].i++;
			board[pos_i+1][pos_j]=k+10;
		}
		else if (bestMove=="down"){
			//food_before_monster[k]=board[pos_i][pos_j+1];
			allMonsters[k].j++;
			board[pos_i][pos_j+1]=k+10;
		}
		else if (bestMove=="left"){
			
			//food_before_monster[k]=board[pos_i-1][pos_j];
			allMonsters[k].i--;
			board[pos_i-1][pos_j]=k+10;
		}
	}
}
function bestMoveMonster(i,j){
	bestMove="";
	minDistance=9999999;
	if (board[i-1][j]!=4){
		distance=Math.abs(i-1-shape.i)+Math.abs(j-shape.j);
		if (distance<minDistance){
			minDistance=distance;
			bestMove="left";
		}
	}
	if (board[i][j-1]!=4){
		distance=Math.abs(i-shape.i)+Math.abs(j-1-shape.j);
		if (distance<minDistance){
			minDistance=distance;
			bestMove="up";
		}
	}
	if (board[i+1][j]!=4){
		distance=Math.abs(i+1-shape.i)+Math.abs(j-shape.j);
		if (distance<minDistance){
			minDistance=distance;
			bestMove="right";
		}
	}
	if (board[i][j+1]!=4){
		distance=Math.abs(i-shape.i)+Math.abs(j+1-shape.j);
		if (distance<minDistance){
			minDistance=distance;
			bestMove="down";
		}
	}
	return bestMove;
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 31; i++) {
		for (var j = 0; j < 26; j++) {
			var center = new Object();
			center.x = i * 20 + 10;
			center.y = j * 20 +10;
			if (board[i][j] == 2) {
				context.beginPath();
				
                            if(keyDirect==1)
                                context.arc(center.x, center.y, 9, 1.65 * Math.PI, 1.35 * Math.PI); // half circle up
                            else if(keyDirect==4)
                                context.arc(center.x, center.y, 9, 0.15 * Math.PI, 1.85 * Math.PI); // half circle right
                            else if(keyDirect==3)
                                context.arc(center.x, center.y, 9, 1.15 * Math.PI, 0.85 * Math.PI); // half circle left
                            else if(keyDirect==2)
                                context.arc(center.x, center.y, 9, 0.65 * Math.PI, 0.35 * Math.PI); // half circle down
                            else context.arc(center.x, center.y, 9, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
							if(keyDirect==1)
                                context.arc(center.x - 10, center.y - 7, 3, 0, 2 * Math.PI); // circle
                            else if(keyDirect==2)
                                context.arc(center.x - 10, center.y + 7, 3, 0, 2 * Math.PI); // circle
                            else if(keyDirect==3)
                                context.arc(center.x - 3, center.y - 10, 3, 0, 2 * Math.PI); // circle
                            else context.arc(center.x + 3, center.y - 10, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBall5; //color
				context.fill();
				context.beginPath();
				context.fillStyle = "black";
				context.font = '8px serif, bold';
  				context.fillText('5', center.x-2, center.y+2);
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBall15; //color
				context.fill();
				context.beginPath();
				context.fillStyle = "black";
				context.font = '8px serif, bold';
  				context.fillText('15', center.x-4, center.y+2);
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBall25; //color
				context.fill();
				context.beginPath();
				context.fillStyle = "black";
				context.font = '8px serif, bold';
  				context.fillText('25', center.x-4, center.y+2);
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 10, center.y - 10, 20, 20,0);
				context.fillStyle = "blue"; //color
				context.fill();
			}
			else if (board[i][j]==10){
				context.drawImage(monstersImage[0],center.x-10,center.y-10,20,20);
			}
			else if (board[i][j]==11){
				context.drawImage(monstersImage[1],center.x-10,center.y-10,20,20);
			}
			else if (board[i][j]==12){
				context.drawImage(monstersImage[2],center.x-10,center.y-10,20,20);
			}
			else if (board[i][j]==13){
				context.drawImage(monstersImage[3],center.x-10,center.y-10,20,20);
			}
		}
	}
}


function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	//keyDirect=GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			keyDirect=1;
		}
	}
	if (x == 2) {
		if (shape.j < 13 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			keyDirect=2;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			keyDirect=3;
		}
	}
	if (x == 4) {
		if (shape.i < 26 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			keyDirect=4;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score+=5;
	}
	else if (board[shape.i][shape.j] == 15) {
		score+=15;
	}
	else if (board[shape.i][shape.j] == 25) {
		score+=25;
	}
	// else if ((board[shape.i][shape.j] == 10)||(board[shape.i][shape.j] == 11)||
	// (board[shape.i][shape.j] == 12)||(board[shape.i][shape.j] == 13)) {
	// 	life--;
	// 	score=score-10;
	// 	var randonCell=findRandomEmptyCell();
	// 	shape.i=randonCell.i;
	// 	shape.j=randonCell.j;
	// 	for( var k=0; n<numMonster;n++){
	// 		board[allMonsters[k].i][allMonsters[k].j]=0;
	// 	}
	// 	allMonsters[0].i=1;
	// 	allMonsters[0].j=1;
	// 	board[allMonsters[0].i][allMonsters[0].j]=10;
	// 	allMonsters[1].i=1;
	// 	allMonsters[1].j=26;
	// 	board[allMonsters[1].i][allMonsters[1].j]=11;
	// 	allMonsters[2].i=29;
	// 	allMonsters[2].j=1;
	// 	board[allMonsters[2].i][allMonsters[2].j]=12;
	// 	allMonsters[3].i=29;
	// 	allMonsters[3].j=26;
	// 	board[allMonsters[3].i][allMonsters[3].j]=13;
	// }
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	monsterPosition();

	time_elapsed = (currentTime - start_time) / 1000;
	if (life==0){
		
		window.alert("Loser!!!");
		window.clearInterval(interval);
	}
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	else if (time_elapsed>=timeLimit){
		window.clearInterval(interval);
		if (score<100){
		window.alert("You are better then "+scor+"points!");
		}
		else{
			window.alert("Winner!!!");
		}
	}
	 else {
		Draw();
	}
}
