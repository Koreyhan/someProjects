// 全局数据存储
var grid = new Array();  //4x4数组储存每个方块的当前分值
var score = 0;  //总得分
var gridMoved = new Array();	//记录方格是否移动过一次了，如果移动了，不能重复叠加


$(function(){

	// 设置根元素font-size,rem布局实现移动端响应式
	function changeFontsize(){
		var deviceWidth = $(window).width()>1200 ? 1200 : $(window).width();
		$("html").css("font-size",deviceWidth/7.5 + "px");
	}
	changeFontsize();
	$(window).resize(changeFontsize);

	// 界面初始化
	init();
	newBlock();
	newBlock();

	// 开始游戏按钮
	$('.header .newGame').bind('click',function(){
		init();
		newBlock();
		newBlock();
		return false;
	})

	// 键盘按键事件
	$(window).keyup(function(event){
		switch(event.which){
			case 37: moveLeft(); break;   //键盘左方向键
			case 39: moveRight(); break;   //键盘右方向键
			case 38: moveUp(); break;   //键盘上方向键
			case 40: moveDown(); break;   //键盘下方向键
		}
		
	});

	$("body").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          console.log("You swiped " + direction );  
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});
});


// 视图、参数初始化
function init(){
	// 初始化全局变量
	for(i=0; i<4; i++){
		grid[i] = new Array();
		gridMoved[i] = new Array();
		for(j=0; j<4; j++){
			grid[i][j] = 0;
			gridMoved[i][j] = false;
		}
	}
	score = 0;

	// 初始化背景网格
	var backGrid = $('.backGrid');
	var index = 0;
	for(i=0; i<4; i++){
		for(j=0; j<4; j++){
			backGrid[index].style.top = getPositionY(i,j) + 'rem';
			backGrid[index].style.left = getPositionX(i,j) + 'rem';
			index++;
		}
	}

	// 初始化色块
	updateFrontBlock();
}

// 创建一个新的数字块
function newBlock(){
	if(hasEmptyBlock()){
		var count = 0;	//记录循环查找的次数，如果20次内找不到空位置，则换另一个方法
		while(count<200000){
			var randomI = random(4);
			var randomJ = random(4);
			if(grid[randomI][randomJ] == 0){
				grid[randomI][randomJ] = getNewValue();
				newBlockShow(randomI,randomJ);
				break;
			}
			count++;
		}		
		// console.log('randomconcunt='+count);
	}
}

// 更新grid数据到页面的色块展示
function updateFrontBlock(){
	var $frontBlockGroup = $('.container .frontBlockGroup');
	$frontBlockGroup.empty();
	for(i=0; i<4; i++){
		for(j=0; j<4; j++){
			$frontBlockGroup.append(
				"<div class='frontBlock frontBlock-" + i + "-" + j + "'></div>"
			)
			var $thisBlock = $frontBlockGroup.find(".frontBlock-" + i + "-" + j);
			if(grid[i][j]==0){
				$thisBlock.css({
					'top': getPositionY(i,j) + 0.6 + 'rem',
					'left': getPositionX(i,j) + 0.6 + 'rem',
					'width': 0,
					'height': 0
				});
			}else{
				$thisBlock.css({
					'width': 100,
					'height': 100,
					'top': getPositionY(i,j) + 0.6 + 'rem',
					'left': getPositionX(i,j) + 0.6 + 'rem',
					'backgroundColor': getBGColor(grid[i][j]),
					'color': getColor(grid[i][j])
				});
				$thisBlock.text(grid[i][j]);
			}
		}
	}

	// 改变得分
	$('.header .score .scoreNum').text(score);
}


// 判断能否向左移动
function canMoveLeft(){
	for(i=0; i<4; i++){
		for(j=1; j<4; j++){
			if(grid[i][j]!==0){
				if(grid[i][j-1]==0 || grid[i][j-1]==grid[i][j]){
					return true;
				}
			}
		}
	}
	return false
};

// 向左移动事件处理
function moveLeft(){
	isGameOver();
	gridMovedDefault();
	if(canMoveLeft()){
		for(i=0; i<4; i++){
			for(j=1; j<4; j++){
				if(grid[i][j]!==0){
					for(k=0; k<j; k++){
						if(grid[i][k]==0 && noXBlockBetween(i,k,j)){
							grid[i][k]=grid[i][j];
							grid[i][j]=0;
							moveXAnimation(i,j,i,k);
							break;
						}else if( grid[i][k]==grid[i][j] && !gridMoved[i][k] && noXBlockBetween(i,k,j) ){
							grid[i][k]*=2;
							grid[i][j]=0;
							gridMoved[i][k] = true;
							moveXAnimation(i,j,i,k);
							score+=grid[i][k];
							break;
						}
					}
				}
			}
		}
		newBlock();
		setTimeout(updateFrontBlock,150);
	}
};

// 判断能否向右移动
function canMoveRight(){
	for(i=0; i<4; i++){
		for(j=2; j>=0; j--){
			if(grid[i][j]!==0){
				if(grid[i][j+1]==0 || grid[i][j+1]==grid[i][j]){
					return true;
				}
			}
		}
	}
	return false
};

// 向右移动事件处理
function moveRight(){
	isGameOver();
	gridMovedDefault();
	if(canMoveRight()){
		for(i=0; i<4; i++){
			for(j=2; j>=0; j--){
				if(grid[i][j]!==0){
					for(k=3; k>j; k--){
						if(grid[i][k]==0 && noXBlockBetween(i,j,k)){
							grid[i][k]=grid[i][j];
							grid[i][j]=0;
							moveXAnimation(i,j,i,k);
							break;
						}else if(grid[i][k]==grid[i][j] && !gridMoved[i][k] && noXBlockBetween(i,j,k)){
							grid[i][k]*=2;
							grid[i][j]=0;
							gridMoved[i][k] = true;
							moveXAnimation(i,j,i,k);
							score+=grid[i][k];
							break;
						}
					}
				}
			}
		}
		newBlock();
		setTimeout(updateFrontBlock,150);
	}
};

// 判断能否向上移动
function canMoveUp(){
	for(j=0; j<4; j++){
		for(i=1; i<4; i++){
			if(grid[i][j]!==0){
				if(grid[i-1][j]==0 || grid[i-1][j]==grid[i][j]){
					return true;
				}
			}
		}
	}
	return false
};

// 向上移动事件处理
function moveUp(){
	isGameOver();
	gridMovedDefault();
	if(canMoveUp()){
		for(j=0; j<4; j++){
			for(i=1; i<4; i++){
				if(grid[i][j]!==0){
					for(k=0; k<i; k++){
						if(grid[k][j]==0 && noYBlockBetween(j,k,i)){
							grid[k][j]=grid[i][j];
							grid[i][j]=0;
							moveYAnimation(i,j,k,j);
							break;
						}else if( grid[k][j]==grid[i][j] && !gridMoved[k][j] && noYBlockBetween(j,k,i)){
							grid[k][j]*=2;
							grid[i][j]=0;
							gridMoved[k][j] = true;
							moveYAnimation(i,j,k,j);
							score+=grid[k][j];
							break;
						}
					}
				}
			}
		}
		newBlock();
		setTimeout(updateFrontBlock,150);
	}
};

// 判断能否向下移动
function canMoveDown(){
	for(j=0; j<4; j++){
		for(i=2; i>=0; i--){
			if(grid[i][j]!==0){
				if(grid[i+1][j]==0 || grid[i+1][j]==grid[i][j]){
					return true;
				}
			}
		}
	}
	return false
};

// 向下移动事件处理
function moveDown(){
	isGameOver();
	gridMovedDefault();
	if(canMoveDown()){
		for(j=0; j<4; j++){
			for(i=2; i>=0; i--){
				if(grid[i][j]!==0){
					for(k=3; k>i; k--){
						if(grid[k][j]==0 && noYBlockBetween(j,i,k)){
							grid[k][j]=grid[i][j];
							grid[i][j]=0;
							moveYAnimation(i,j,k,j);
							break;
						}else if( grid[k][j]==grid[i][j] && !gridMoved[k][j] && noYBlockBetween(j,i,k)){
							grid[k][j]*=2;
							grid[i][j]=0;
							gridMoved[k][j] = true;
							moveYAnimation(i,j,k,j);
							score+=grid[k][j];
							break;
						}
					}
				}
			}
		}
		newBlock();
		setTimeout(updateFrontBlock,150);
	}
};


// 判断是否游戏结束
function isGameOver(){
	if(!canMoveLeft() && !canMoveRight() && !canMoveUp() && !canMoveDown()){
		alert('游戏结束');
	}
}