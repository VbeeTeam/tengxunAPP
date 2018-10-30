//针对，内部和外部的样式如何获取？
//  1)、针对IE，用currentStyle
//  2)、针对其它主流浏览器，用window.getComputedStyle(dom对象)获取到了所有的样式属性
//功能：获取某个DOM元素的样式属性
function getStyle(domObj,attr){
	if(domObj.currentStyle){
		//domObj.currentStyle.attr;//这是不对的，因为并没有名字为attr的属性
		return domObj.currentStyle[attr];//如果对象的属性名是变量的方式表示，就只能用方括号。
	}else{
		return window.getComputedStyle(domObj)[attr];
	}
}
//让某个dom元素花多长时间到达目的地
function moveObj05(domObj,attr,endValue,timeLong){	
	let currValue = parseFloat(getStyle(domObj,attr));//parseFloat(domObj.style[attr]);
	let direction = endValue>currValue?1:-1;
	let timeSpace = 16;
	let step = Math.abs(endValue-currValue)/timeLong*timeSpace;//  路程/时间表示的是一毫秒走多少像素*16；	
	let myTimer = setInterval(function(){
		//1、改变数据
		currValue = currValue+direction*step;
		//2、处理边界
		if(Math.abs(currValue-endValue)<=step){
			currValue = endValue;
			clearInterval(myTimer);
		}		
		//3、改变外观
		let temp = currValue;
		if(attr!="opacity"){
			temp = temp+"px";
		}
		domObj.style[attr] = temp;		
	},timeSpace);
}

//当前序号
let currOrd = 0;
let myTimer = null;

let arr=["https://m.jd.com/","http://www.baidu.com","http://www.taobao.com","http://www.jingdong.com","http://www.tmall.com"];

//显示图片：
function showImg(inOrd,outOrd){
	let imgDoms = $("#sliderBox")[0].children;
	if(inOrd==outOrd){
		return;
	}	
	//1)、滑入滑出前的准备工作
	imgDoms[inOrd].style.left = 375+"px";	
	//2）、滑入滑出效果
	moveObj05(imgDoms[inOrd],"left",0,1000);
	moveObj05(imgDoms[outOrd],"left",-375,1000);
}

function showLi(){
	//    B、改豆豆		
	let liDoms = $("#uls")[0].children;
	for(let i=0;i<liDoms.length;i++){
		liDoms[i].style.backgroundColor = "pink";
	}
	liDoms[currOrd].style.backgroundColor = "red";
}

//1、自动播放图片
function changeImg(){
	myTimer = setInterval(function(){
		//1）、数据：改变图片的当前序号（加加），并考虑边界
		//currOrd = ++currOrd>4?0:currOrd;
		let outOrd = currOrd;
		currOrd++;
		if(currOrd>4){
			currOrd=0;
		}		
		//2）、外观：
		//A、改图片
		showImg(currOrd,outOrd);
		//B、改豆豆
		showLi();
	},5000);
}
//4、跳转到指定的图片
function goImg(transOrd){//1
	//1）、数据：把transOrd赋给当前图片序号
	let outOrd = currOrd;
	currOrd = transOrd;	
	//2）、外观：
	//A、改图片
	showImg(currOrd,outOrd);
	//B、改豆豆
	showLi();
}

function goUrl(){
    //window.open(arr[currOrd]);
    location.href = arr[currOrd];
}

$(function () {
    changeImg();
    let liDoms = $("#uls")[0].children;
    for(var i=0;i<liDoms.length;i++){
        liDoms[i].setAttribute("index",i);
        liDoms[i].onclick = function(){
            let index = parseInt(this.getAttribute("index"));
            goImg(index);//1
        }
    }
    //图片链接
    let imgDoms = $("#sliderBox")[0].children;
    for(let i=0;i<imgDoms.length;i++){
        imgDoms[i].onclick = goUrl;
    }
})
