function onLoaded(){
    //hide all sections    
ShowMenu('Welcome');

}

function ShowMenu(id){
    //hide all sections
    var id1 = document.getElementById("Welcome");
    id1.style.visibility="hidden";
    var id2 = document.getElementById("Register");
    id2.style.visibility="hidden";
    var id3 = document.getElementById("Login");
    id3.style.visibility="hidden";
    var id2 = document.getElementById("gameSetting");
    id2.style.visibility="hidden";
    var id3 = document.getElementById("start");
    id3.style.visibility="hidden";
    

     clearI();
    //show 
  var openTab = document.getElementById(id);
    openTab.style.visibility="visible";
}

function openDialog() { 
  document.getElementById("myDialog").showModal(); 
}
function closeDialog() { 
  document.getElementById("myDialog").close(); 
}
function startGame(balls,time,monster,color5,color15,color25){
  if (balls<50||balls>90){
    alert("The num of balls must to be between 50 to 90")
  }
  else if(time<60){
    alert("Game time must to be minimum 60 second")
  }
  else{
  ShowMenu('start');
  Start(balls,time,monster,color5,color15,color25);
  }


   }
