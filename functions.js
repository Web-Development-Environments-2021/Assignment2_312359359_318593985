var isOpen=false;
function onLoaded(){
    //hide all sections    
ShowMenu('Welcome');

}

function ShowMenu(id){
    //hide all sections
    // var id1 = document.getElementById("Welcome");
    // id1.style.visibility="hidden";
    // var id2 = document.getElementById("Register");
    // id2.style.visibility="hidden";
    // var id3 = document.getElementById("Login");
    // id3.style.visibility="hidden";
    // var id2 = document.getElementById("gameSetting");
    // id2.style.visibility="hidden";
    // var id3 = document.getElementById("start");
    // id3.style.visibility="hidden";
    var id1 = document.getElementById("Welcome");
    id1.style.display="none";
    var id2 = document.getElementById("Register");
    id2.style.display="none";
    var id3 = document.getElementById("Login");
    id3.style.display="none";
    var id2 = document.getElementById("gameSetting");
    id2.style.display="none";
    var id3 = document.getElementById("start");
    id3.style.display="none";
    audio.pause()

     clearI();
    //show 
  var openTab = document.getElementById(id);
    openTab.style.display="block";
}

function openDialog(id) { 
  //document.getElementById(id).showModal(); 
  
  var id3 = document.getElementById(id);
  id3.style.display="block";
  myDialog.setCanceledOnTouchOutside(true);

  isOpen=true;
  
  
}
function closeDialog(id) { 
  //document.getElementById(id).close(); 
  
  var id3 = document.getElementById(id);
  id3.style.display="none";
  isOpen=false;
}



// function lisener(){
//   window.onclick = function(event) {
//     if (ismyDialog.style.display=="block") {
//       closeDialog("myDialog");
//     }
//   }
// }

$(document).keyup(function(e) {
	if (e.key === "Escape") {
		closeDialog("myDialog");
		
   }
});

function startGame(balls,time,monster,color5,color15,color25){
  if (balls<50||balls>90){
    alert("The num of balls must to be between 50 to 90")
  }
  else if(time<60){
    alert("Game time must to be minimum 60 second")
  }
  else{
  document.getElementById('showSettings').style.display="block";
  ShowMenu('start');
  Start(balls,time,monster,color5,color15,color25);

  }
  }
  function modalAbout(modal_name){
    document.getElementById(modal_name).style.display="block";
  }
  
  function modalClose(modal_name){
    document.getElementById(modal_name).style.display="none";
    document.getElementById("better").style.display="none";
    document.getElementById("fireworks").style.display="none";
    document.getElementById("loser").style.display="none";
  }
  
  window.onclick = function(event) {
    if (myModal.style.display=="block") {
      modalClose("myModal");
    }
    else if(event.target == document.getElementById("SettingModal")){
      modalClose("SettingModal");
    }
  }
  
  $(document).keyup(function(e) {
    if (e.key === "Escape") {
      modalClose("myModal");
      modalClose("SettingModal");
     }
  });
  
