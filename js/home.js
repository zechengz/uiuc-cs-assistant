var w = window.innerWidth;
var h = window.innerHeight;
var wawa1 = document.getElementById("down1");

wawa1.addEventListener("click", function() {
  var curr = window.pageYOffset;
  if(curr < h) {
    var dis = h-curr;
    function step() {
      if(dis > 0 && dis >= 30) {
        dis -= 30;
        window.scrollTo(0,curr + 30);
        curr += 30;
        window.requestAnimationFrame(step);
      }
      else if(dis > 0 && dis < 30) {
        window.scrollTo(0,curr + dis);
      }
    }
    window.requestAnimationFrame(step);
  }
});

var wawa2 = document.getElementById("down2");
wawa2.addEventListener("click", function() {
var curr = window.pageYOffset;
  if(curr < 2*h) {
    var dis = 2*h-curr;
    function step() {
      if(dis > 0 && dis >= 30) {
        dis -= 30;
        window.scrollTo(0,curr + 30);
        curr += 30;
        window.requestAnimationFrame(step);
      }
      else if(dis > 0 && dis < 30) {
        window.scrollTo(0,curr + dis);
      }
    }
    window.requestAnimationFrame(step);
  }
});

var wawa3 = document.getElementById("down3");
wawa3.addEventListener("click", function() {
var curr = window.pageYOffset;
  if(curr < 3*h) {
    var dis = 3*h-curr;
    function step() {
      if(dis > 0 && dis >= 30) {
        dis -= 30;
        window.scrollTo(0,curr + 30);
        curr += 30;
        window.requestAnimationFrame(step);
      }
      else if(dis > 0 && dis < 30) {
        window.scrollTo(0,curr + dis);
      }
    }
    window.requestAnimationFrame(step);
  }
});