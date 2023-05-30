var projectPageDiamond;
var diamondHoverText;
var flower;
var breakSound1;
var breakSound2;

function onDiamondClick() {
  // Play sound

  // Change image source
  var currSrc = projectPageDiamond.src;
  console.log(currSrc);
  if (currSrc.endsWith('diamond.png')) {
    projectPageDiamond.src = '../images/diamond-2.png';
    diamondHoverText.innerHTML = 'いいね';
    breakSound1.play();
  } else if (currSrc.endsWith('diamond-2.png')) {
    projectPageDiamond.src = '../images/diamond-3.png';
    diamondHoverText.innerHTML = 'あと少し';
    breakSound1.play();
  } else if (currSrc.endsWith('diamond-3.png')) {
    projectPageDiamond.src = '../images/diamond-break-1.gif';
    diamondHoverText.style.display = 'none';
    breakSound2.play();
    flower.style.opacity = 1;
    flower.style.pointerEvents = 'auto';
    // flower.setAttribute('opacity', '1');
  }
}


window.onload = function() {
  projectPageDiamond = document.getElementById('diamond-ID');
  diamondHoverText = document.getElementById('diamond-hover-text-ID');
  flower = document.getElementById('flower-ID');
  breakSound1 = new Audio('../sounds/break-1.mp3');
  breakSound2 = new Audio('../sounds/break-2.mp3');
}