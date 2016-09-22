window.onload = function() {

	// 获取画布
	var canvas = document.getElementById('stars');
	var ctx = canvas.getContext('2d');

	// 设置基本画布大小
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	// 定义一些常量
	var stars = new Array();	// 存放星星-数组
	var count = 250;	// 星星总个数
	var cxtLeft = -10,    // 定义画布的边界，各边外延10，制作出场的错觉
		cxtRight = canvas.width + 10,
		cxtTop = -10,
		cxtBottom = canvas.height + 10;


	// 把星星放进数组 stars
	for(var i=0; i<count; i++){
		stars.push(new NEWSTAR());
	}

	setInterval(function(){
		ctx.clearRect(cxtLeft,cxtTop,cxtRight,cxtBottom);
		draw(stars,ctx);
		for(var i=0; i<count; i++){
			stars[i].move();
		}
	},70)


	// 制作单个星星对象的构造函数
	function NEWSTAR(){
		this.x = Math.random() * cxtRight;   	 // 星星水平的位置
		this.y = Math.random() * cxtBottom;      // 星星垂直的位置
		this.vx = (Math.random() * 0.3 + 0.3) * (Math.random()>0.5 ? 1 : -1);		 // 星星水平的速度
		this.vy = (Math.random() * 0.3 + 0.3) * (Math.random()>0.5 ? 1 : -1);		 // 星星垂直的速度
		this.radius = Math.random() * 1.5;		 // 星星的半径:0-2
	}
	NEWSTAR.prototype.move = function() {
		this.x += this.vx;
		this.y += this.vy;
		if(this.x<cxtLeft || this.x>cxtRight){
			this.vx *= -1;
		}
		if(this.y<cxtTop || this.y>cxtBottom){
			this.vy *= -1;
		}
	};

	// 绘制星星
	function draw(stars,context){
		context.fillStyle="#fff";
		context.shadowBlur=10;
		context.shadowColor="hsla(0,100%,100%,0.3)";
		for(var i=0, num=stars.length; i<num; i++){
			context.beginPath()
			context.arc(stars[i].x, stars[i].y, stars[i].radius, 0 ,2*Math.PI);
			context.fill();
		}
	}


	// console.log(canvas.width);
	console.log( (Math.random() * 1 + 1) * (Math.random()>0.5 ? 1 : -1));
}