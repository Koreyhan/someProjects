// 定义全局变量
var stars = new Array();	// 存放星星-数组
var count = 300;	// 常量、星星总个数
var ctx;	// 画布
var cxtLeft = 0, cxtRight = 0, cxtTop = 0, cxtBottom = 0;	// 定义画布的边界	 
var	connectRadius = 100;		// 常量、鼠标滑动星星连接区域的大小
var mousePosX = 0, mousePosY = 0;	// 定义鼠标位置
var connectArea = { minX:0, maxX:0, minY:0, maxY:0,};	// 定义鼠标影响区域
var connectMaxDis = 70;	// 常量、连接线的最长值
var meteor = new Array();  	// 存放流星-数组
var meteorTimeInt = 0;
var timeout; 	// setTimeout 的控制器
var intervalId;		// setInterval 的控制器

window.onload = function() {
	init();
	drawAll();
}

window.onresize = function(){
	init();
	drawAll();
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

// 鼠标移除时清楚影响
document.body.addEventListener('mouseout', function(e) {
	connectArea.minX = 0;
	connectArea.maxX = 0;
	connectArea.minY = 0;
	connectArea.maxY = 0;
})


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

	// 初始化流星数组
	meteor = new Array();
	meteorTimeInt = 0;
	clearTimeout(timeout);
	addMeteors();
}

// 制作单个星星对象的构造函数
function NEWSTAR(){
	this.x = Math.random() * cxtRight;   	 // 星星水平的位置
	this.y = Math.random() * cxtBottom;      // 星星垂直的位置
	this.vx = (Math.random() * 0.3 + 0.3) * (Math.random()>0.5 ? 1 : -1);		 // 星星水平的速度
	this.vy = (Math.random() * 0.3 + 0.3) * (Math.random()>0.5 ? 1 : -1);		 // 星星垂直的速度
	this.radius = Math.random() * 1.5;		 // 星星的半径:0-1.5
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

// 制作单个流星对象的构造函数
function NEWMETEOR(){
	this.x = Math.random() * cxtRight + cxtRight/3;   	 // 流星水平的位置,整体向右偏移1/3画布
	this.y = Math.random() * cxtBottom - cxtBottom/2;      // 流星垂直的位置,整体向上偏移1/2画布
	this.length = Math.random() * 100 + 100;		// 流星的长度
	this.vx = 0 - (Math.random()*3 + 7);		 // 流星水平的速度,7-10
	this.vy = -this.vx;		 // 流星垂直的速度,7-10
	this.radius = Math.random() * 1;		 // 流星的半径:0-1
	this.time = Math.random() * 1 + Math.ceil((cxtBottom-this.y)/this.vy);		// 流星经过的总时间(次数)
}
NEWMETEOR.prototype.move = function(){
	this.x += this.vx;
	this.y += this.vy;
	this.time -= 1;
}

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

// 制作流星加入数组
function addMeteors(){
	timeout = setTimeout(function(){
		// console.log(meteor.length);
		meteor.push(new NEWMETEOR);
		meteorTimeInt = Math.random()*3000;
		addMeteors();
	},meteorTimeInt)
}

// 绘制一个流星
function drawOneMeteor(index){
	var gra = ctx.createRadialGradient(meteor[index].x, meteor[index].y, 0, meteor[index].x, meteor[index].y, meteor[index].length);
    gra.addColorStop(0, 'rgba(255,255,255,1)');
    gra.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.save();
    ctx.fillStyle = gra;
    ctx.beginPath();
    //流星头，二分之一圆
    ctx.arc(meteor[index].x, meteor[index].y, meteor[index].radius, Math.PI / 4, 5 * Math.PI / 4);
    //绘制流星尾，三角形
    ctx.lineTo(meteor[index].x + meteor[index].length, meteor[index].y - meteor[index].length);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// 绘制数组中的流星
function drawMeteors(){	
	var abolishMeteors = new Array();
	for(var i=0,num=meteor.length; i<num; i++){
		if(meteor[i].time>0){
			if((meteor[i].y - meteor[i].length)<cxtBottom){
				drawOneMeteor(i);
			}
			meteor[i].move();
		}else{
			abolishMeteors.push(i);
		}
	}
	for(var j=abolishMeteors.length-1; j>=0; j--){
		meteor.remove(j);
	}
}

// 定时循环绘制星星、流星、线条
function drawAll(){
	meteor[0] = new NEWMETEOR;
	// console.log(meteor);
	clearInterval(intervalId);
	intervalId = setInterval(function(){
		ctx.clearRect(cxtLeft,cxtTop,cxtRight+10,cxtBottom+10);
		drawStar(stars,ctx);
		for(var i=0; i<count; i++){
			stars[i].move();
		}
		drawLine(connectStars());

		drawMeteors();
	},50)
}

// 删除数组元素中序号为dx的值
Array.prototype.remove=function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i] 
        } 
    } 
    this.length-=1 
} 