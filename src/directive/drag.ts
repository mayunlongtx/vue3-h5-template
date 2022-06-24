const drag = {
  mounted(el) {
    console.log(el)
    el.style.position = 'absolute'
    el.handler = () => {
      var maxW = document.documentElement.clientWidth;
      var maxH = document.documentElement.clientHeight;
      var startX = 0;
      var startY = 0;
      el.addEventListener("touchstart", function(e) {

        console.log(e)
        e.stopPropagation()
        startX = e.targetTouches[0].pageX - el.offsetLeft;
        startY = e.targetTouches[0].pageY - el.offsetTop;
      },false);
      el.addEventListener("touchmove", function(e) {
        e.stopPropagation()
        var leftX = e.targetTouches[0].pageX - startX;
        var topY = e.targetTouches[0].pageY - startY;
        var thisW = e.targetTouches[0].target.clientWidth;
        var parentW = e.targetTouches[0].target.offsetParent.clientWidth;
        var thisH = e.targetTouches[0].target.clientHeight;
        var parentH = e.targetTouches[0].target.offsetParent.clientHeight;
        
        el.style.left = leftX + "px";
        el.style.top = topY + "px";
      })
    };
    // 点击监听
    el.addEventListener('touchend', el.handler)
  },
  
  unmounted(el, binding) {
    el.removeEventListener('onmousedown', el.handler);
  },
};
export default drag;