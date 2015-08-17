/*

Responsive Mobile Menu v1.1
Plugin URI: responsivemultimenu.com

Author: Adam Wysocki
Author URI: http://oncebuilder.com

License: http://opensource.org/licenses/MIT

*/

function adaptMenu() {
	/* 	toggle menu on resize */
	$('.rmm').each(function() {
		// initialize vars
		var maxWidth = 0;
		var width = 0;

		// width of menu list (non-toggled)
		$('.rmm-menu').children("li").each(function() {
			//TODO: maybe we should use $('.rmm-menu > li') without if?
			if($(this).parent().hasClass('rmm-menu')){
				width = $(this).outerWidth();//outerWidth();
				if(width>0){
					maxWidth += width;
				}
			}
		});

		// compare width
		var width = $('.rmm').css('max-width');
		width = width.replace('px', ''); 
		
		if ( $(this).parent().width() > width ) {
			$('.rmm-menu').removeClass("rmm-mobile");
			
			//remove all classes from mobile verion
			$(".rmm-menu ul").removeClass("rmm-subview");
			$(".rmm-menu li").removeClass("rmm-subover-hidden")
			                 .removeClass("rmm-subover-visible");
			$(".rmm-menu a").removeClass("rmm-subover-header");

			$(".rmm-toggled").removeClass("rmm-closed")
			                 .hide();
			
			//$('.rmm-toggled').removeClass("rmm-view");
			//$('.rmm-toggled').addClass("rmm-closed");
		}else {
			$('.rmm-menu').addClass("rmm-mobile");
			$('.rmm-toggled').show()
			                 .addClass("rmm-closed");
			
			//$('.rmm-toggled').removeClass("rmm-closed");
		}
	});
}

function responsiveMultiMenu() {
	var config = window.responsiveMultiMenuConfig; //Для краткости. Just for storter code

	$('.rmm').each(function() {
		// create mobile menu classes here to light up HTML
		$(this).find("ul").addClass("rmm-submenu");
		$(this).find("ul:first").addClass("rmm-menu")
		                      .removeClass("rmm-submenu");
		$(this).find('.rmm-submenu').prepend(
			'<li class="rmm-back">'+
				'<a href="'+config.ahref+'">'+
					config.backtext+
				'</a>'+
			'</li>'
		);
		$(this).find("ul").prev().addClass("rmm-dropdown");

		if(config.useParentInBack) {
			$(this).find('.rmm-back > a').each(function(){
				$(this).html($(this).html()+$(this).parent().parent().prev().text());
			});
		}

		// initialize vars
		var maxWidth = 0;
		var width = 0;

		// width of menu list (non-toggled)
		$('.rmm-menu').children("li").each(function() {
			if($(this).parent().hasClass('rmm-menu')){
				width = $(this).outerWidth();//outerWidth();
				if(width>0){
					maxWidth += width;
				}
				console.log(width)
			}
		});

		if ($.support.leadingWhitespace) {
			$(this).css('max-width' , (maxWidth+5)+'px');
		}else{
			$(this).css('width' , (maxWidth+5)+'px');
		}
		
		// create dropdown button
		var str='';
		str+='<div class="rmm-toggled rmm-view rmm-closed">'
			str+='<div class="rmm-toggled-controls">'
				str+='<div class="rmm-toggled-title">'+config.title+'</div>';
				str+='<div class="rmm-toggled-button"><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div>';
			str+='</div>';
		str+='</div>';
		
		$(this).prepend(str);
	});
	
	// click interacts in mobile wersion
	$('.rmm-dropdown').click(function (e) {
		if($(this).parents(".rmm-menu").hasClass('rmm-mobile')){
			e.preventDefault();
			e.stopPropagation();
			
			$(this).next().addClass("rmm-subview");

			var index=$(this).parent().index();
			
			$(this).parent().parent().children("li").each(function() {
				if(index==$(this).index()){
					$(this).removeClass("rmm-subover-hidden")
					       .addClass("rmm-subover-visible");
				}else{
					$(this).removeClass("rmm-subover-visible")
					       .addClass("rmm-subover-hidden");
				}
			});
			$(this).addClass("rmm-subover-header");
		}
	});
	
	// click back interacts in mobile version
	$('.rmm-back a').click(function () {
		var grandparent=$(this).parent().parent();
		grandparent.prev().removeClass("rmm-subover-header");
		grandparent.removeClass("rmm-subview");
		grandparent.parent().parent().find("li").removeClass("rmm-subover-hidden");
	});
	
	// click toggler interacts in mobile version
	$('.rmm-toggled, .rmm-toggled .rmm-button').click(function(){
		$(this).toggleClass("rmm-closed");
	});	
}

jQuery(window).load(function() {
    responsiveMultiMenu();
	adaptMenu();
});


$(window).resize(function() {
 	adaptMenu();
});

(function(){
	var defaultConfig={
		ahref: "#", //Пригодится, если нахимичено с base. Useful if base tag is set
		backtext: "back",
		title: "Menu",
		useParentInBack: false, //Append header of parent menu to back button?
	};

	if(!window.responsiveMultiMenuConfig) {
		window.responsiveMultiMenuConfig = {};
	}

	for(var prop in defaultConfig) {
		if(window.responsiveMultiMenuConfig[prop] === undefined){
			window.responsiveMultiMenuConfig[prop] = defaultConfig[prop];
		}
	}
})();
