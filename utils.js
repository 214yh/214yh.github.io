var diamondDropStartTime = null;
var diamondDropSpeed = 300;
var diamond = document.getElementById("diamond");
var rot = 0;
var dx = 0;
var dy2 = 0;
var step = 1;
var diamondState = "DROP_1";

var diamondIntervalId = null;

var tablePhone;
var interactablePhone;
var bgShader;
var passcodeElement;
var phoneScreen;
var lockScreenItems;
var homeScreenItems;
var passcodeHint;
var hour1;
var hour2;
var min1;
var min2;

var passcodeBuffer = '';
var phoneClock;


function setClock() {
  // var clockText = document.getElementById("clocktext");
  

  if (!hour1 || !hour2 || !min1 || !min2 || !phoneClock) {
    setTimeout(setClock, 1000);
  } else {
    var date = new Date();
    // console.log(date.getSeconds());
    // clockText.innerHTML = "Time: " + date.getHours() + " " + date.getMinutes();

    var hr1 = Math.floor(date.getHours() / 10);
    var hr2 = (date.getHours() % 10);
    var mins1 = Math.floor(date.getMinutes() / 10);
    var mins2 = (date.getMinutes() % 10);

    phoneClock.innerHTML = hr1.toString() + hr2.toString() + ":" + mins1.toString() + mins2.toString();


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
      var phoneScreen = document.getElementById ("phone-screen");
      

      // 23:25: rainbow light
      if (currTime == "2325") {
        light.src = "images/rainbow.png";
        if (diamondIntervalId == null) {
          console.log('starting set interval');
          diamondIntervalId = setInterval(updateDiamondPos, 10);
        }
      } else {
        light.src = "images/light.png";
        phoneScreen.style.opacity = "0";
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
    var phoneScreen = document.getElementById ("phone-screen");
    phoneScreen.style.opacity = "1";
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


function displayPhone() {
  tablePhone.style.display = 'none';
  interactablePhone.style.display = '';
  bgShader.style.display = '';
}

function hidePhone() {
  passcodeBuffer = '';
  passcodeElement.innerHTML = passcodeBuffer;
  bgShader.style.display = 'none';
  interactablePhone.style.display = 'none';
  tablePhone.style.display = '';
}

function typeNumber(num) {
  if (passcodeBuffer.length < 8) {
    passcodeBuffer += num + ' ';
  }

  passcodeElement.innerHTML = passcodeBuffer;

}

function hash(s) {
    // Compute simple hash of string
    // Reference: https://en.wikipedia.org/wiki/Jenkins_hash_function
    var hash = 0;
    for (var i = 0; i < s.length; i ++) {
        hash += s.charCodeAt(i);
        hash += hash << 10;
        hash ^= hash >> 6;
    }
    hash += hash << 3;
    hash ^= hash >> 11;
    hash += hash << 15;
    return hash;
}

function checkPW(n) {
  return hash(n) == 1815781136;
}

function enterPasscode() {
  if (checkPW(passcodeBuffer)) {
    phoneScreen.src = 'images/phone-home-screen.png';
    passcodeBuffer = '';
    passcodeElement.innerHTML = passcodeBuffer;
    lockScreenItems.style.display = 'none';
    phoneClock.style.display = '';
    homeScreenItems.style.display = '';
  } else {
    passcodeBuffer = '';
    passcodeElement.innerHTML = passcodeBuffer;
    passcodeHint.style.display = '';
  }
}




window.onload = function() {
  tablePhone = document.getElementById('table-phone-ID');
  interactablePhone = document.getElementById('smartphone-ID');
  bgShader = document.getElementById('background-shader-ID');
  passcodeElement = document.getElementById('phone-passcode-ID');
  phoneScreen = document.getElementById('interactable-phone-ID');
  lockScreenItems = document.getElementById('lock-screen-items-ID');
  phoneClock = document.getElementById('phone-clock-ID');
  homeScreenItems = document.getElementById('home-screen-items-ID');
  passcodeHint = document.getElementById('passcode-hint-ID');
  hour1 = document.getElementById("hour1");
  hour2 = document.getElementById("hour2");
  min1 = document.getElementById("min1");
  min2 = document.getElementById("min2");
}

setClock();

