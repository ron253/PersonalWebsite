class Animation {
  constructor() {
    this.interval = 0;
  }

  navBarFadeIn(content) {
    setInterval(function() {
      let nav = content;
      let opacity = Number(window.getComputedStyle(nav).getPropertyValue("opacity"));
      if(opacity < 1) {
        opacity = opacity +0.3;
        nav.style.opacity = opacity;
      }
      else {
        clearInterval(this.interval);
      }
    }, 200)

  }
}


animation = new Animation();
let navigationBar = document.getElementById("navigation-bar");
window.addEventListener("load",  function() {
  animation.navBarFadeIn(navigationBar);
});
