jQuery(document).ready(function($) {

    function GetIEVersion() {
      var sAgent = window.navigator.userAgent;
      var Idx = sAgent.indexOf("MSIE");

      // If IE, return version number.
      if (Idx > 0) 
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

      // If IE 11 then look for Updated user agent string.
      else if (!!navigator.userAgent.match(/Trident\/7\./)) 
        return 11;

      else
        return 0; //It is not IE
    }

    if (GetIEVersion() > 0) {
       $('body').addClass('is-ie')
    } 


    svg4everybody();
    var loader = new PxLoader();
    loader.addImage('images/mosaico-full.jpg');
    loader.addImage('images/svg/map.svg');
    loader.addImage('images/dist/sprite.svg');
    var totalImg = 12;
    var loaderProgress = 0;
    var barParts = 100/totalImg; 
    for (var i = 1; i < totalImg; i++) {
        var pxImage = new PxLoaderImage('images/mosaico/m'+i+'.jpg'); 
        pxImage.imageNumber = i + 1; 
        loader.add(pxImage); 
    }  
    loader.start(); 

    function loaderView(state){
        if ( state == "show") {
            $('#loader').addClass('is-visible');
        }
        else {
            $('#loader').removeClass('is-visible');
        }
    }

    document.getElementById('site-intro').addEventListener("wheel", function(){
         $('#scrollDown').trigger('click');
    });

    function enterInterna(idx) { 
        if (!idx) {idx=0}
        $('.content-interna').find('.inner').eq(idx).addClass('is-current');
        var current = $('.content-interna').find('.inner.is-current')
        var contentInternaHeight =  current.outerHeight(true);
        $('.content-interna').css('height', contentInternaHeight+60);
 
        var title = current.find('.main-title');
        var subtitle = current.find('.sub-title');
        var contentMenu = current.find('.content-menu');
        var mosaicoItens = current.parents('.interna').find('.mosaico-interna div');
        var contentMenuItem = contentMenu.find('.content-menu-item');

        contentInternaIntro = new TimelineMax();
        contentInternaIntro.staggerFrom(mosaicoItens, .4, {autoAlpha:0, y:-50},.2 )
        .to(title, .2, {autoAlpha:1})
        .to(subtitle, .2, {autoAlpha:1})
        .staggerTo(contentMenuItem, .2, {autoAlpha:1}, .1);

        $('.is-current').parents('.interna').find('.interna-navegacao a').eq(idx).addClass('is-current');
    }
   
    var contentInternaSaida, contentInternaIntro;
    enterInterna();

    $(document).on('click', '.interna-navegacao a', function(){
        var idx = $(this).index('.interna-navegacao a');
        var interna = $(this).parents('.interna').find('.content-interna');

        $(this).siblings('.is-current').removeClass('is-current');
        $(this).addClass('is-current');
        
        var prev = interna.find('.inner.is-current');
        var current = interna.find('.inner').eq(idx); 
        
        /*ITENS SEÇÃO CURRENT PARA ENTRADA*/
        var title = current.find('.main-title');
        var subtitle = current.find('.sub-title');
        var contentMenu = current.find('.content-menu');
        var contentMenuItem = contentMenu.find('.content-menu-item');

        title.removeClass('is-current');

        /*ITENS SEÇÃO PREV PARA SAÍDA*/
        var titlePrev = prev.find('.main-title');
        var subtitlePrev = prev.find('.sub-title');
        var contentMenuPrev = prev.find('.content-menu');
        var contentMenuItemPrev = contentMenuPrev.find('.content-menu-item');
 
        /*ANIMAÇÃO SAÍDA*/
        contentInternaSaida = new TimelineMax({paused:true,onComplete:anmEnd});
        contentInternaSaida.to(titlePrev, .2, {y:-10,autoAlpha:0})
        .to(subtitlePrev, .2, {y:-10,autoAlpha:0})
        .staggerTo(contentMenuItemPrev, .2, {y:-10, autoAlpha:0}, .1);

        /*ANIMAÇÃO ENTRADA*/
        contentInternaIntro = new TimelineMax({paused:true});
        contentInternaIntro.to(title, .2, {autoAlpha:1})
        .to(subtitle, .2, {autoAlpha:1})
        .staggerTo(contentMenuItem, .2, {autoAlpha:1}, .1);

        contentInternaSaida.resume();

        $('#interna-loader > .interna').scrollTop(0);

        function anmEnd() {
            contentInternaIntro.resume();
            interna.find('.inner.is-current').removeClass('is-current');
            current.addClass('is-current');
        } 
 
    });

    $(document).on('click', '.main--navegacao a.nav-toSec', function(){
        /*ANIMAÇÃO SAÍDA*/
        $('.main--navegacao a.is-current').removeClass('is-current');
        $(this).addClass('is-current');
        var interna = $('.interna');
        var currentMosaicoItens = interna.find('.mosaico-interna div');

        mapaOutro = new TimelineMax({onComplete:mapaOutroEnd});
        mapaOutro.to('#mapa', .6, {scale:1.2, opacity:0});

        contentInternaSaida = new TimelineMax({paused:true,onComplete:anmEnd});
        contentInternaSaida.staggerTo('.interna-navegacao a', .2, {y:10, opacity:0}, 0.1)
        .staggerTo(currentMosaicoItens, .5, {y:-10,autoAlpha:0}, .2)
        .to(interna, .4, {y:-10,autoAlpha:0}, "-=0.5");
        
        var page = $(this).attr('data-page'); 

        mapaOutro = new TimelineMax({paused:true});
        mapaOutro.to('#mapa', .6, {scale:1.2, opacity:0});

        function mapaOutroEnd() {
            $('#mapa').addClass('is-hidden');
        }
        if ( $('.interna').is(':visible') ) {
            contentInternaSaida.resume();
            $('body').attr('data-current', page );
        } else {
            anmEnd();
             $('body').attr('data-current', page );
        }

         $('#interna-loader').scrollTop(0);
        
        function anmEnd() {
            loaderView("show");
            $('#interna-loader').load(page+'.html #toload', function(){ 
                loaderView("hide");
               $('#interna-loader').addClass('is-visible');
               enterInterna(0);
            });
        }
    });
  
    $('#site-intro .bg').each(function(index, el) {
        var introW = $('#site-intro').innerWidth();
        var introH = $('#site-intro').innerHeight();
        var amountPerLine = 2;
        var fragW = $(this).width();
        var fragH = $(this).height();
        var fragTop = $(this).offset().top;
        var fragLeft = $(this).offset().left;
        var bgW = 1922;
        var bgH = 997;
        var bgp = '-'+fragLeft+'px '+'-'+fragTop+'px';
        var bgz = introW + 'px auto'; 
        $(this).css({
            'width': fragW-1,
            'height': fragH,
            'background-size': bgz,
            'background-position': bgp
        });
    });
    function endIntro(){
        $('#site-intro').addClass('is-hidden');
    }
    var homeAnm = new TimelineMax({paused:true, onComplete:endIntro});
    homeAnm.to('#site-intro  .intro-title', .6, {y:-150, opacity:0}) 
    .to('#site-intro  .bg', .6, {ease:Sine.easeIn,scale:.85, opacity:.8, delay:-0.2})
    .to('#site-intro div.bg:nth-of-type(1)', .8, {z:-100,delay:-0.4, opacity:.6}) 
    .to('#scrollDown', .8, {y:150, delay:-0.7}) 
    .to('#site-intro div.bg:nth-of-type(2)', .8, {ease:Sine.easeIn, z:-100, x:100, opacity:.2, delay:-0.7})
    .to('#site-intro div.bg:nth-of-type(3)', .8, {ease:Sine.easeIn, z:-50, x:-100, opacity:.4, delay:-0.7})
    .to('#site-intro div.bg:nth-of-type(4)', .8, {ease:Sine.easeIn, z:-50, opacity:.4, delay:-0.7}) 
    .to('#site-intro div.bg:nth-of-type(5)', .8, {ease:Sine.easeIn, z:-50, opacity:.4, delay:-0.7}) 
    // .to('#site-intro', .7, {ease:Sine.easeIn,perspective:600,delay:-0.2})
    .to('#site-intro', .7, {opacity:0,delay:-0.2});


    var homeAnm2 = new TimelineMax({paused:true, onComplete:endIntro});
    homeAnm2.to('#site-intro  .intro-title', .6, {y:-150, opacity:0})  
    .to('#site-intro div.bg:nth-of-type(even)', .5, {ease:Sine.easeIn,y:-150})
    .to('#site-intro div.bg:nth-of-type(odd)', .5, {ease:Sine.easeIn,y:150, delay:-0.5})
    .to('#site-intro div.bg:nth-of-type(odd)', .5, {ease:Sine.easeIn, x:150}) 
    .to('#site-intro div.bg:nth-of-type(even)', .5, {ease:Sine.easeIn, x:-150,delay:-0.3}) 
    .to('#site-intro div.bg:nth-of-type(3)', .5, {ease:Sine.easeIn, y:-50,delay:-0.3}) 
    .to('#site-intro div.bg:nth-of-type(4)', .5, {ease:Sine.easeIn, y:50,delay:-0.5}) 
    .to('#site-intro', 1.1, {opacity:0});

    $('#scrollDown').click(function(event) {
       homeAnm.resume();
    });


    /*MAPAS PIN*/
    $(document).on('click', '.mapa-pin, .mapa-item', function(event){
        $('html,body').scrollTop(0);
        var page = $(this).attr('data-page');
        var offLeft = $("#mapa").offset().left;
        var offTop = $("#mapa").offset().top;
        var originX = offLeft - event.clientX;
        var originY = offTop - event.clientY;
        $('#mapa').css('transform-origin', originX+'px -'+originY+'px'); 
        mapaOutro = new TimelineMax({paused:true, onComplete:mapaOutroEnd});
        mapaOutro.to('#mapa', .6, {scale:1.2, opacity:0}); 

        function mapaOutroEnd() {
            $('#mapa').addClass('is-hidden');
        } 

        $('body').attr('data-current', page );


        $('.main--navegacao a.is-current').removeClass('is-current');
        $('.main--navegacao a[data-page="'+page+'"]').addClass('is-current');

        var internaIdx = $(this).attr('data-interna');
        $('#interna-loader').load(page+'.html #toload', function(){
           mapaOutro.resume(); 
           var idx = $(this).attr('data-content');
           setTimeout(function(){
               $('#interna-loader').addClass('is-visible');
               enterInterna(internaIdx);
           },300);
        });
    }); 

    /*MAIN NAV*/
    $('#nav-map').on('click', function(){
        $('#mapa').removeClass('is-hidden');
        $('.main--navegacao a.is-current').removeClass('is-current');
        mapaIntro = new TimelineMax({paused:true});
        $('#interna-loader').removeClass('is-visible'); 
        mapaIntro.to('#mapa', .5, {scale:1, opacity:1});
        setTimeout(function(){
            mapaIntro.resume();
        },500);
    }); 

    /*INTERNA NAV*/
    $(document).on('click', '.content-menu li', function(){
        var link = $(this).attr('href'); 
        $('.interna-content-overlay #overlay-loader').load('content/'+link, function(){
           $('.interna-content-overlay').addClass('is-visible'); 
           $('body').addClass('no-nav'); 
           if ( $('.site-slider').length > 0 ) {
                $('.site-slider').slick({
                    dots:true,
                    prevArrow:'<div class="btn btn-prev"> <svg viewBox="0 0 29 51"><use xlink:href="images/dist/sprite.svg#icon-arrowLeft" /></svg> </div>',
                    nextArrow:'<div class="btn btn-next"> <svg viewBox="0 0 28.97 51"><use xlink:href="images/dist/sprite.svg#icon-arrowRight" /></svg> </div>'
                });
           }
        });
    });
    $(document).on('click', '.interna-content-overlay .btn-close', function(){ 
           $('.interna-content-overlay').removeClass('is-visible'); 
           $('#overlay-loader').html(' '); 
           $('body').removeClass('no-nav'); 
    });



    var mapLonLeft =  -74.070790; 
    var mapLonRight = -34.810599; 
    var mapLonDelta = mapLonRight - mapLonLeft;
    var mapLatBottom = -33.726991;
    var mapLatBottomDegree = mapLatBottom * Math.PI / 180;

    function convertGeoToPixel(mapWidth, mapHeight, lat, lon)
    {
        var position = new Array(2);
        var x = (lon - mapLonLeft) * (mapWidth / mapLonDelta);

        var lat = lat * Math.PI / 180;
        var worldMapWidth = ((mapWidth / mapLonDelta) * 360) / (2 * Math.PI);
        var mapOffsetY = (worldMapWidth / 2 * Math.log((1 + Math.sin(mapLatBottomDegree)) / (1 - Math.sin(mapLatBottomDegree))));

        var y = mapHeight - ((worldMapWidth / 2 * Math.log((1 + Math.sin(lat)) / (1 - Math.sin(lat)))) - mapOffsetY);

        position[0] = x;
        position[1] = y;

        return position;
    }

    
    var categorias = ['aeroporto', 'rodovias', 'ferrovias', 'portos'];
    var icons = ['aviao', 'caminhao', 'trem', 'navio']; 
    function positionMap() {
        var pins = [
            {
                name: "AEROPORTO INTERNACIONAL DE FORTALEZA (CE) ",
                lat: -3.7318616,
                long: -38.5266704,
                categoria: 0,
                page: ["aeroportos", 0]
            },
            {
                name: "AEROPORTO INTERNACIONAL DE SALVADOR (BA)",
                lat: -12.9730401,
                long: -38.50230399999998,
                categoria: 0,
                page: ["aeroportos", 1]
            },
            {
                name: "AEROPORTO INTERNACIONAL DE FLORIANÓPOLIS (SC)",
                lat: -27.5953778,
                long: -48.548049900000024,
                categoria: 0,
                 page: ["aeroportos", 2]
            },
            {
                name: "AEROPORTO INTERNACIONAL DE PORTO ALEGRE (RS)",
                lat: -31.362651, 
                long: -52.330967, 
                categoria: 0,
                page: ["aeroportos", 3]
            },
            {
                name: "TERMINAL DE COMBUSTÍVEL DE SANTARÉM - 04",
                lat:-2.127275, 
                long:-52.359835,
                categoria: 3,
                page: ["portos", 0]
            },
            {
                name: "TERMINAL DE COMBUSTÍVEL DE SANTARÉM - 05",
                lat:-4.646570, 
                long:-50.248199,
                categoria: 3,
                page: ["portos", 1]
            },
            {
                name: "TERMINAL DE TRIGO DO RIO DE JANEIRO",
                lat:-22.8932382,
                long: -43.190823799999976,
                categoria: 3,
                page: ["portos", 2]
            },
            {
                name: "BR-364/365/GO/MG – Jataí (GO) – Uberlândia (MG)",
                lat:-20.977411,  
                long: -48.438023,
                categoria: 1,
                page: ["rodovias", 0]
            },
            {
                name: "BR-101/290/386/448/SC/RS",
                lat:-29.871248, 
                long: -50.325081,
                categoria: 1,
                page: ["rodovias", 1]
            },
            {
                name: "Ferrogrão  (LUCAS DO RIO VERDE/MT - SINOP/MT - ITAITUBA/PA)",
                lat:-10.723658, 
                long: -57.948211,
                categoria: 2,
                page: ["ferrovias", 0]
            },
            {
                name: "Ferrovia Norte Sul (Porto Nacional/TO – Estrela d’Oeste/SP)",
                lat:-10.264218, 
                long: -48.544606,
                categoria: 2,
                page: ["ferrovias", 1]
            },
            {
                name: "Ferrovia de Integração Oeste-Leste (Ilhéus/BA - Caetité/BA)",
                lat:-13.564758,  
                long: -43.616846,
                categoria: 2,
                page: ["ferrovias", 2]
            }
        ];

        var totalPins = pins.length; 

        var mapaW = $('#mapa-bg').width();
        var mapaH = $('#mapa-bg').height(); 
        var mapaOffsetY = $('#mapa-bg').offset().top; 
        console.log(mapaW);
        console.log(mapaH);
        console.log(mapaOffsetY);
        for (var i = 0; i < totalPins; i++) {
            var name = pins[i].name;
            var lat = pins[i].lat;
            var long = pins[i].long;
            var cat = pins[i].categoria;
            var page = pins[i].page;
             var coord;
           
            coord = convertGeoToPixel(mapaW, mapaH, lat, long);  
            var popUp_position;
            if ( coord[1] < window.innerHeight/2 ) {
                popUp_position = "popup-bottom"
            } else {
                popUp_position = "popup-top"
            }
            if ( window.innerWidth > 767) {
                $('#mapa').append('<div class="mapa-pin pin-'+categorias[cat]+' '+popUp_position+' " style="left:'+Math.ceil(coord[0]-18)+'px; top:'+Math.ceil((coord[1]-10)+mapaOffsetY)+'px;" data-page="'+page[0]+'" data-interna="'+page[1]+'"> <svg viewBox="0 0 78.2 97.2" class="fundo"><use xlink:href="images/dist/sprite.svg#icon-pinFill" /></svg> <span class="icon"><svg ><use xlink:href="images/dist/sprite.svg#icon-'+icons[cat]+'" /></svg></span> <div class="pin-title"> <div class="pin-title-icon"><svg><use xlink:href="images/dist/sprite.svg#icon-'+icons[cat]+'" /></svg></div> <span>'+name+' </span></div> </div>');    
            }
            else {
                 $('#mapa').append('<div class="mapa-item pin-'+categorias[cat]+' '+popUp_position+' " data-page="'+page[0]+'" data-interna="'+page[1]+'"> <div class="pin-item-title"> <span class="icon"><svg ><use xlink:href="images/dist/sprite.svg#icon-'+icons[cat]+'" /></svg></span> <span>'+name+' </span> </div> </div>');
            }
            
        }
    }

    

    $('.mapa-overlay .btn').click(function(event) {
        $('.mapa-overlay').addClass('is-hidden');
        $('body').removeClass('no-nav');
         positionMap(); 
    });

    if (window.innerWidth > 767) {
       $(window).resize(function(){
            $('#mapa .mapa-pin').remove();
            $('#mapa .mapa-pin-item').remove();
            positionMap(); 
        });      
    }

    


    loader.addCompletionListener(function() {
        setTimeout(function(){
            $('#loader').removeClass('is-visible');
            $('#loader').removeClass('is-home');
           
        },1000);
    });
    
   
});