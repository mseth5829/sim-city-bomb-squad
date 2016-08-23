
//Set timer

// for(var i = 0; i<30; i++){
//   setInterval(deductMilli,1)
// }

var tickTock = setInterval(deductSeconds,1000)
var seconds = document.getElementById("seconds");

function deductSeconds (){
  if(seconds.innerHTML<=0){
  }else{
    seconds.innerHTML-= 1
  }
}

// function deductMilli (){
//   var milliseconds = document.getElementById("milli");
//   if(milliseconds.innerHTML<=0){
//   }else{
//     milliseconds.innerHTML-= 1
//   }
// }

//Clicking on images will cut wires
var clickable = true

var uncutImg = [
  '<img src="img/uncut-blue-wire.png">',
  '<img src="img/uncut-red-wire.png">',
  '<img src="img/uncut-white-wire.png">',
  '<img src="img/uncut-yellow-wire.png">',
  '<img src="img/uncut-green-wire.png">'
]

var cutImg = [
  '<img src="img/cut-blue-wire.png">',
  '<img src="img/cut-red-wire.png">',
  '<img src="img/cut-white-wire.png">',
  '<img src="img/cut-yellow-wire.png">',
  '<img src="img/cut-green-wire.png">'
]

var wires = document.getElementsByClassName('wire');

for(var i = 0; i<cutImg.length; i++){
  wires[i].addEventListener("click",cut(i));
  wires[i].addEventListener("click",checkConditions(i));
  wires[i].addEventListener("click",checkSave);

}

function cut(i) {
  return function (){
    if(clickable === false){
    }else{
      var index = parseInt(wires[i].className.charAt(1));
      wires[i].innerHTML=cutImg[index];
      gameStarted = true
    }
  }
}

//Set up which wires are 'wrong' or 'right'
function randomSet(){
  for(var i = 0; i<cutImg.length; i++){
    var number = Math.floor(Math.random()*2)
    wires[i].className += " c" + number;
  };
}

randomSet();

//If timer runs out or if wrong wire is cut, change background image
function checkConditions(i){
  function boom(){
    document.getElementById("unexploded").style.background="URL(img/explosion.jpg)"
  }
  return function(){
    if(wires[i].classList.contains("c1")){
      setTimeout(boom,750);
      clearInterval(tickTock);
      clearInterval(tickyTock);
      clickable = false;
      gameStarted = false;
      console.log(clickable);
    }else if(wires[i].classList.contains("c0")){
      wires[i].className += "phew"
    }
  }
}

if(seconds.innerHTML === 0){
  document.getElementById("unexploded").style.background="URL(img/explosion.jpg)"
}

//Check if all the right wires have been cut
var gameStarted = false
function checkSave(){
  var checking = ""
  for(var i = 0; i<cutImg.length; i++){
    checking += " " + wires[i].className
  }
  console.log(checking)
  if(checking.indexOf("c0") < -1){
    console.log("winner")
  }
}

//If reset button is pressed, start over
document.getElementById("reset").addEventListener("click",reset);

var tickyTock
function newInterval() {
  tickyTock = setInterval(deductSeconds,1000);
}

function reset(){
  seconds.innerHTML=30;
  newInterval();
  document.getElementById("unexploded").style.background="URL(img/simcity.jpg)"
  for(var i = 0; i<cutImg.length; i++){
    wires[i].innerHTML=uncutImg[i];
    wires[i].className= wires[i].className.substring(0,7);
  }
  randomSet();
  clickable = true
  gameStarted = false
}
