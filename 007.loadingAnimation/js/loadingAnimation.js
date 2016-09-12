$(function(){
    $('.loading').fullpage({
    	verticalCentered: true,
    	navigation: true
    });
    
    var $loading1_up = $('.loading1 .up');
    $loading1_up[0].addEventListener('animationend',function(){
    	if($loading1_up.hasClass('up_animate1')){
    		$loading1_up.removeClass('up_animate1').addClass('up_animate2')
    	} else {
    		$loading1_up.removeClass('up_animate2').addClass('up_animate1')
    	}
    })
    var $loading1_down = $('.loading1 .down');
    $loading1_down[0].addEventListener('animationend',function(){
    	if($loading1_down.hasClass('down_animate1')){
    		$loading1_down.removeClass('down_animate1').addClass('down_animate2')
    	} else {
    		$loading1_down.removeClass('down_animate2').addClass('down_animate1')
    	}
    })
});
