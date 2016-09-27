$(function(){
	// 设置首屏的容器高度等于可用区域高度
	$('.section1').height($(window).height());
	$(window).resize(function(){
		$('.section1').height($(window).height());
	})

	// 学员作品的鼠标悬停动画动画
	$('.section5 .works').bind('mouseenter',function(){
		$(this).find('.students').slideDown(500);
		return false;
	})
	$('.section5 .works').bind('mouseleave',function(){
		$(this).find('.students').slideUp(500);
		return false;
	})

	//解决IE下无placeholder属性游览器的显示问题
	if( !('placeholder' in document.createElement('input')) ){  
		
		$('input[placeholder],textarea[placeholder]').each(function(){   
			var that = $(this),   
			text= that.attr('placeholder');   
			if(that.val()===""){   
				that.val(text).addClass('placeholder');   
			}   
			that.focus(function(){   
				if(that.val()===text){   
					that.val("").removeClass('placeholder');   
				}   
			})   
			.blur(function(){   
				if(that.val()===""){   
					that.val(text).addClass('placeholder');   
				}   
			})   
			.closest('form').submit(function(){   
				if(that.val() === text){   
					that.val('');   
				}   
			});   
		});   
	}
})

window.onload=function(){
	
	$(window).scroll(function(){
		var windowTop = $(window).scrollTop();

		// 显示隐藏导航
		(function(){
			if(windowTop>$('.section1').height() && !$("nav .wrap").hasClass("fixed")){
				$("nav .wrap").hide();
				$("nav .wrap").addClass("fixed");
				$("nav .wrap").slideDown(500);
			}
			if(windowTop<=0 && $("nav .wrap").hasClass("fixed")){
				$("nav .wrap").removeClass("fixed");
			}
		})();

		// 导航跟随滚动而改变选中导航
		(function(){
			var $sections = $("section")
			var sectionClassName = "";
			$sections.each(function(){
				if(windowTop>$(this).offset().top){
					sectionClassName=$(this).attr("class");
				}
			})
			if(sectionClassName!=""){
				var $sectionAs = $("nav .menu a")
				var $sectionA = $("nav .menu a[data-myid=" + sectionClassName +"]");
				if($sectionA.text()!=""){
					$sectionAs.removeClass("active");
					$sectionA.addClass("active");
				}
			}
		})();

		// 两张大图片的视察滚动效果，需等图片加载完成计算的高度才正确
		(function(){
			var img1Top = $('.section1 .banner img').offset().top;
			var img2Top = $('.section8 img').offset().top;
			if(img1Top-140 <= windowTop && windowTop <= img1Top + 500 ) {
				$('.section1 .banner img').css('marginTop',70-windowTop/2);
			}
			if(img2Top-250 <= windowTop && windowTop <= img2Top + 350 ) {
				$('.section8 img').css('marginTop',30-(windowTop-img2Top+250)/4);
			}
		})();
	});

	$("nav .menu a").bind("click",function(){
		$('body').animate({
			scrollTop: $("#" + $(this).data("myid")).offset().top
		}, 800);
		return false;
	})
}