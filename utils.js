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
      if (currTime == "1655") {
        light.src = "images/rainbow.png";
      } else {
        light.src = "images/light.png";
      }
    }


    setTimeout(setClock, 1000);
  }
}

setClock();