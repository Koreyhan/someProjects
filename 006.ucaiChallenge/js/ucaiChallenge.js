$(function(){
	// fullpage 全屏滚动效果
	$('#container').fullpage({
		navigation: false,
		verticalCentered: false,
		scrollingSpeed: 1000,
		onLeave: function(index,nextIndex,direction){
			if(index == 1 && nextIndex == 2){
				$('.page2 li').css('visibility','hidden').removeClass("animated slideInUp");
			};
			if(index == 2 && nextIndex == 3){
				$('.page3 .prize_object1').css('visibility','hidden').removeClass("animated bounceInLeft bounceInRight");
				$('.page3 .prize_object2').css('visibility','hidden').removeClass("animated bounceInLeft bounceInRight");
			};
			if(index == 3 && nextIndex == 4){
				$('.page4 .prize_object1').css('visibility','hidden').removeClass("animated bounceInLeft bounceInRight");
				$('.page4 .prize_object2').css('visibility','hidden').removeClass("animated bounceInLeft bounceInRight");
			};
			if(index == 4 && nextIndex == 5){
				$('.page5 .prize_content').css('visibility','hidden').removeClass("animated fadeInUp");
				$('.page5 .notes').css('visibility','hidden').removeClass("animated fadeInUp");
			};
			if(index == 5 && nextIndex == 6){
				$('.page6 .company_group').css('visibility','hidden').removeClass("animated pulse");
				$('.page6 .notes').css('visibility','hidden').removeClass("animated pulse");	
			};
			if(index == 6 && nextIndex == 7){
				$('.page7 .win_list').css('visibility','hidden').removeClass("animated bounceInLeft bounceInRight");
			};
			if(index == 7 && nextIndex == 8){
				$('.page8 .page8_title').css('visibility','hidden').removeClass("animated zoomInDown");
				$('.page8 .page8_btn').css('visibility','hidden').removeClass("animated tada");
			};


		},
		afterLoad: function(anchorLink, index){
			if(index == 1){
				$('.page1').find('.page1_title').css('visibility','visible').addClass("animated zoomInDown");
			}
			if(index == 2){
				$('.page2 li:eq(0)').css('visibility','visible').addClass("animated slideInUp");
				setTimeout(function(){
					$('.page2 li:eq(1)').css('visibility','visible').addClass("animated slideInUp");
				},600);
				setTimeout(function(){
					$('.page2 li:eq(2)').css('visibility','visible').addClass("animated slideInUp");
				},1200);
				setTimeout(function(){
					$('.page2 li:eq(3)').css('visibility','visible').addClass("animated slideInUp");
				},1800);
				setTimeout(function(){
					$('.page2 li:eq(4)').css('visibility','visible').addClass("animated slideInUp");
				},2400);

			}
			if(index == 3){
				$('.page3 .prize11').css('visibility','visible').addClass("animated bounceInLeft");
				$('.page3 .prize12').css('visibility','visible').addClass("animated bounceInRight");
				setTimeout(function(){
					$('.page3 .prize21').css('visibility','visible').addClass("animated bounceInLeft");
					$('.page3 .prize22').css('visibility','visible').addClass("animated bounceInRight");
				},600);
			}
			if(index == 4){
				$('.page4 .prize31').css('visibility','visible').addClass("animated bounceInLeft");
				$('.page4 .prize32').css('visibility','visible').addClass("animated bounceInRight");
				setTimeout(function(){
					$('.page4 .prize41').css('visibility','visible').addClass("animated bounceInLeft");
					$('.page4 .prize42').css('visibility','visible').addClass("animated bounceInRight");
				},600);
			}
			if(index == 5){
				$('.page5 .prize_content:eq(0)').css('visibility','visible').addClass("animated fadeInUp");
				setTimeout(function(){
					$('.page5 .prize_content:eq(1)').css('visibility','visible').addClass("animated fadeInUp");
				},600);
				setTimeout(function(){
					$('.page5 .prize_content:eq(2)').css('visibility','visible').addClass("animated fadeInUp");
				},1200);
				setTimeout(function(){
					$('.page5 .notes').css('visibility','visible').addClass("animated fadeInUp");
				},1800);
			}
			if(index == 6){
				$('.page6 .company_group:eq(0)').css('visibility','visible').addClass("animated pulse");
				setTimeout(function(){
					$('.page6 .company_group:eq(1)').css('visibility','visible').addClass("animated pulse");
				},600);
				setTimeout(function(){
					$('.page6 .company_group:eq(2)').css('visibility','visible').addClass("animated pulse");
				},1200);
				setTimeout(function(){
					$('.page6 .company_group:eq(3)').css('visibility','visible').addClass("animated pulse");
				},1800);
				setTimeout(function(){
					$('.page6 .notes').css('visibility','visible').addClass("animated pulse");
				},2400);
			}
			if(index == 7){
				$('.page7 .win_list:odd').css('visibility','visible').addClass("animated bounceInLeft");
				$('.page7 .win_list:even').css('visibility','visible').addClass("animated bounceInRight");
			}
			if(index == 8){
				$('.page8 .page8_title').css('visibility','visible').addClass("animated zoomInDown");
				setTimeout(function(){
					$('.page8 .page8_btn').css('visibility','visible').addClass("animated tada");
				},1000)
			}
		}
	});

	$(".page1_title").bind("click",function(){
		$(this).delay(1000).hide();
	})

	// 设置根元素font-size
	function changeFontsize(){
		var deviceWidth = $(window).width()>1200 ? 1200 : $(window).width();
		console.log(deviceWidth);
		$("html").css("font-size",deviceWidth/7.5 + "px");
	}
	changeFontsize();
	$(window).resize(changeFontsize);
});

window.onload = function(){
	$('.loading').fadeOut(600);
}