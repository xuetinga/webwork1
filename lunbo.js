//获取dom对象
var box = document.getElementById("box");
var oNavlist = document.getElementById("nav").children;//那5个小按钮
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var index  = 1;
var timer;
var isMoving = false;
var warning = document.getElementById('warning');

//轮播图自动切换
setInterval(function(){
	if (parseInt(warning.style.marginLeft)<-300) {
		warning.style.marginLeft = 1000+"px";
	}
	else{
	    warning.style.marginLeft = (parseInt(warning.style.marginLeft)-1) +"px";
	}
},10);

//左右箭头
function next(){
	if (!isMoving) {
		isMoving = true;
		index++;
		navmove();
		animate(slider,{left: -1200*index},function () {
				if (index >5 ) {
					slider.style.left = "-1200px";
					index = 1;
				}
				isMoving = false;
		});
	}	
}
function prev(){
	if (isMoving) {
		return;
	}
	isMoving = true;
	index--;
	navmove();
	animate(slider,{left: -1200*index},function () {
			if (index ===0 ) {
				slider.style.left = "-6000px";
				index = 5;
			}
			isMoving = false;
	});
}

//左右箭头点击的时候
right.onclick = next;
left.onclick = prev;

//定时滚动
var timer = setInterval(next,3000);

//鼠标划上去的时候
box.onmouseover = function () {
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
//鼠标划出的时候。
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next,2000);
}

//小图标的变化
function navmove(){
	for (var i = 0; i < oNavlist.length; i++) {
		oNavlist[i].className = "";
	}
	if(index >5){
		oNavlist[0].removeAttribute("id");
		oNavlist[0].className = "active";
	}
	else if (index <=0) {
		oNavlist[4].className = "active";
		oNavlist[0].removeAttribute("id");
	}
	else{
		oNavlist[0].setAttribute("id","active");
		oNavlist[index-1].className = "active";
		}
}
//点击小按钮的时候
for (var i = 0; i < oNavlist.length; i++) {
	oNavlist[i].index = i;
	oNavlist[i].onclick = function(){
		index = this.index + 1;
		navmove();
		animate(slider,{left:-1200 * index});
	}
}
//animate的实现
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			console.log(cur);
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}