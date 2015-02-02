/*

Responsive Mobile Menu v1.0
Plugin URI: responsivemultimenu.com

Author: Adam Wysocki
Author URI: http://oncebuilder.com

License: http://opensource.org/licenses/MIT

*/

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function adaptMenu() {
	/* 	toggle menu on resize */
	$('.rmm').each(function() {
		// initialize vars
		var maxWidth = 0;
		var width = 0;

		// width of menu list (non-toggled)
		$('.dl-menu').children("li").each(function() {
			//console.log($(this).get(0).tagName)
			//console.log($(this).parent().get(0).tagName);
			if($(this).parent().hasClass('dl-menu')){
				width = $(this).outerWidth();//outerWidth();
				if(width>0){
					maxWidth += width;
				}
				//console.log(width)
				//console.log(maxWidth)
			}
			//console.log($(this).get(0).clientWidth);//offsetWidth
		});

		// compare width
		var width = $('.rmm').css('max-width');
		width = width.replace('px', ''); 

		//console.log($(this).parent().width()+" / "+width)
		
		if ( $(this).parent().width() > width ) {
			$('.dl-menu').removeClass("rmm-mobile");
			
			//remove all classes from mobile verion
			$(".dl-menu ul").removeClass("dl-subview");
			$(".dl-menu li").removeClass("dl-subover-hidden");
			$(".dl-menu li").removeClass("dl-subover-visible");
			$(".dl-menu a").removeClass("dl-subover-header");

			$(".rmm-toggled").removeClass("rmm-closed");
			$('.rmm-toggled').hide();
			
			//$('.rmm-toggled').removeClass("rmm-view");
			//$('.rmm-toggled').addClass("rmm-closed");
		}else {
			$('.dl-menu').addClass("rmm-mobile");
			$('.rmm-toggled').show();
			$('.rmm-toggled').addClass("rmm-closed");
			
			//$('.rmm-toggled').removeClass("rmm-closed");
		}
	});
}

function resposniveMultiMenu() {	
	$('.rmm').each(function() {
		// create mobile menu classes here to light up HTML
		$(this).find("ul").addClass("dl-submenu");
		$(this).find("ul:first").addClass("dl-menu");
		$(this).find("ul:first").removeClass("dl-submenu");

		$(this).find('.dl-submenu').prepend( '<li class="dl-back"><a href="#">back</a></li>' );

		
		if(detectIE()){
			$(".dl-menu").children("li").find("a:first").addClass("fixie");
			$(this).find("ul").prev().addClass("rmm-dropdown");
		}else{
			$(this).find("ul").prev().addClass("rmm-dropdown");
		}
	
		// initialize vars
		var maxWidth = 0;
		var width = 0;

		// sometimes jquyery doesnt get clientWidth with propertly after refresh f5 ???
		
		// width of menu list (non-toggled)
		$('.dl-menu').children("li").each(function() {
			//console.log($(this).get(0).tagName)
			//console.log($(this).parent().get(0).tagName);
			if($(this).parent().hasClass('dl-menu')){
				width = $(this).outerWidth();//outerWidth();
				if(width>0){
					maxWidth += width;
				}
				console.log(width)
			}
			//console.log($(this).get(0).clientWidth);//offsetWidth
		});
		//console.log(maxWidth)

		if ($.support.leadingWhitespace) {
			$(this).css('max-width' , maxWidth*1.05+'px');
		}else{
			$(this).css('width' , maxWidth*1.05+'px');
		}
		
		// create dropdown button
		var str=''
		str+='<div class="rmm-toggled rmm-view rmm-closed">'
			str+='<div class="rmm-toggled-controls">'
				str+='<div class="rmm-toggled-title">Menu</div>';
				str+='<div class="rmm-toggled-button"><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div>';
			str+='</div>';
		str+='</div>';
		
		$(this).prepend(str);
	});
	
	// click interacts in mobile wersion
	$('.rmm-dropdown').click(function (e) {
		if($('.dl-menu').hasClass('rmm-mobile')){
			//e.preventDefault();
			//e.stopProgragation();
			$(this).next().addClass("dl-subview");

			var index=$(this).parent().index();
			
			var i=0;
			$(this).parent().parent().children("li").each(function() {
				if(index==$(this).index()){
					$(this).removeClass("dl-subover-hidden");
					$(this).addClass("dl-subover-visible");
				}else{
					$(this).removeClass("dl-subover-visible");
					$(this).addClass("dl-subover-hidden");
				}
			});
			
			$(this).addClass("dl-subover-header");
		}
	});
	
	// click back interacts in mobile version
	$('.dl-back a').click(function () {
		$(this).parent().parent().prev().removeClass("dl-subover-header");
		$(this).parent().parent().removeClass("dl-subview");
		$(this).parent().parent().parent().parent().find("li").removeClass("dl-subover-hidden");
	});
	
	// click toggler interacts in mobile version
	$('.rmm-toggled, .rmm-toggled .rmm-button').click(function(){
		if ( $(this).is(".rmm-closed")) {
			$(this).find('ul').stop().show(300);
			$(this).removeClass("rmm-closed");
		}else {
			$(this).find('ul').stop().hide(300);
			$(this).addClass("rmm-closed");
		}
	});	
}

jQuery(window).load(function() {
    resposniveMultiMenu();
	adaptMenu();
});

$(window).resize(function() {
 	adaptMenu();
});