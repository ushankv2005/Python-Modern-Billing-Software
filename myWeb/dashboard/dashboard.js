function getdate(){
    const date = new Date();
    const n = date.toDateString();
    const time = date.toLocaleTimeString();
    document.getElementById('dateZ').innerHTML= n;
}
getdate();

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
     (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
function news(){
    window.open('https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en','_blank');
}

function windowClose() {
  window.open('','_parent','');
  window.close();
}
function bill(){
  window.location.href='./demo.html';
}
