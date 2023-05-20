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
    console.log(date.getSeconds());
    // clockText.innerHTML = "Time: " + date.getHours() + " " + date.getMinutes();

    hour1.src = "images/numbers/" + Math.floor(date.getHours() / 10) + ".png";
    hour2.src = "images/numbers/" + (date.getHours() % 10) + ".png";
    min1.src = "images/numbers/" + Math.floor(date.getMinutes() / 10) + ".png";
    min2.src = "images/numbers/" + (date.getMinutes() % 10) + ".png";

    setTimeout(setClock, 1000);
  }
}

setClock();