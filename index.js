(function () {
  var zoom = document.getElementById("zoom"),
    Zw = zoom.offsetWidth,
    Zh = zoom.offsetHeight,
    img = document.querySelector(".overlay-img");
    bg = document.querySelector(".overlayBg");
    border = document.querySelector(".text-border");
    text = document.querySelector(".text");


  var timeout, ratio, Ix, Iy;

  function activate() {
    document.body.classList.add("active");
  }

  function deactivate() {
    document.body.classList.remove("active");
    img.classList.add("grey-scale");
  }

  function onLoad() {
    ratio = "1";
    // zoom.style.backgroundImage =
    //   "url(https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg)";
    console.log(zoom.style);
    Ix = img.offsetLeft;
    Iy = img.offsetTop;
  }
  
  function updateMagnifier(x, y) {
      zoom.style.top = y+75 + "px";
      zoom.style.left = x+80 + "px";
      ratio = "1";
      Ix = img.offsetLeft;
      Iy = img.offsetTop;
      zoom.style.backgroundPosition =
      (Ix - x) * ratio + Zw / 2 + "px " + ((Iy - y) * ratio + Zh / 2) + "px";
    }
    
    function onMousemove(e) {
        clearTimeout(timeout);
        activate();
        updateMagnifier(e.x, e.y);
        timeout = setTimeout(deactivate, 2500);
        moveClouds()

        //hover effect
        bg.addEventListener("mousemove", (e)=>{
          let xAxis= (window.innerWidth  - e.pageX*2)/100;
        let yAxis= (window.innerHeight  - e.pageY*2)/100;
        img.style.transform = 'perspective(1000px) rotateY(' + -xAxis + 'deg)' + 'rotateX(' + yAxis + 'deg)' ;
        text.style.transform = 'perspective(1000px) rotateY(' + -xAxis/2 + 'deg)' + 'rotateX(' + yAxis/2 + 'deg)' ;
        border.style.transform = 'perspective(1000px) rotateY(' + -xAxis/2 + 'deg)' + 'rotateX(' + yAxis/2 + 'deg)' ;
        });
       
        bg.addEventListener("mouseenter", (e)=>{
        img.style.transition = "none";    
        img.style.transition = "0.5s all ease";
        
    });
    
    bg.addEventListener("mouseleave", (e)=>{
        img.style.transition = "0.5s all ease";
        img.style.transform = "rotateX(0deg) rotateY(0deg)";
        border.style.transform = "rotateX(0deg) rotateY(0deg)";
        text.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }
  
  function onMouseleave() {
      deactivate();
  }
  
  function moveClouds(){
    /* clouds 1 & 2 move to the left 
       clouds 3 & 4 to the right */
     for(i = 1; i < 5; i++){
       var cloud = 
       document.getElementById("cloud" + i);
       cloud.style.transitionTimingFunction = "ease-out";
       cloud.style.transitionDuration = "700ms";
       var top =  window.getComputedStyle(cloud, null).getPropertyValue("top");
       
         topValue = parseInt(top);
         topValue = topValue - 20;
         top = topValue + "px";
      
       cloud.style.top = top;
       
       var left = window.getComputedStyle(cloud, null).getPropertyValue("left");
         leftValue = parseInt(left);
       
         if(i < 3){
           leftValue = leftValue - 30;
         }else {
           leftValue = leftValue + 30;
         }
         left = leftValue + "px";
       
       cloud.style.left = left;
     }

   }
  img.addEventListener("load", onLoad);
  img.addEventListener("mousemove", onMousemove);
//   img.addEventListener("mouseenter", moveClouds);
  img.addEventListener("mouseleave", onMouseleave);
})();

  $(".overlay-img").ripples({
    resolution: 256,
    perturbance: 0.01,
  });


   

  $(".overlay").click(function(){
    // this.style.transition = '0.7s all ease-in-out';
    // this.style.transform = 'scale(2)';
    this.style.animation = 'overlayAnimation 1s ease-in-out';
    setTimeout(function() { 
        $('.overlay').fadeOut();}, 1000); 
  
  
  });
