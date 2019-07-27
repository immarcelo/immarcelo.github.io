 

jQuery(document).ready(function($) { 
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function map_range(value, low1, high1, low2, high2) {
	  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
	}

	 

	var galaPlay = true;


	var tree = $('#tree');
	var line = document.getElementById('line');
	var lineCtx = line.getContext('2d');

	var vw  = window.innerWidth;
	var vh  = window.innerHeight;
	
	var drawLine = function()	 {
		var treeW =  tree.innerWidth();
		var treeH =  tree.innerHeight();

		line.width = treeW;
		line.height = treeH;

		var x0 = tree.position().left;
		var y0 = tree.position().top;


		lineCtx.beginPath();
			lineCtx.moveTo(treeW/2 ,  0);
			lineCtx.lineTo(treeW/2,0);
		 
			lineCtx.lineTo(treeW/2,  treeH);
		 	lineCtx.strokeStyle = "rgba(150,150,150,.5)";
		 	lineCtx.lineWidth = 0.5;
		 	lineCtx.stroke();
	}

	drawLine();
	window.addEventListener('resize', function(){
		drawLine();
	});
	 

	 $('.ground .inner p.fall-apart').each(function(index, el) {
	 	var text = $(this).text();
	 	textArr  = text.split(" ");
       
        $(this).attr('data-length',textArr.length);
        for (i=0; i < textArr.length; i++) { 
        	var anm = Math.random() < 0.5 ? 'true' : 'false';
        	textArr[i] = "<span style='transition-delay:"+getRandomInt(1, 5)/10+"s' class='"+anm+"'> "+textArr[i]+" </span>";
        	$(this).html(textArr);
        }
	 });

	 $('.branch-master .text span').each(function(index, el) {
	 	$(this).css({
	 		'transition-delay': index/10 + 's',
	 		'-webkit-transition-delay': index/10 + 's'
	 	})
	 });	 
	 

	var step = 0;

  	$('.branch a').click(function(e) {
  		e.preventDefault();
  	});
  	$('.branch').click(function(){
  		var groundTimeout;
  		var idx = $(this).index('.branch');
  		var y = $(this).position().top;
  		var charLength = $('.ground .inner').eq(idx).attr('data-length');
  		$('.content').addClass('is-internal');
  		$(this).removeClass('is-hidden');
  		$(this).siblings('.is-current').removeClass('is-current');
  		$(this).siblings('.branch').addClass('is-hidden');
  		$(this).toggleClass('is-current');
  		$('body').attr('sec',idx); 

  		if(WURFL.is_mobile){
  			$('.content').addClass('is-content-open');
  		}  
  		 

  		WURFL.is_mobile ? groundTimeout = 500 : groundTimeout = 2000;
  		

  		$('.ground').removeClass('is-visible');
  		$('.ground').removeClass('is-anm');
  		setTimeout(function(){
  			$('.ground .inner.is-active').removeClass('is-active');
  			$('.ground .inner').eq(idx).addClass('is-active');
  			$('.ground').addClass('is-visible');
  			setTimeout(function(){
  				$('.ground').addClass('is-anm');
  			},400);
  		},groundTimeout);
  	});

	$('.branch-master').click(function(event) {
	 		
	  		$('.branch').removeClass('is-current');
	  		$('.branch').removeClass('is-hidden');
	  		$('.ground').removeClass('is-visible');
	  		$('.ground .inner').removeClass('is-active');

	  		if(!WURFL.is_mobile){ 
		  		var st = 0;
			 

				$('html, body').velocity('stop').velocity('scroll', {duration:1000, offset: st, mobileHA: false }).then(function(){
					galaPlay = true;
				});
			}
	  		
	  		
		 if(WURFL.is_mobile){
  			$('.content').removeClass('is-content-open');
  		 }
	});

 

 	$('.btn-hi').click(function(event) {
		galaPlay = false;
		$('body').addClass('is-internal');
		setTimeout(function(){
			var st = $('.content').offset().top;
			$('html, body').velocity('stop').velocity('scroll', {duration:1000, offset: st,  mobileHA: false});
		}, 1000);
	}); 

	//canvas
	
	var galaCanvas = document.getElementById('gala');
	galaCanvas.width = vw;
	galaCanvas.height = vh;
	var gala = galaCanvas.getContext('2d');

 
    gala.globalCompositeOperation = "difference";  
 

    galaTexture = new Image();
  
	galaTexture.src="dual.jpg";  
     
    

	var wST;
	if(!WURFL.is_mobile){
		$(document).scroll(function () {
			wST = $(document).scrollTop();
			if( wST > vh/2 ){
				galaPlay = false;
			}

			if( wST > vh-100 ){
				if( !$('.ground').hasClass('is-visible') ){	
					 $('.ground').addClass('is-visible');
					 $('.ground .inner').eq(0).addClass('is-active');
					 setTimeout(function () {
					  	$('.ground').eq(0).addClass('is-anm');
					  	$('.branch').not(':first-of-type').addClass('is-hidden');
					  	$('.branch').eq(0).removeClass('is-hidden');
					  	$('.branch').eq(0).addClass('is-current');
					 }, 600);
				}	
			}
			if(wST < 50) {
				galaPlay = true;
			}
		});
	} 

	


	galaTexture.onload = function(){
		$('body').addClass('is-ready');
				update();		
		}
 	var ix; 
 		WURFL.is_mobile ? ix = getRandomInt(5, 250) : ix =  1;
 	var ix2; 
 		WURFL.is_mobile ? ix2 = getRandomInt(5, 250) : ix2 = 250 ;
 	var ixR = 100;
 	var timer = 0;
 	var fps;
 	WURFL.is_mobile ? fps = 2 : fps = 12;
	function update() {
		if( !WURFL.is_mobile ) {
			requestAnimationFrame(update);
		}
		if(galaPlay == true) {
			setTimeout(function () {
	      	       		 
	       		timer+= map_range( Math.random() , 0 , 1 , -1, 1 );
	       		
	       		ix+=4;
	       		ix2+=4;
	       		if(ix > 359) {
	       			ix--;
	       		}
	       		if(ix2 > 359) {
	       			ix--;
	       		}

	       		if(ix == 0) {
	       			ix++;
	       		}
	       		if(ix2 == 0) {
	       			ix2++;
	       		}


	       		gala.rect(0,0,vw,vh); 

	       		var galaGrad = gala.createLinearGradient(ix2, ix, 0, vh);
	       		 

	       		galaGrad.addColorStop(0,'hsl('+ix+',45%,67%)');
	       		galaGrad.addColorStop(1,'hsl('+ix2+',45%,67%)'); 

	       		gala.fillStyle = galaGrad;
	       		gala.fill();

	       		gala.drawImage(galaTexture,0,0, vw, vh);
 				
				var part = gala.getImageData(0,0,vw,vh);
				for (i=0; i<part.data.length; i+=4) {
					part.data[i ] = part.data[i ];
					part.data[i + 1] = part.data[i + 1];
					part.data[i + 2] = part.data[i + 2];
					part.data[i + 3] = 200;
				}
				
	   			gala.fill(); 
                gala.putImageData(  part,     0     ,  0  ); 
   
	
	       },1000/fps);
		}     
	 }

	

	$('.content').click(function(event) {
		$(this).removeClass('is-internal');
	});
	

	 
	
	$('.tree').click(function(event) {
		$('.ground.is-visible').removeClass('is-visible');
	});
	
});