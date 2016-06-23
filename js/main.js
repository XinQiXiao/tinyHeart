var can1
var can2

var ctx1
var ctx2

var canWidth	// 画布宽
var canHeight	// 画布高

var lastTime	// 每一帧的最后时间
var deltaTime	// 每一帧的延迟时间

var bgPic = new Image()		// 背景图片

var ane; 	// 海藻
var fruit;	// 果实
var mom;	// 大鱼
var baby	// 小鱼
var data	// 
var wave	// 大鱼吃果实 波纹
var hole 	// 大鱼喂小鱼 波纹
var dust	// 漂浮物

// 鼠标位置
var mx
var my

var babyTail = []	// 小鱼尾巴arr
var babyEye = []	// 小鱼eye
var babyBody = []	// 小鱼body
var momTail = []	// 大鱼 tail arr
var momEye = []		// 大鱼 eye
var momBodyOra = []	// 大鱼 body orange
var momBodyBlue = []	// 大鱼 body blue

var dustPic = []		// dust pic

document.body.onload = game
function game(){
	init()
	lastTime = Date.now()
	deltaTime = 0
	gameloop()
}

function init(){
	// 获得canvas context
	can1 = document.getElementById('canvas1')	// fishes,dust,UI,circle
	ctx1 = can1.getContext('2d')

	// 获取鼠标事件
	can1.addEventListener('mousemove',onMouseMove,false)

	can2 = document.getElementById('canvas2')	// background,ane,fruits
	ctx2 = can2.getContext('2d')

	bgPic.src = 'src/background.jpg'

	canWidth = can1.width
	canHeight = can1.height

	ane = new aneObj()
	ane.init()

	fruit = new fruitObj()
	fruit.init()

	mom = new momObj()
	mom.init()

	baby = new babyObj()
	baby.init()

	mx = canWidth * 0.5
	my = canHeight * 0.5

	// 小鱼尾巴arr
	for (var i = 0;i < 8;i++){
		babyTail[i] = new Image()
		babyTail[i].src = './src/babyTail' + i + '.png' 
	}
	// eye
	for (var i = 0;i < 2;i++){
		babyEye[i] = new Image()
		babyEye[i].src = './src/babyEye' + i + '.png' 
	}
	// body
	for (var i = 0;i < 20;i++){
		babyBody[i] = new Image()
		babyBody[i].src = './src/babyFade' + i + '.png' 
	}

	// 大鱼 tail
	for (var i = 0;i < 8;i++){
		momTail[i] = new Image()
		momTail[i].src = './src/bigTail' + i + '.png' 
	}
	// eye
	for (var i = 0;i < 2;i++){
		momEye[i] = new Image()
		momEye[i].src = './src/bigEye' + i + '.png' 
	}
	// body orange&blue
	for (var i = 0;i < 8;i++){
		momBodyOra[i] = new Image()
		momBodyOra[i].src = './src/bigSwim' + i + '.png' 
		momBodyBlue[i] = new Image()
		momBodyBlue[i].src = './src/bigSwimBlue' + i + '.png' 
	}

	data = new dataObj()

	// set score font
	ctx1.font = '30px Verdana'
	ctx1.textAlign = 'center'

	//
	wave = new waveObj()
	wave.init()

	hole = new holeObj()
	hole.init()

	// dust
	for (var i=0;i<7;i++){
		dustPic[i] = new Image()
		dustPic[i].src = './src/dust' + i + '.png' 
	}

	dust = new dustObj()
	dust.init()
}

function gameloop(){
	requestAnimFrame(gameloop)	// setInterval,setTimeout
	var nowTime = Date.now()
	deltaTime = nowTime - lastTime
	lastTime = nowTime
	// 限制deltaTime，不要当切换屏幕时，果实会变得特别大
	if (deltaTime > 40){
		deltaTime = 40
	} 

	drawBackground()

	// draw ane
	ane.draw()

	// 果实数量监测
	fruitMonitor()
	fruit.draw()

	// draw mom
	// 首先清空画布
	ctx1.clearRect(0,0,canWidth,canHeight)
	// draw mom
	mom.draw()
	// draw baby
	baby.draw()

	// 大鱼吃果实
	momFruitsCollision()
	// 大鱼、小鱼碰撞
	momBabyCollision()

	// draw data
	data.draw()

	// draw wave
	wave.draw()
	hole.draw()

	// draw dust
	dust.draw()
	
}
function onMouseMove(e){
	// 控制鼠标前提条件
	if (!data.gameOver) {
		if (e.offSetX || e.layerX) {
			mx = e.offSetX == undefined ? e.layerX : e.offSetX
			my = e.offSetY == undefined ? e.layerY : e.offSetY
			
		}
	}
}