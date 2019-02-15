// at least 100 px are a swipe
// you can use the value relative to screen size: window.innerWidth * .1
const offset = 100;
var wwidth = 0;
var wheight = 0;
const poffsetw = 0;
const poffsett = 0;
const products = 7;
var catimages = { "cat1" : "Colorful-Circle-Fractal.png",
									"cat2" : "Colorful-Circle-Fractal.png",
									"cat3" : "Colorful-Circle-Fractal.png",
									"cat4" : "Colorful-Circle-Fractal.png",
									"cat5" : "Colorful-Circle-Fractal.png",
									"cat6" : "Colorful-Circle-Fractal.png",
 }
var categories  = { "cat1" : [ "fasion-14.jpg","fasion-15.jpg", "fashion-02.jpg", "fashion-09.jpg", "fashion-05-726x1024.jpg","fashion-10.jpg", "fashion-11.jpg", "fasion-13.jpg" ],
"cat2" : [ "fashion-05-726x1024.jpg","fashion-10.jpg", "fashion-11.jpg", "fasion-13.jpg","fasion-14.jpg","fasion-15.jpg", "fashion-02.jpg", "fashion-09.jpg" ],
"cat3" : [ "fashion-10.jpg", "fashion-11.jpg", "fasion-13.jpg", "fasion-14.jpg","fasion-15.jpg", "fashion-02.jpg", "fashion-09.jpg", "fashion-05-726x1024.jpg" ],
"cat4" : [ "fashion-09.jpg", "fashion-05-726x1024.jpg","fasion-14.jpg","fasion-15.jpg", "fashion-02.jpg", "fashion-10.jpg", "fashion-11.jpg", "fasion-13.jpg" ],
"cat5" : [ "fasion-15.jpg", "fasion-14.jpg","fashion-02.jpg", "fashion-09.jpg", "fashion-05-726x1024.jpg","fashion-10.jpg", "fashion-11.jpg", "fasion-13.jpg" ],
"cat6" : [ "fashion-11.jpg", "fasion-14.jpg","fasion-15.jpg", "fashion-02.jpg", "fashion-09.jpg", "fashion-05-726x1024.jpg","fashion-10.jpg","fasion-13.jpg" ]
 };

var interval = 0; 
let xDown, yDown, xpDown, ypDown, xsDown, ysDown;

function autoscrollp() {
	 clearInterval(interval);
	 interval = window.setInterval(autoscroll,4000);
	 
	 if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>(-products*wwidth)) {
	 	$('#productslider').animate({
		 'marginLeft' : "-="+wwidth //moves left
		}, 500, function () {
				 if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))<=(-products*wwidth)) {
			  	// Animation complete.
			  	//alert("test");
			  	$('#productslider').removeAttr('style');
			  }
			});	
 	}
 	if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>0) {
  	//alert("test");
  	$('#productslider').removeAttr('style');
  }
}

function autoscroll() {
	console.log("autoscroll");
						
	if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>(-products*wwidth)) {
	 	$('#productslider').animate({
		 'marginLeft' : "-="+wwidth //moves left
		}, 500, function () {
				 if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))<=(-products*wwidth)) {
			  	// Animation complete.
			  	//alert("test");
			  	$('#productslider').removeAttr('style');
			  }
			});	
 	}
 	if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>0) {
  	//alert("test");
  	$('#productslider').removeAttr('style');
  }
}

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
			      clearInterval(interval);
			      interval = window.setInterval(autoscrollp,20000);
			      
			      if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))>(-products*wwidth)) {
			       	$('#productslider').animate({
			      	 'marginLeft' : "-="+wwidth //moves left
			    		}, 500, function () {
				    			 if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))<=(-products*wwidth)) {
								  	// Animation complete.
								  	//alert("test");
								  	$('#productslider').removeAttr('style');
								  }
				    		});	
			       }						 
			    
			    } else {
			    	
			      	console.log('pright');
			        console.log($('#productslider').position().left + parseInt($('#productslider').css('marginLeft')));
			        clearInterval(interval);
			        interval = window.setInterval(autoscrollp,20000);			        			        
			        
			        if ($('#productslider').position().left + parseInt($('#productslider').css('marginLeft'))<0) {
							 $('#productslider').animate({
				        'marginLeft' : "+="+wwidth //moves right
				    		}, 500, function () {
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
									}, 500, "swing",function() {
										// Animation complete.
										clearInterval(interval);
										$(this).removeAttr('style');
										//$("#product-wrap").removeClass("shown").addClass("hidden");
										//$("#slider-wrap").removeClass("hidden").addClass("shown");											
					    	  });
					      
					    } else {
					      		console.log('pdown');	
					      		
					      	  $(this).animate({
					        		'marginTop' : "+=1000px" //moves down
					    				}, 500, "swing",function() {
		    								// Animation complete.
		    								clearInterval(interval);
		    								$(this).removeAttr('style');
		    								$("#product-wrap").removeClass("shown").addClass("hidden"); 	
		    								$("#slider-wrap").removeClass("hidden").addClass("shown");
		    								$("#close").removeClass("shown").addClass("hidden");			
		    								$("#main-header").removeClass("hidden").addClass("shown");
											  $("#main-footer").removeClass("hidden").addClass("shown");							 										
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
		wwidth = $(window).width();
		wheight = $(window).height();
		
		if (navigator.maxTouchPoints==0) {
			
			$(".slider-wrap").css('-ms-touch-action', 'none');
			
		} else {		
			
			$(".close").on('touchend mouseup', function(e){

					e.preventDefault();
					
					clearInterval(interval);
					$("#product-wrap").removeClass("shown").addClass("hidden"); 	
					$("#slider-wrap").removeClass("hidden").addClass("shown");
					$("#close").removeClass("shown").addClass("hidden");		

			});			
			
			$(".product").on('touchstart mousedown', function(e){

						e.preventDefault();

						const firstTouch = getTouch(e);

						xpDown = firstTouch.clientX;
						ypDown = firstTouch.clientY;
			});			
							
			$("body").on('touchstart mousedown', function(e){

				e.preventDefault();

				const firstTouch = getTouch(e);

				xsDown = firstTouch.clientX;
				ysDown = firstTouch.clientY;
			});
							
			$(".button").on("touchend mouseup", function(e){ 
				
				e.preventDefault();
				
  			const {
			    clientX: xsUp,
			    clientY: ysUp
			  } = getTouch(e);
			  
			  const xsDiff = xsDown - xsUp;
			  const ysDiff = ysDown - ysUp;
			  const xsDiffAbs = Math.abs(xsDown - xsUp);
			  const ysDiffAbs = Math.abs(ysDown - ysUp);
			  
			  if (Math.max(xsDiffAbs, ysDiffAbs) < 10 ) {
			  		
			  	 	$('.product').off('click');
						$('.product').prop('onclick', null);
												
			  		$( "#productslider" ).empty();
			  		
			  		/*
			  		$("#product-wrap").position({
						    my:        "left top",
						    at:        "left top",
						    of:        $("#imenu"),
						    collision: "fit"
						});
						
						$("#productslider").position({
						    my:        "left top",
						    at:        "left top",
						    of:        $("#product-wrap"),
						    collision: "fit"
						});
						*/
						
						//$("#productslider").css({top: 0, left: 0});
						//$("#product-wrap").css({top: 0, left: 0});
												
						//$("#productslider").css('margin-left','0px');

						//$("#productslider").parent().css({position: 'relative'});
						//$("#productslider").css({top: 0, left: 0, position:'absolute'});
						
						//$("#product-wrap").parent().css({position: 'relative'});
						//$("#product-wrap").css({top: 0, left: 0, position:'absolute'});
						
		  			for (var i = 0; i < categories[e.currentTarget["id"]].length; ++i) {
 							 console.log(categories[e.currentTarget["id"]][i]);
 							 $( "#productslider" ).append('<div class="product"><img src="'+categories[e.currentTarget["id"]][i]+'" class="img"></div>');
 						}
									
						$(".product").on('touchstart mousedown', function(e){

							e.preventDefault();

							const firstTouch = getTouch(e);

							xpDown = firstTouch.clientX;
							ypDown = firstTouch.clientY;
						});			
			
						$(".product").on('touchend mouseup', touchfinalp);
			
			  		$('.img').each(function(i, item) {			  			
			  			 $(item).on('load', function() {
			  			 		
			  			 		var img_height = $(item).height();
							    var div_height = $(item).parent().parent().parent().height();
							    var div_width = $(item).parent().parent().parent().width();
					    
						    if(img_height<div_height){
						        //IMAGE IS SHORTER THAN CONTAINER HEIGHT - CENTER IT VERTICALLY
						        var newMarginT = (div_height-img_height)/2;
						        //$(item).css({'margin-top': newMargin });
						    }
						    /*else if(img_height>div_height){
						        //IMAGE IS GREATER THAN CONTAINER HEIGHT - REDUCE HEIGHT TO CONTAINER MAX - SET WIDTH TO AUTO  
						        $(item).css({'width': 'auto', 'height': '103%'});
						        //CENTER IT HORIZONTALLY
						        var img_width = $(item).width();
						        var div_width = $(item).parent().width();
							   }
							   */
							   if ($(item).width()>div_width && $(item).height()>div_height) {
							   	
							   		var canvas = document.createElement('canvas');
								    canvas.width=div_width+poffsetw;
								    canvas.height=div_height;
								    ctx = canvas.getContext('2d');
								    //Draw Canvas Fill mode
								    ctx.imageSmoothingEnabled = false;
									  ctx.fillStyle = 'white';
										ctx.fillRect(0,0,canvas.width, canvas.height);
										var newMarginL = Math.round(($(item).width()-div_width)/2);
										var newMarginT = Math.round((img_height-div_height)/2);

										ctx.drawImage(item,newMarginL,newMarginT,div_width,div_height,0,0,div_width,div_height);
										console.log(canvas.toDataURL('image/jpeg'));
										item.src = canvas.toDataURL('image/jpeg');							   	
							   	
							   } else {
							   	
							   	 if ($(item).width()>div_width) {
								    var canvas = document.createElement('canvas');
								    canvas.width=div_width+poffsetw;
								    canvas.height=div_height;
								    ctx = canvas.getContext('2d');
								    //Draw Canvas Fill mode
								    ctx.imageSmoothingEnabled = false;
									  ctx.fillStyle = 'white';
										ctx.fillRect(0,0,canvas.width, canvas.height);
										var newMarginL = (div_width-$(item).width())/2+'px';
										//var newMarginT = (div_height-img_height)/2;

										ctx.drawImage(item,0,0,div_width+poffsetw,img_height,0,newMarginT,div_width,img_height);
										console.log(canvas.toDataURL('image/jpeg'));
										item.src = canvas.toDataURL('image/jpeg');
								   }
								   
								   if ($(item).width()<div_width) {
									    var canvas = document.createElement('canvas');
									    canvas.width=div_width+poffsetw;
									    canvas.height=div_height;
									    ctx = canvas.getContext('2d');
									    
									      //Draw Canvas Fill mode
									    ctx.imageSmoothingEnabled = false;
										  ctx.fillStyle = 'white';
											ctx.fillRect(0,0,canvas.width, canvas.height);
											
											var newMarginL = (div_width-$(item).width())/2;
											//var newMarginT = (div_height-img_height)/2;
											
											ctx.drawImage(item,0,0,div_width+poffsetw,img_height,newMarginL,newMarginT,div_width,img_height);
											console.log(canvas.toDataURL('image/jpeg'));
											item.src = canvas.toDataURL('image/jpeg');
						   			}
							   }
			  			 });					   	
						});

						//loaded[e.currentTarget["id"]]="1";
						
						$("#close" ).empty();
						
						$('#close').html("<img class='closebtn' src='"+ catimages[e.currentTarget["id"]] +"'/>");
						
						$("#product-wrap").removeClass("hidden").addClass("shown");
						$("#slider-wrap").removeClass("shown").addClass("hidden");
						$("#close").removeClass("hidden").addClass("shown");
						$("#main-header").removeClass("shown").addClass("hidden");
            $("#main-footer").removeClass("shown").addClass("hidden");
            clearInterval(interval);
						interval = window.setInterval(autoscroll,4000);
			  }			  
			
			});
		}
});

