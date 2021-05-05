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
var intervalMonster;
var totalFood;
var strawberry;
var strawberryImage;
var audio=new Audio("pacman.mp3");


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
	audio.play();
	board = new Array();
	score = 0;
	life=5;
	pac_color = "yellow";
	var cnt = 837;
	var food_remain = balls;
	totalFood=balls;
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
	strawberryImage=new Image();
	strawberryImage.src='picture/strawberry.png';
	var monsterCount=0;
	strawberry=new Object();
	//food_before_monster=new Array();
	for (var x=0;x<4;x++){
		allMonsters[x]=new Object();
	}
	startPositionMonster();
	for (var i = 0; i < 37; i++) {
		board[i] = new Array();
		//27X31
		for (var j = 0; j < 23; j++) {
			if ((i == 0)|| (j == 0)||
				(j == 22)|| (i == 36)||
				((i==2||i==3||i==30||i==31)&&(j==2||j==3
				||j==4||j==5||j==6||j==7||j==8
				||j==9||j==10||j==11||j==13
				||j==14||j==16||j==17||j==18
				||j==19||j==20||j==21||j==22
				||j==23||j==24||j==25))||
				((i==4||i==32)&&(j==7||j==8||j==13
				||j==14||j==19||j==20))||
				((i==5||i==6||i==33||i==34)&&(j==1||j==2
				||j==4||j==5||j==7||j==8
				||j==10||j==11||j==12||j==13
				||j==14||j==15||j==16||j==17
				||j==19||j==20||j==22||j==23
				||j==25||j==26))||
				((i==7||i==35)&&(j==4||j==5||j==23||j==22))||
				((i==8||i==9)&&(j==2||j==3||j==4
				||j==5||j==7||j==8||j==9||j==10
				||j==11||j==13||j==14||j==16||j==17
				||j==18||j==19||j==20||j==22||j==23
				||j==24||j==25))||((i==10)&&(j==13||j==14))
				||((i==11||i==12||i==14||i==15)
				&&(j==2||j==3||j==4
				||j==5||j==7||j==8||j==10||j==11||j==12
				||j==13||j==14||j==15||j==16||j==17||j==19
				||j==20||j==22||j==23||j==24||j==25||j==26))
				||((i==13)&&(j==2||
				j==7||j==8||j==19||j==20||j==22||j==23||j==24
				||j==25||j==26))||((i==16)&&(j==5||j==10||j==17))||
				((i==19)&&(j==2||
				j==7||j==8||j==19||j==20||j==22||j==23
				||j==24||j==25||j==26))||((i==17||i==18)&&(j==2||j==3||j==4
				||j==5||j==7||j==8||j==10||j==11||j==12
				||j==15||j==16||j==17||j==19
				||j==20||j==22||j==23||j==24||j==25||j==26))||
				((i==20||i==21)&&(j==2||j==3||j==4
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
	startStrawberry()


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
	intervalMonster=setInterval(monsterPosition,1000);

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
	var i = Math.floor(Math.random() * 36 + 1);
	var j = Math.floor(Math.random() *22 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 36 + 1);
		j = Math.floor(Math.random() * 22 + 1);
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
		bestMove=bestMoveMonster(pos_i,pos_j);
		if (bestMove=="up"){
			allMonsters[k].j--;
		}
		else if (bestMove=="right"){
			allMonsters[k].i++;
		}
		else if (bestMove=="down"){
			allMonsters[k].j++;
		}
		else if (bestMove=="left"){
			allMonsters[k].i--;
		}
	}
}
function bestMoveMonster(i,j){
	bestMove="";
	minDistance=9999999;
	if ((board[i-1][j]!=4)&&(!isMonster(i-1,j))){
		distance=Math.abs(i-1-shape.i)+Math.abs(j-shape.j);
		if (distance<minDistance){
			minDistance=distance;
			bestMove="left";
		}
	}
	if ((board[i][j-1]!=4)&&(!isMonster(i,j-1))){
		distance=Math.abs(i-shape.i)+Math.abs(j-1-shape.j);
		if (distance<minDistance){
			minDistance=distance;
			bestMove="up";
		}
	}
	if ((board[i+1][j]!=4)&&(!isMonster(i+1,j))){
		distance=Math.abs(i+1-shape.i)+Math.abs(j-shape.j);
		if (distance<minDistance){
			minDistance=distance;
			bestMove="right";
		}
	}
	if ((board[i][j+1]!=4)&&(!isMonster(i,j+1))){
		distance=Math.abs(i-shape.i)+Math.abs(j+1-shape.j);
		if (distance<minDistance){
			minDistance=distance;
			bestMove="down";
		}
	}
	return bestMove;
}

function startPositionMonster(){
	allMonsters[0].i=1;
	allMonsters[0].j=1;
	allMonsters[1].i=1;
	allMonsters[1].j=21;
	allMonsters[2].i=29;
	allMonsters[2].j=1;
	allMonsters[3].i=29;
	allMonsters[3].j=21;
}
function strawberryPosition(){
	var degel=0;
	while(degel==0){
		var randomMove=Math.floor(Math.random() * 4 + 1);
		if ((randomMove==1)&&(board[strawberry.i-1][strawberry.j]!=4)){
			strawberry.i--;
			degel=1;
		}
		if ((randomMove==2)&&(board[strawberry.i][strawberry.j-1]!=4)){
			strawberry.j--;
			degel=1;
		}
		if ((randomMove==3)&&(board[strawberry.i+1][strawberry.j]!=4)){
			strawberry.i++;
			degel=1;
		}
		if ((randomMove==4)&&(board[strawberry.i][strawberry.j+1]!=4)){
			strawberry.j++;
			degel=1;
		}
	}
}
function startStrawberry(){
	strawberry.i=16;
	strawberry.j=12;
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = Math.floor(time_elapsed);
	lblLife.value=life;
	TimeLimit.value=timeLimit;
	numFood.value=totalFood;
	numMonsters.value=numOfMonster;
	food5.value=colorBall5;
	food15.value=colorBall15;
	food25.value=colorBall25;
	for (var i = 0; i < 37; i++) {
		for (var j = 0; j < 23; j++) {
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
                                context.arc(center.x - 6, center.y - 4, 2, 0, 2 * Math.PI); // circle
                            else if(keyDirect==2)
                                context.arc(center.x - 6, center.y + 4, 2, 0, 2 * Math.PI); // circle
                            else if(keyDirect==3)
                                context.arc(center.x - 1, center.y - 6, 2, 0, 2 * Math.PI); // circle
                            else context.arc(center.x + 1, center.y - 6, 2, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 4, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBall5; //color
				context.fill();
				
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBall15; //color
				context.fill();
				
			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = colorBall25; //color
				context.fill();
				
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 10, center.y - 10, 20, 20,0);
				context.fillStyle = "blue"; //color
				context.fill();
			}
		}
	}
	for (var x=0;x<numOfMonster;x++){
		context.drawImage(monstersImage[x],allMonsters[x].i*20,allMonsters[x].j*20,20,20);
	}
	context.drawImage(strawberryImage,strawberry.i*20,strawberry.j*20,20,20);
}


function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	strawberryPosition();
	//keyDirect=GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			keyDirect=1;
		}
	}
	if (x == 2) {
		if (shape.j < 23 && board[shape.i][shape.j + 1] != 4) {
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
		if (shape.i < 37 && board[shape.i + 1][shape.j] != 4) {
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
	else if (isMonster(shape.i,shape.j)) {
		life--;
		score=score-10;
		var randonCell=findRandomEmptyCell(board);
		shape.i=randonCell[0];
		shape.j=randonCell[1];
		startPositionMonster();
	}
	else if(shape.i==strawberry.i&&shape.j==strawberry.j){
		score+=50;
		startStrawberry();
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (life<1){
		window.clearInterval(interval);
		window.alert("Loser!!!");
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
function isMonster(i,j){
	for (x=0;x<numOfMonster;x++){
		if ((i==allMonsters[x].i)&&(j==allMonsters[x].j)){
			return true;
		}
	}
}
