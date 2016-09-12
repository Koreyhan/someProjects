$(function(){
	// 打字效果函数，可以链式执行
	function typeWords(selector,startWords,endWords,waitTime,fn){
		$(selector).html(startWords);	//初始化开始字符
		var i = startWords.length;
		// 判断增加或是减少字符
		if(startWords.length<=endWords.length){
			var calc = 1;	//1为增添字符，-1为减少字符
			typing = endWords;
		}else{
			var calc = -1;
			typing = startWords;
		}
		var time = setInterval(function(){
			if(i != endWords.length){
				$(selector).html(typing.slice(0,i+calc));
				i+=calc;
			}else{
				clearInterval(time);
				setTimeout(function(){
					if(fn){
						fn();
					}
				},waitTime)
			}
		},150)
	}

	typeWords('.typingEffect .typingText','','大家好，我是韩懿軒',1000,function(){
		typeWords('.typingEffect .typingText','大家好，我是韩懿軒','大家好，',0,function(){
			typeWords('.typingEffect .typingText','大家好，','大家好，我是一名前端工程师',1000,function(){
				typeWords('.typingEffect .typingText','大家好，我是一名前端工程师','',0,function(){
					typeWords('.typingEffect .typingText','','欢迎来到我的博客！')
				})
			})
		})
	});
})