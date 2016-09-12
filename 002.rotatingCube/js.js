$(function(){
	// 排列图层上下顺序
	$('.rotatingCube .cube div').each(function(index){
		$(this).css('z-index',($('.rotatingCube .cube div').length-index));
	})
	// 动画函数
	var ratatingX=0,ratatingY=0,ratatingZ=0;
	function move(){
		ratatingX = Math.floor(Math.random()*720);
		ratatingY = Math.floor(Math.random()*720);
		ratatingZ = Math.floor(Math.random()*720);
		$('.rotatingCube .cube').css('transform',"rotateX(" + ratatingX + "deg) rotateY(" + ratatingY + "deg) rotateZ(" + ratatingZ + "deg)");	
	}
	move();
	setInterval(move,4000);
})