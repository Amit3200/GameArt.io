var fc = document.getElementById("fc");
var wrapper = fc.getElementsByClassName("fc__wrapper")[0];
var light = fc.getElementsByClassName("fc__light")[0];

var fcHalfHeight = 205;
var fcHalfWidth = 135;

var defaultLightWidth = 40;
var defaultLightAngle = 45;

var maxRotateX = 6;
var maxRotateY = 6;
var maxLightWidth = 25;
var maxLightAngle = 20;

var lightValue = {
  width: defaultLightWidth,
  angle: defaultLightAngle
};

wrapper.addEventListener("mousemove", function(event) {
  // Get mouse position
  var fcRect = fc.getBoundingClientRect();
  var fcOffset = {
    top: fcRect.top + document.body.scrollTop,
    left: fcRect.left + document.body.scrollLeft
  };
  var mouseX = (event.pageX - fcOffset.left) | 0;
  var mouseY = (event.pageY - fcOffset.top) | 0;

  // Move the floating card
  var diffX = -1 * (fcHalfWidth - mouseX);
  var diffY = fcHalfHeight - mouseY;
  var rotateX = diffY / fcHalfHeight * maxRotateX;
  var rotateY = diffX / fcHalfWidth * maxRotateY;

  dynamics.stop(wrapper);
  wrapper.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

  // Move the light
  lightValue.width = defaultLightWidth - (diffY / fcHalfHeight * maxLightWidth);
  lightValue.angle = defaultLightAngle + (diffX / fcHalfWidth * maxLightAngle);

  dynamics.stop(lightValue);
  light.style.backgroundImage = "linear-gradient(" + lightValue.angle + "deg, black, transparent " + lightValue.width + "%)";
});