var startTheRain;

(function(){
  startTheRain = function(){
    // window.addEventListener("DOMContentLoaded",drawDrops, false);
    // window.addEventListener("resize", setResetFlag, false);
    drawDrops();
  }
  var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

  var dropNum = 100;
  var browserWidth;
  var browserHeight;

  var drops = [];
  var hiddenDrops = [];

  function Drop(element){
    this.element = element;
    this.xPos = getStartX();
    this.yPos = getStartY();
    this.speedX = getSpeedX();
    this.speedY = getSpeedY();

    this.element.style.opacity = .2 + 0.8*Math.random();
    this.element.height = 35 + 15*Math.random();
  }

  Drop.prototype.update = function(){
    this.xPos += this.speedX;
    this.yPos += this.speedY;
    if (this.yPos > browserHeight)
      this.yPos = -50;
    if (this.xPos < -150)
      this.xPos += browserWidth+200;
    setTranslate3DTransform(this.element, Math.round(this.xPos), Math.round(this.yPos));
  }


  function drawDrops(){
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    var originalDrop = document.querySelector(".raindrop");
    var dropContainer = originalDrop.parentNode;
    // originalDrop.style.display = "block";
    originalDrop.style.display = "none";
    for (var i = 0; i < dropNum; i++){
      drawDrop(originalDrop, dropContainer);
    }

    moveDrops();
  }

  function moveDrops(){
    for (var i = 0; i < dropNum; i++){
      drops[i].update();
    }
    if (hiddenDrops.length > 0){
      var unhiddenDrop = hiddenDrops.pop();
      unhiddenDrop.element.style.display = "block";
    }
    requestAnimationFrame(moveDrops);
  }

  function drawDrop(originalDrop, dropContainer){
    var clonnedDrop = originalDrop.cloneNode(true);
    dropContainer.appendChild(clonnedDrop);

    var dropObject = new Drop(clonnedDrop);
    drops.push(dropObject);
    hiddenDrops.push(dropObject);
  }



  function getStartX(){
    return getPosition(150, browserWidth);
  }

  function getStartY(){
    return getPosition(150, browserHeight);
  }

  function getSpeedX(){
    return -2.5 - Math.random();
  }

  function getSpeedY(){
    return 6 + Math.random();
  }

  function getPosition(offset, size) {
    return Math.round(-1*offset + Math.random() * (size+2*offset));
  }


  function setTranslate3DTransform(element, xPosition, yPosition) {
    var val = "translate3d(" + xPosition + "px, " + yPosition + "px" + ", 0)";
    element.style[transformProperty] = val;
  }

  var transforms = ["transform",
                  "msTransform",
                  "webkitTransform",
                  "mozTransform",
                  "oTransform"];

  var transformProperty = getSupportedPropertyName(transforms);
  function getSupportedPropertyName(properties) {
      for (var i = 0; i < properties.length; i++) {
          if (typeof document.body.style[properties[i]] != "undefined") {
              return properties[i];
          }
      }
      return null;
  }

})();
