// 定义全局变量
var stars = new Array();	// 存放星星-数组
var count = 300;	// 常量、星星总个数
var ctx;	// 画布
var cxtLeft = 0, cxtRight = 0, cxtTop = 0, cxtBottom = 0;	// 定义画布的边界	 
var	connectRadius = 100;		// 常量、鼠标滑动星星连接区域的大小
var mousePosX = 0, mousePosY = 0;	// 定义鼠标位置
var connectArea = { minX:0, maxX:0, minY:0, maxY:0,};	// 定义鼠标影响区域
var connectMaxDis = 70;	// 常量、连接线的最长值
var intervalId;		// setInterval 的返回值

window.onload = function() {
	init();
	drawAll();
	console.log(stars);
}

window.onresize = function(){
	init();
	drawAll();
	console.log(stars);
}

// 初始化
function init(){
	// 初始化画布
	var canvas = document.getElementById('stars');
	ctx = canvas.getContext('2d');

	// 设置基本画布大小
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	// 重新初始化各变量
	stars = new Array();
	mousePosX = 0, mousePosY = 0;
	connectArea = { minX:0, maxX:0, minY:0, maxY:0,};

	// 初始化边界，各边外延10，制作出场的错觉
	cxtLeft = -10;
	cxtRight = canvas.offsetWidth + 10;
	cxtTop = -10;
	cxtBottom = canvas.offsetHeight + 0;

	// 初始化星星数组
	for(var i=0; i<count; i++){
		stars.push(new NEWSTAR());
	}

	setTimeout(function(){
		drawLine(connectStars());
	},1000)
}

// 制作单个星星对象的构造函数
function NEWSTAR(){
	this.x = Math.random() * cxtRight;   	 // 星星水平的位置
	this.y = Math.random() * cxtBottom;      // 星星垂直的位置
	this.vx = (Math.random() * 0.3 + 0.3) * (Math.random()>0.5 ? 1 : -1);		 // 星星水平的速度
	this.vy = (Math.random() * 0.3 + 0.3) * (Math.random()>0.5 ? 1 : -1);		 // 星星垂直的速度
	this.radius = Math.random() * 1.5;		 // 星星的半径:0-2
}
NEWSTAR.prototype.move = function() {        // 星星移动的方法
	this.x += this.vx;
	this.y += this.vy;
	if(this.x<cxtLeft || this.x>cxtRight){
		this.vx *= -1;
	}
	if(this.y<cxtTop || this.y>cxtBottom){
		this.vy *= -1;
	}
};

// 绘制单个星星
function drawStar(){
	ctx.fillStyle="#fff";
	ctx.shadowBlur=10;
	ctx.shadowColor="hsla(0,100%,100%,0.3)";
	for(var i=0, num=stars.length; i<num; i++){
		ctx.beginPath()
		ctx.arc(stars[i].x, stars[i].y, stars[i].radius, 0 ,2*Math.PI);
		ctx.fill();
	}
}

// 跟踪鼠标位置及影响区域
document.body.addEventListener('mousemove', function(e) {
	mousePosX = e.clientX || e.touches && e.touches[0].pageX - ctx.left;
	mousePosY = e.clientY || e.touches && e.touches[0].pageY - ctx.top;
	if(mousePosX>0 && mousePosX<(cxtRight - 10) && mousePosY>0 && mousePosY<(cxtBottom - 10)){
		connectArea.minX = mousePosX - connectRadius;
		connectArea.maxX = mousePosX + connectRadius;
		connectArea.minY = mousePosY - connectRadius;
		connectArea.maxY = mousePosY + connectRadius;
	};
})

document.body.addEventListener('mouseout', function(e) {
	connectArea.minX = 0;
	connectArea.maxX = 0;
	connectArea.minY = 0;
	connectArea.maxY = 0;
})

// 确定需要连线的星星
function connectStars(){
	var connectStar = new Array();
	connectStar.push({"x":mousePosX, "y":mousePosY});
	for(var i=0; i<count; i++){
		if(stars[i].x>connectArea.minX && stars[i].x<connectArea.maxX && stars[i].y>connectArea.minY && stars[i].y<connectArea.maxY){
			connectStar.push(stars[i]);
		}
	}
	return connectStar;
}

// 星星连线
function drawLine(connectStar){
	for(var i=0, num=connectStar.length; i<num-1; i++){
		for(var j=i+1; j<num; j++){
			var distance = Math.sqrt(Math.pow((connectStar[i].x-connectStar[j].x),2)+Math.pow((connectStar[i].y-connectStar[j].y),2));
			if(distance<connectMaxDis){
				// 根据点的距离生成线条不透明度
				var strokeColorAlpha = Math.round(distance/(connectMaxDis/20))*0.015;

				ctx.strokeStyle="rgba(255,255,255, " + strokeColorAlpha + ")";
				ctx.lineWidth=0.5;

				ctx.beginPath();
				ctx.moveTo(connectStar[i].x, connectStar[i].y);
				ctx.lineTo(connectStar[j].x, connectStar[j].y);
				ctx.stroke();
			}
		}
	}
}

// 定时循环绘制星星和线条
function drawAll(){
	clearInterval(intervalId);
	intervalId = setInterval(function(){
		ctx.clearRect(cxtLeft,cxtTop,cxtRight,cxtBottom);
		drawStar(stars,ctx);
		for(var i=0; i<count; i++){
			stars[i].move();
		}
		drawLine(connectStars());
	},50)
}