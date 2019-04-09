window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 40) {
    document.getElementById("navrey").style.top = "0px";
  } else {
    document.getElementById("navrey").style.top = "-90px";
  }
}