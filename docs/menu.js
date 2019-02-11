// at least 100 px are a swipe
// you can use the value relative to screen size: window.innerWidth * .1
const offset = 100;
let xDown, yDown;
let xpDown, ypDown;

function getTouch (e) {
				if (e!==undefined && e.changedTouches!==undefined) {
					return e.changedTouches[0];	
				}
			  return false;
			}
			
function touchfinal(e) {
				
				if (!xpDown || !ypDown) {
			    return;
			  }
			  
				e.preventDefault();
				$('.product').off('click');
				
			  const {
			    clientX: xpUp,
			    clientY: ypUp
			  } = getTouch(e);
			  
			  const xpDiff = xpDown - xpUp;
			  const ypDiff = ypDown - ypUp;
			  const xpDiffAbs = Math.abs(xpDown - xpUp);
			  const ypDiffAbs = Math.abs(ypDown - ypUp);

			  // at least <offset> are a swipe
			  if (Math.max(xpDiffAbs, ypDiffAbs) < offset ) {
			    return;
			  }

			  if (xpDiffAbs > ypDiffAbs) {
			    if ( xpDiff > 0 ) {
			    	
			      console.log('pleft');
			      console.log($('#productslider').position().left + parseInt($('#productslider').css('marginLeft')));
			       if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>(-3*427)) {
			       	$('#productslider').animate({
			      	 'marginLeft' : "-=427px" //moves left
			    		}, 1000, function () {
				    			 if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))<(-3*427)) {
								  	//alert("test");
								  	$('#productslider').removeAttr('style');
								  }
				    		});	
			       }						 
			    
			    } else {
			      	console.log('pright');
			        console.log($('#productslider').position().left + parseInt($('#productslider').css('marginLeft')));
			        if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))<0) {
							 $('#productslider').animate({
				        'marginLeft' : "+=427px" //moves right
				    		}, 1000, function () {
				    			 if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>0) {
								  	//alert("test");
								  	$('#productslider').removeAttr('style');
								  }
				    		});
				     }
			    }
			  } else {
			    if ( ypDiff > 0 ) {
			      console.log('pup');
			      $(this).animate({
			        'marginTop' : "-=1000px" //moves up
			    }, 1000);
			      
			    } else {
			      		console.log('pdown');	
			      		$("#slider-wrap").removeClass("hidden").addClass("shown");	
			      	  $(this).animate({
			        		'marginTop' : "+=1000px" //moves down
			    				}, 1000, "swing",function() {
    								// Animation complete.
    								$(this).removeAttr('style');
    								$("#product-wrap").removeClass("shown").addClass("hidden");
 										 										
 								 });
			    }
			  }
			  
			  if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>0) {
			  	//alert("test");
			  	$('#productslider').removeAttr('style');
			  }
}

$( document ).ready(function() {
	
    console.log( "ready!" );

		if (navigator.maxTouchPoints==0) {
			
			$(".slider-wrap").css('-ms-touch-action', 'none');

			document.addEventListener('pointerdown', e => {
			 
			  xDown = e.x ;
			  yDown = e.y;
			     
			});

			document.addEventListener('pointerup', e => {
			  if (!xDown || !yDown) {
			    return;
			  }

			  xUp = e.x;
			  yUp = e.y;
			  
			  const xDiff = xDown - xUp;
			  const yDiff = yDown - yUp;
			  const xDiffAbs = Math.abs(xDown - xUp);
			  const yDiffAbs = Math.abs(yDown - yUp);

			  // at least <offset> are a swipe
			  if (Math.max(xDiffAbs, yDiffAbs) < offset ) {
			    return;
			  }

			  if (xDiffAbs > yDiffAbs) {
			    if ( xDiff > 0 ) {
			      console.log('left');
			      
			      $('#slider-wrap').animate({
			        slider: '-=153'
			    	}, 1000, 'easeOutQuad');
			    
			    } else {
			      console.log('right');
			       $('#slider-wrap').animate({
			        slider: '+=153'
			    }, 1000, 'easeOutQuad');
			    }
			  } else {
			    if ( yDiff > 0 ) {
			      console.log('up');
			    } else {
			      console.log('down');
			    }
			  }
			});	
			
		} else {

			/*
			$(".slider-wrap").on('touchstart mousedown', function(e){

			  const firstTouch = getTouch(e);

			  xDown = firstTouch.clientX;
			  yDown = firstTouch.clientY;
			});

			$(".slider-wrap").on('touchend mouseup', function(e){
			  if (!xDown || !yDown) {
			    return;
			  }

			  const {
			    clientX: xUp,
			    clientY: yUp
			  } = getTouch(e);
			  const xDiff = xDown - xUp;
			  const yDiff = yDown - yUp;
			  const xDiffAbs = Math.abs(xDown - xUp);
			  const yDiffAbs = Math.abs(yDown - yUp);

			  // at least <offset> are a swipe
			  if (Math.max(xDiffAbs, yDiffAbs) < offset ) {
			    return;
			  }


			  if (xDiffAbs > yDiffAbs) {
			    if ( xDiff > 0 ) {
			      console.log('left');
			      $('#slider-wrap').animate({
			        slider: '-=153'
			    }, 1000, 'easeOutQuad');
			    
			    } else {
			      console.log('right');
			       $('#slider-wrap').animate({
			        slider: '+=153'
			    }, 1000, 'easeOutQuad');
			    }
			  } else {
			    if ( yDiff > 0 ) {
			      console.log('up');
			      
			      
			    } else {
			      console.log('down');			      
			      
			    }
			  }
			});
			*/

	   $(".product").on('touchstart mousedown', function(e){

				e.preventDefault();
				
			  const firstTouch = getTouch(e);

			  xpDown = firstTouch.clientX;
			  ypDown = firstTouch.clientY;
			});
			
			
			$(".product").on('touchend mouseup', touchfinal);
				

			
			
			$(".button").on("click", function(){ 
				$("#product-wrap").removeClass("hidden").addClass("shown");
				$("#slider-wrap").removeClass("shown").addClass("hidden");
			});
			
			
			
		}

});

