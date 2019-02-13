// at least 100 px are a swipe
// you can use the value relative to screen size: window.innerWidth * .1
const offset = 100;
const wwidth = $(window).width();
const poffsetw = 0;
const poffsett = 0;

let xDown, yDown;
let xpDown, ypDown;

function getTouch (e) {
				if (e!==undefined && e.changedTouches!==undefined) {
					return e.changedTouches[0];	
				}
			  return false;
			}


function touchfinalp(e) {
				
				if (!xpDown || !ypDown) {
			    return;
			  }
			  
				e.preventDefault();
				$('.product').off('click');
				$('.product').prop('onclick', null);
				
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
			      
			      if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>(-3*wwidth)) {
			       	$('#productslider').animate({
			      	 'marginLeft' : "-="+wwidth //moves left
			    		}, 1000, function () {
				    			 if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))<(-3*wwidth)) {
								  	// Animation complete.
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
				        'marginLeft' : "+="+wwidth //moves right
				    		}, 1000, function () {
				    			 if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>0) {
				    			 	//Animation complete.
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
			
			$(".product").on('touchstart mousedown', function(e){

				e.preventDefault();

				const firstTouch = getTouch(e);

				xpDown = firstTouch.clientX;
				ypDown = firstTouch.clientY;
			});
			
			
			$(".product").on('touchend mouseup', touchfinalp);
							
			$(".button").on("touchend click", function(){ 
				
				$('.img').each(function(i, item) {
			    var img_height = $(item).height();
			    var div_height = $(item).parent().parent().parent().height();
			    var div_width = $(item).parent().parent().parent().width();
			    if(img_height<div_height){
			        //IMAGE IS SHORTER THAN CONTAINER HEIGHT - CENTER IT VERTICALLY
			        var newMargin = (div_height-img_height)/2+'px';
			        $(item).css({'margin-top': newMargin });
			    }
			    /*else if(img_height>div_height){
			        //IMAGE IS GREATER THAN CONTAINER HEIGHT - REDUCE HEIGHT TO CONTAINER MAX - SET WIDTH TO AUTO  
			        $(item).css({'width': 'auto', 'height': '103%'});
			        //CENTER IT HORIZONTALLY
			        var img_width = $(item).width();
			        var div_width = $(item).parent().width();
				   }
				   */
				   if ($(item).width()>div_width) {
					    var canvas = document.createElement('canvas');
					    canvas.width=div_width+poffsetw;
					    canvas.height=div_height;
					    ctx = canvas.getContext('2d');
					    //Draw Canvas Fill mode
						  ctx.fillStyle = 'white';
							ctx.fillRect(0,0,canvas.width, canvas.height);

							ctx.drawImage(item,0,0,div_width+poffsetw,img_height);
							console.log(canvas.toDataURL('image/jpeg'));
							item.src = canvas.toDataURL('image/jpeg');
				   }
				   
				   if ($(item).width()<div_width) {
					    var canvas = document.createElement('canvas');
					    canvas.width=div_width+poffsetw;
					    canvas.height=div_height;
					    ctx = canvas.getContext('2d');
					    
					      //Draw Canvas Fill mode
						  ctx.fillStyle = 'white';
							ctx.fillRect(0,0,canvas.width, canvas.height);
							
							ctx.drawImage(item,0,0,div_width+poffsetw,img_height,0,0,div_width,div_height);
							console.log(canvas.toDataURL('image/jpeg'));
							item.src = canvas.toDataURL('image/jpeg');
				   }
				   
				   
				});

				$("#product-wrap").removeClass("hidden").addClass("shown");
				$("#slider-wrap").removeClass("shown").addClass("hidden");
			});
		}

});

