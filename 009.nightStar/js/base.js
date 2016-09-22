// 存放一些基本的过程函数

// 初始化gridMoved为false
function gridMovedDefault(){
	for(i=0; i<4; i++){
		gridMoved[i] = new Array();
		for(j=0; j<4; j++){
			gridMoved[i][j] = false;
		}
	}
}

// 获取二位数组 i，j 的相应位置
function getPositionX(i,j){
	return 0.2 + 1.6*j;
}
function getPositionY(i,j){
	return 0.2 + 1.6*i;
}

// 生成一个0到x随机数
function random(x){
	return Math.floor(Math.random()*x);
}

// 随机生成新块的值 70%-2，30%-4
function getNewValue(){
	return Math.random()<0.7 ? 2 : 4;
}

// 获取相应数字对应的背景色块
function getBGColor(num){
	switch(num){
		case 0: return 'transparent'; break;
		case 2: return '#fef4f2'; break;
		case 4: return '#fed92a'; break;
		case 8: return '#fc8c5e'; break;
		case 16: return '#fb682b'; break;
		case 32: return '#fe5538'; break;
		case 64: return '#fe3938'; break;
		case 128: return '#00c1e8'; break;
		case 256: return '#01abce'; break;
		case 512: return '#01abce'; break;
		case 1024: return '#01abce'; break;
		case 2048: return '#01abce'; break;
		default: return '#000'; break;
	}
}

// 获取相应数字对应的文字颜色
function getColor(num){
	if(num<=4){
		return '#666769';
	}else {
		return '#fff';
	}
}

// 判断是否有空的位置
function hasEmptyBlock(){
	for(i=0; i<4; i++){
		for(j=0; j<4; j++){
			if(grid[i][j] == 0){
				return true;
			}
		}
	}
	return false;
}

// 判断水平row中两个块small、lagre之间有没有阻碍移动的块
function noXBlockBetween(row,small,large){
	small++;
	while(small<large){
		if(grid[row][small] !== 0){
			return false;
		}
		small++;
	}
	return true;
}
// 判断垂直col中两个块small、lagre之间有没有阻碍移动的块
function noYBlockBetween(col,small,large){
	small++;
	while(small<large){
		if(grid[small][col] !== 0){
			return false;
		}
		small++;
	}
	return true;
}

// 色块新出现时的动画效果
function newBlockShow(i,j){
	$('.container .frontBlockGroup .frontBlock-' + i + '-' + j).text(grid[i][j])
	.css({
		'backgroundColor': getBGColor(grid[i][j]),
		'color': getColor(grid[i][j])
	})
	.animate({
		'width': '1.4rem',
		'height': '1.4rem'
	},150)
}

// 滑动时的色块移动动画
function moveXAnimation(i,j,i,k){
	$('.container .frontBlockGroup .frontBlock-' + i + '-' + j)
	.animate({
		'top': getPositionY(i,k) + 0.7 + 'rem',
		'left': getPositionX(i,k) + 0.7 + 'rem'
	}, 150, 'linear')
}

function moveYAnimation(i,j,k,j){
	$('.container .frontBlockGroup .frontBlock-' + i + '-' + j)
	.animate({
		'top': getPositionY(k,j) + 0.7 + 'rem',
		'left': getPositionX(k,j) + 0.7 + 'rem'
	}, 150, 'linear')
}