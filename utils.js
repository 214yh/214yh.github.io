var diamondDropStartTime = null;
var diamondDropSpeed = 300;
var diamond = document.getElementById("diamond");
var rot = 0;
var dx = 0;
var dy2 = 0;
var step = 1;
var diamondState = "DROP_1";

var diamondIntervalId = null;


function setClock() {
  // var clockText = document.getElementById("clocktext");
  var hour1 = document.getElementById("hour1");
  var hour2 = document.getElementById("hour2");
  var min1 = document.getElementById("min1");
  var min2 = document.getElementById("min2");

  if (!hour1 || !hour2 || !min1 || !min2) {
    setTimeout(setClock, 1000);
  } else {
    var date = new Date();
    // console.log(date.getSeconds());
    // clockText.innerHTML = "Time: " + date.getHours() + " " + date.getMinutes();

    var hr1 = Math.floor(date.getHours() / 10);
    var hr2 = (date.getHours() % 10);
    var mins1 = Math.floor(date.getMinutes() / 10);
    var mins2 = (date.getMinutes() % 10);

    var currTime = hr1.toString() + hr2.toString() + mins1.toString() + mins2.toString();
    var i = hour1.src.length
    var prevTime = hour1.src.substring(i-5, i-4) + hour2.src.substring(i-5, i-4) + min1.src.substring(i-5, i-4) + min2.src.substring(i-5, i-4);

    hour1.src = "images/numbers/" + hr1 + ".png";
    hour2.src = "images/numbers/" + hr2 + ".png";
    min1.src = "images/numbers/" + mins1 + ".png";
    min2.src = "images/numbers/" + mins2 + ".png";


    // Clock based events
    if (currTime != prevTime) {
      var light = document.getElementById("lightID");

      // 23:25: rainbow light
      if (currTime == "2325") {
        light.src = "images/rainbow.png";
        if (diamondIntervalId == null) {
          console.log('starting set interval');
          diamondIntervalId = setInterval(updateDiamondPos, 10);
        }
      } else {
        light.src = "images/light.png";
        if (diamondIntervalId) {
          clearInterval(diamondIntervalId);
          diamondIntervalId = null;
        }
      }
    }


    setTimeout(setClock, 1000);
  }
}

function updateDiamondPos() {
  // console.log('update diamond pos called');
  // dy = dt*dt*a
  // var diamond = document.getElementById("diamond");
  if (!diamond) {
    diamond = document.getElementById("diamond");
    return;
  }

  if (diamondDropStartTime == null) {
    diamondDropStartTime = Date.now();
    var temp = getComputedStyle(diamond).left;
    dx = parseInt(temp.substring(0, temp.length-2), 10);
    // console.log(dx);
    return;
  }

  var dt = ((Date.now()) - diamondDropStartTime) / 1000;  // dt in seconds

  var currPos = Math.floor(dt*dt*diamondDropSpeed);

  var temp = getComputedStyle(diamond).left;
  var currX = parseInt(temp.substring(0, temp.length-2), 10);

  temp = getComputedStyle(diamond).top;
  var currY = parseInt(temp.substring(0, temp.length-2), 10);

  if (currY < 370) {
    diamondState = "DROP_1";
  } else if (currX < 280) {
    diamondState = "ROLL_1";
  } else if (currY < 550) {
    diamondState = "DROP_2";
  } else if (currX < 850) {
    diamondState = "ROLL_2";
  } else {
    diamondState = "STOP";
  }

  // console.log(diamond.style.transform)

  if (diamondState == "DROP_1") {
    // Vertical drop
    diamond.style.top = currPos.toString() + 'px';
  } else if (diamondState == "ROLL_1") {
    // Roll to the edge of the clock
    rot += 1;
    dx += 1;
    diamond.style.transform = 'rotate(' + rot + 'deg)';
    diamond.style.left = dx + 'px';
    diamondDropStartTime  = Date.now();
    dy2 = currY;
  } else if (diamondState == "DROP_2"){
    // Drop from clock
    rot += 0.5;
    diamond.style.transform = 'rotate(' + rot + 'deg)';
    diamond.style.top = (dy2 + currPos) + 'px';
  } else if (diamondState == "ROLL_2") {
    rot += 2;
    dx += 2;
    diamond.style.transform = 'rotate(' + rot + 'deg)';
    diamond.style.left = dx + 'px';
  }

}

setClock();

